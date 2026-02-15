from fast_api_client import Client
from fast_api_client.api.default.create_order_orders_post import sync_detailed
from fast_api_client.models.order_create import OrderCreate

client = Client(base_url="http://localhost:8000")

new_order = OrderCreate(
    customer_name="SDK User",
    whatsapp_number="whatsapp:+919113803443",
    item_name="Burger",
    quantity=2,
    total_price=200
)

response = sync_detailed(client=client, body=new_order)

print("STATUS:", response.status_code)
print("RAW RESPONSE:", response.content)
print("PARSED:", response.parsed)


