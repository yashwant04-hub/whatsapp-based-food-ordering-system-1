from pydantic import BaseModel


class MenuCreate(BaseModel):
    name: str
    description: str
    price: int
    available: bool


class MenuResponse(MenuCreate):
    id: int
    image: str   

    class Config:
        from_attributes = True


class OrderCreate(BaseModel):
    customer_name: str
    whatsapp_number: str
    item_name: str
    quantity: int
    total_price: int

class OrderResponse(OrderCreate):
    id: int
    status: str

    class Config:
        from_attributes = True

class OrderStatusUpdate(BaseModel):
    status: str

