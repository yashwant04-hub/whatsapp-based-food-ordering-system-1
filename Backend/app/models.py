from sqlalchemy import Column, Integer, String, Boolean
from .database import Base
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship


class Menu(Base):
    __tablename__ = "menu"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    price = Column(Integer)
    available = Column(Boolean, default=True)
    image = Column(String, nullable=True)


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String)
    whatsapp_number = Column(String)
    item_name = Column(String)
    quantity = Column(Integer)
    total_price = Column(Integer)
    status = Column(String, default="pending")


