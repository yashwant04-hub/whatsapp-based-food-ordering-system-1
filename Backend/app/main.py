from fastapi import FastAPI, Depends, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import shutil
import os

from .database import SessionLocal, engine, Base
from . import models, schemas
from app.services.whatsapp import send_whatsapp_message
from fastapi import Request
from fastapi.responses import Response
from fastapi.responses import PlainTextResponse






app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


os.makedirs("uploads", exist_ok=True)


app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


Base.metadata.create_all(bind=engine)



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@app.get("/")
def root():
    return {"message": "API is working "}



@app.post("/menu/", response_model=schemas.MenuResponse)
def create_menu(
    name: str = Form(...),
    description: str = Form(...),
    price: int = Form(...),
    available: bool = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    file_path = f"uploads/{image.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    new_item = models.Menu(
        name=name,
        description=description,
        price=price,
        available=available,
        image=image.filename
    )

    db.add(new_item)
    db.commit()
    db.refresh(new_item)

    return new_item



@app.get("/menu/", response_model=list[schemas.MenuResponse])
def get_all_menu(db: Session = Depends(get_db)):
    return db.query(models.Menu).all()



@app.get("/menu/{item_id}", response_model=schemas.MenuResponse)
def get_menu_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Menu).filter(models.Menu.id == item_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    return item


@app.post("/orders/", response_model=schemas.OrderResponse)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    new_order = models.Order(**order.dict())

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    send_whatsapp_message(
        f" Order Confirmed!\nOrder ID: {new_order.id}\nStatus: {new_order.status}"
    )

    return new_order



@app.get("/orders/", response_model=list[schemas.OrderResponse])
def get_all_orders(db: Session = Depends(get_db)):
    return db.query(models.Order).all()



@app.get("/orders/{order_id}", response_model=schemas.OrderResponse)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    return order



VALID_STATUS_FLOW = {
    "pending": ["preparing"],
    "preparing": ["out-for-delivery"],
    "out-for-delivery": ["delivered"],
    "delivered": []
}


@app.patch("/orders/{order_id}", response_model=schemas.OrderResponse)
def update_order_status(
    order_id: int,
    status_update: schemas.OrderStatusUpdate,
    db: Session = Depends(get_db),
):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    current_status = order.status.lower()
    new_status = status_update.status.lower()

    if new_status not in VALID_STATUS_FLOW[current_status]:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot change status from {current_status} to {new_status}"
        )

    
    order.status = new_status
    db.commit()
    db.refresh(order)

  
    try:
        send_whatsapp_message(
            f""" *ORDER UPDATE*

          Order ID: {order.id}
          Item: {order.item_name}
          New Status: *{order.status}*

Thanks for ordering """,
            order.whatsapp_number
        )
    except Exception as e:
        print("WhatsApp send failed:", e)

    return order





@app.delete("/orders/{order_id}")
def cancel_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    db.delete(order)
    db.commit()

    return {"message": "Order cancelled"}


@app.post("/webhook")
async def whatsapp_webhook(request: Request, db: Session = Depends(get_db)):

    form = await request.form()

    incoming_msg = form.get("Body", "").strip().lower()
    sender = form.get("From")

    print("Message:", incoming_msg)

    
    if incoming_msg == "menu":

        items = db.query(models.Menu).filter(models.Menu.available == True).all()

        if not items:
            reply = " Menu is empty"
        else:
            reply = " *OUR MENU*\n\n"
            for item in items:
                reply += f" {item.name} - ₹{item.price}\n"

    
    elif incoming_msg.startswith("order"):

        try:
            _, item_name, quantity = incoming_msg.split()
            quantity = int(quantity)

            menu_item = db.query(models.Menu).filter(
                models.Menu.name.ilike(f"%{item_name}%")
            ).first()

            if not menu_item:
                reply = " Item not found"

            else:
                total = menu_item.price * quantity

                new_order = models.Order(
                    customer_name="WhatsApp User",
                    whatsapp_number=sender,
                    item_name=menu_item.name,
                    quantity=quantity,
                    total_price=total,
                )

                db.add(new_order)
                db.commit()
                db.refresh(new_order)

                reply = f""" *Order Confirmed*

               Item: {menu_item.name}
                Qty: {quantity}
                Total: ₹{total}
                Status: {new_order.status}
                 Order ID: {new_order.id}
"""

        except:
            reply = " Use format: order burger 2"

   
    elif incoming_msg.startswith("status"):

        try:
            _, order_id = incoming_msg.split()
            order_id = int(order_id)

            order = db.query(models.Order).filter(
                models.Order.id == order_id
            ).first()

            if not order:
                reply = " Order not found"
            else:
                reply = f""" *ORDER STATUS*

             Order ID: {order.id}
             Item: {order.item_name}
              Qty: {order.quantity}
              Total: ₹{order.total_price}
               Status: {order.status}
"""

        except:
            reply = " Use format: status 3"

    
    elif incoming_msg.startswith("cancel"):

        try:
            _, order_id = incoming_msg.split()
            order_id = int(order_id)

            order = db.query(models.Order).filter(
                models.Order.id == order_id
            ).first()

            if not order:
                reply = " Order not found"

          
            elif order.whatsapp_number != sender:
                reply = " This order is not yours"

          
            elif order.status == "delivered":
                reply = " Order already delivered. Cannot cancel."

            else:
                db.delete(order)
                db.commit()

                reply = f""" *ORDER CANCELLED*

 Order ID: {order_id}

We hope to serve you again """

        except:
            reply = " Use format: cancel 3"

   
    else:
        reply = """ *Welcome to FoodBot*

Send:
 *menu* to see items  
 *order burger 2* to place order  
 *status 1* to track order  
 *cancel 1* to cancel order
"""

    return Response(
        content=f"""<?xml version="1.0" encoding="UTF-8"?>
<Response>
<Message>{reply}</Message>
</Response>""",
        media_type="application/xml"
    )
