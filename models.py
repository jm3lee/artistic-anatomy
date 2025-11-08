"""Pydantic models for the legacy bone and muscle metadata and JSON output."""

from __future__ import annotations

from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple, Type, TypeVar

from pydantic import BaseModel, Field


class Breadcrumb(BaseModel):
    """Single navigation crumb in document metadata."""

    title: str
    url: Optional[str] = None


class Landmark(BaseModel):
    """Named landmark on a bone surface."""

    name: str
    desc: str


class MuscleAttachment(BaseModel):
    """Muscle attachment location with associated muscles."""

    name: Landmark
    muscles: List[MuscleAnatomy]



class DocMetadata(BaseModel):
    """Document level metadata."""

    author: str
    breadcrumbs: List[Breadcrumb]
    pubdate: str
    title: str


class BaseRecord(BaseModel):
    """Base record shared by bone and muscle entries."""

    description: Optional[str] = None
    doc: DocMetadata
    icon: Optional[str] = None
    id: str
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

    landmarks: List[Landmark] = Field(default_factory=list)
    insertions: List[MuscleAttachment] = Field(default_factory=list)
    origins: List[MuscleAttachment] = Field(default_factory=list)



class MuscleRecord(BaseRecord):
    """Grouped anatomy data specific to muscles."""

    actions: List[str] = Field(default_factory=list)
    insertions: List[Landmark] = Field(default_factory=list)
    origins: List[Landmark] = Field(default_factory=list)
