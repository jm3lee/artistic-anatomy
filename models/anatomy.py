from dataclasses import dataclass, field
from typing import List, TypedDict, Union


class AnatomyRef(TypedDict, total=False):
    """Reference to another muscle with optional notes."""

    id: str
    note: str


AnatomyItem = Union[str, AnatomyRef]


@dataclass
class Anatomy:
    """Basic muscle information for anatomy models."""

    actions: List[AnatomyItem] = field(default_factory=list)
    insertions: List[AnatomyItem] = field(default_factory=list)
    origins: List[AnatomyItem] = field(default_factory=list)
