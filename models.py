"""Pydantic models for the legacy bone and muscle metadata and JSON output."""

from __future__ import annotations

from typing import Annotated, Any, Dict, List, Optional

from pydantic import BaseModel, Field

MuscleId = Annotated[str, "Muscle ID"]
MuscleGroupId = Annotated[str, "MuscleGroup ID"]
BoneId = Annotated[str, "Bone ID"]
LandmarkId = Annotated[str, "Landmark ID"]


class Breadcrumb(BaseModel):
    """Single navigation crumb in document metadata."""

    title: str
    url: Optional[str] = None


class Landmark(BaseModel):
    """Named landmark on a bone surface."""

    id: LandmarkId
    name: str
    desc: str


class LandmarkRef(BaseModel):
    bone_id: BoneId
    landmark_id: LandmarkId


class MuscleAttachment(BaseModel):
    """Muscle attachment location with associated muscles."""

    landmark: LandmarkId
    muscles: List[MuscleId]


class DocMetadata(BaseModel):
    """Document level metadata."""

    author: str
    breadcrumbs: List[Breadcrumb]
    pubdate: str
    title: str


class NameRecord(BaseModel):
    name: str  # English by default
    translations: Optional[Dict[str, Any]] = None


class BaseRecord(BaseModel):
    """Base record shared by bone and muscle entries."""

    description: Optional[str] = None
    doc: DocMetadata
    icon: Optional[str] = None
    id: str
    name: NameRecord
    status: str
    tags: Optional[List[str]] = None
    translations: Optional[Dict[str, Any]] = None
    url: Optional[str] = None

    def to_json(self, *, indent: int = 2) -> str:
        """Return a JSON string using the available Pydantic API."""
        try:
            return self.model_dump_json(indent=indent)  # Pydantic v2
        except AttributeError:  # pragma: no cover - fallback for Pydantic v1.
            return self.json(indent=indent)


class BoneRecord(BaseRecord):
    """Grouped anatomy data specific to bones."""

    id: BoneId
    landmarks: List[Landmark] = Field(default_factory=list)
    insertions: List[MuscleAttachment] = Field(default_factory=list)
    origins: List[MuscleAttachment] = Field(default_factory=list)


class MuscleRecord(BaseRecord):
    """Grouped anatomy data specific to muscles."""

    id: MuscleId
    heads: Optional[List[MuscleId]] = None
    actions: List[str] = Field(default_factory=list)
    insertions: List[LandmarkRef] = Field(default_factory=list)
    origins: List[LandmarkRef] = Field(default_factory=list)


class MuscleGroup(BaseModel):
    id: str
    name: str
    muscles: List[MuscleId]
