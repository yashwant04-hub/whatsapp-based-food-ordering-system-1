from twilio.rest import Client

import os

ACCOUNT_SID = os.getenv("ACCOUNT_SID")
AUTH_TOKEN = os.getenv("AUTH_TOKEN")

FROM_WHATSAPP = "whatsapp:+14155238886"
TO_WHATSAPP = "whatsapp:+919113803443"  

client = Client(ACCOUNT_SID, AUTH_TOKEN)
def send_whatsapp_message(message, to=TO_WHATSAPP):

    client.messages.create(
        body=message,
        from_=FROM_WHATSAPP,
        to=to  
    )
