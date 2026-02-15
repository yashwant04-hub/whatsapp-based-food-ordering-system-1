from __future__ import annotations

from collections.abc import Mapping
from typing import Any, TypeVar

from attrs import define as _attrs_define
from attrs import field as _attrs_field

T = TypeVar("T", bound="OrderResponse")


@_attrs_define
class OrderResponse:
    """
    Attributes:
        customer_name (str):
        whatsapp_number (str):
        item_name (str):
        quantity (int):
        total_price (int):
        id (int):
        status (str):
    """

    customer_name: str
    whatsapp_number: str
    item_name: str
    quantity: int
    total_price: int
    id: int
    status: str
    additional_properties: dict[str, Any] = _attrs_field(init=False, factory=dict)

    def to_dict(self) -> dict[str, Any]:
        customer_name = self.customer_name

        whatsapp_number = self.whatsapp_number

        item_name = self.item_name

        quantity = self.quantity

        total_price = self.total_price

        id = self.id

        status = self.status

        field_dict: dict[str, Any] = {}
        field_dict.update(self.additional_properties)
        field_dict.update(
            {
                "customer_name": customer_name,
                "whatsapp_number": whatsapp_number,
                "item_name": item_name,
                "quantity": quantity,
                "total_price": total_price,
                "id": id,
                "status": status,
            }
        )

        return field_dict

    @classmethod
    def from_dict(cls: type[T], src_dict: Mapping[str, Any]) -> T:
        d = dict(src_dict)
        customer_name = d.pop("customer_name")

        whatsapp_number = d.pop("whatsapp_number")

        item_name = d.pop("item_name")

        quantity = d.pop("quantity")

        total_price = d.pop("total_price")

        id = d.pop("id")

        status = d.pop("status")

        order_response = cls(
            customer_name=customer_name,
            whatsapp_number=whatsapp_number,
            item_name=item_name,
            quantity=quantity,
            total_price=total_price,
            id=id,
            status=status,
        )

        order_response.additional_properties = d
        return order_response

    @property
    def additional_keys(self) -> list[str]:
        return list(self.additional_properties.keys())

    def __getitem__(self, key: str) -> Any:
        return self.additional_properties[key]

    def __setitem__(self, key: str, value: Any) -> None:
        self.additional_properties[key] = value

    def __delitem__(self, key: str) -> None:
        del self.additional_properties[key]

    def __contains__(self, key: str) -> bool:
        return key in self.additional_properties
