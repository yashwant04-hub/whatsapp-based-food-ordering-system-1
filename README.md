
# whatsapp-based-food-ordering-system-1

# WhatsApp-Based Food Ordering System

A full-stack food ordering platform that allows customers to place orders via WhatsApp and enables restaurant staff to manage menus and orders through a web dashboard.

Built as part of the Intern Coding Challenge.



##  Features

###  Backend (FastAPI)

* Menu management (create, update, enable/disable items)
* Order creation via WhatsApp
* Real-time order status updates
* Order cancellation with notification
* OpenAPI documentation
* Unit tests

###  WhatsApp Integration

* Order confirmation messages
* Status update notifications
* Cancellation alerts
  (Using Twilio / WhatsApp Business API)

###  Frontend (ReactJS)

* Menu management dashboard
* Active order tracking
* Update order status
* Success & error notifications

###  Python SDK

Generated using OpenAPI Generator:

* `add_menu_item()`
* `place_order()`
* `update_order_status()`
* `list_orders()`
* `get_order_by_id()`




##  Tech Stack

### Backend

* FastAPI
* Uvicorn
* SQLAlchemy / SQLite (or PostgreSQL)
* Twilio WhatsApp API
* Pydantic

### Frontend

* ReactJS
* Axios
* Bootstrap / Tailwind (optional)

### SDK

* OpenAPI Generator CLI
* Python

---

##  Prerequisites

* Python 3.10+
* Node.js 18+
* npm 
* Git
* Twilio 

---


---

##  Backend Setup

```bash
cd backend

python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

pip install -r requirements.txt
```

###  Run backend

```bash
uvicorn main:app --reload
```

API Docs:

```
http://localhost:8000/docs
```

OpenAPI Spec:

```
http://localhost:8000/openapi.json
```

---

##  Frontend Setup

```bash
cd frontend
npm install
npm start
```

Runs on:

```
http://localhost:3000
```

---

##  Generate Python SDK

```bash
openapi-generator-cli generate \
-i http://localhost:8000/openapi.json \
-g python \
-o sdk
```

---

## ▶ Using the SDK

```python
from sdk.api.orders_api import OrdersApi
from sdk import ApiClient

client = ApiClient()
orders_api = OrdersApi(client)

orders = orders_api.get_orders()
print(orders)
```

---

##  Running Tests

```bash
cd backend
pytest
```

---

##  Automation Scripts

###  Setup everything

```bash
./scripts/setup.sh
```

###  Run full system

```bash
./scripts/run.sh
```

---

##  WhatsApp Order Flow

1. Customer sends order on WhatsApp
2. Backend validates menu items
3. Order is created in database
4. Confirmation message sent
5. Staff updates order status from dashboard
6. Customer receives real-time updates

---





