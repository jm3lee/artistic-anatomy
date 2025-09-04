from dataclasses import dataclass, field
from typing import List, NotRequired, Optional, TypedDict, Union


class AnatomyRef(TypedDict, total=False):
    """Reference to another muscle with optional notes."""

    id: str
    note: str


AnatomyItem = Union[str, AnatomyRef]


class AttachmentSite(TypedDict):
    bone: str
    feature: NotRequired[str]


@dataclass
class Attachment:
    site: AttachmentSite
    label: Optional[str] = None
    note: Optional[str] = None


@dataclass
class Anatomy:
    """Basic muscle information for anatomy models."""

    actions: List[AnatomyItem] = field(default_factory=list)
    insertions: List[Attachment] = field(default_factory=list)
    origins: List[Attachment] = field(default_factory=list)
