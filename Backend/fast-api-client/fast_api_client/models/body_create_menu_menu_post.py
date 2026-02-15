from __future__ import annotations

from collections.abc import Mapping
from io import BytesIO
from typing import Any, TypeVar

from attrs import define as _attrs_define
from attrs import field as _attrs_field

from .. import types
from ..types import File

T = TypeVar("T", bound="BodyCreateMenuMenuPost")


@_attrs_define
class BodyCreateMenuMenuPost:
    """
    Attributes:
        name (str):
        description (str):
        price (int):
        available (bool):
        image (File):
    """

    name: str
    description: str
    price: int
    available: bool
    image: File
    additional_properties: dict[str, Any] = _attrs_field(init=False, factory=dict)

    def to_dict(self) -> dict[str, Any]:
        name = self.name

        description = self.description

        price = self.price

        available = self.available

        image = self.image.to_tuple()

        field_dict: dict[str, Any] = {}
        field_dict.update(self.additional_properties)
        field_dict.update(
            {
                "name": name,
                "description": description,
                "price": price,
                "available": available,
                "image": image,
            }
        )

        return field_dict

    def to_multipart(self) -> types.RequestFiles:
        files: types.RequestFiles = []

        files.append(("name", (None, str(self.name).encode(), "text/plain")))

        files.append(("description", (None, str(self.description).encode(), "text/plain")))

        files.append(("price", (None, str(self.price).encode(), "text/plain")))

        files.append(("available", (None, str(self.available).encode(), "text/plain")))

        files.append(("image", self.image.to_tuple()))

        for prop_name, prop in self.additional_properties.items():
            files.append((prop_name, (None, str(prop).encode(), "text/plain")))

        return files

    @classmethod
    def from_dict(cls: type[T], src_dict: Mapping[str, Any]) -> T:
        d = dict(src_dict)
        name = d.pop("name")

        description = d.pop("description")

        price = d.pop("price")

        available = d.pop("available")

        image = File(payload=BytesIO(d.pop("image")))

        body_create_menu_menu_post = cls(
            name=name,
            description=description,
            price=price,
            available=available,
            image=image,
        )

        body_create_menu_menu_post.additional_properties = d
        return body_create_menu_menu_post

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
