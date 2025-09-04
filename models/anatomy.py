from dataclasses import dataclass, field
from typing import List


@dataclass
class Anatomy:
    """Basic muscle information for anatomy models."""
    actions: List[str] = field(default_factory=list)
    insertions: List[str] = field(default_factory=list)
    origins: List[str] = field(default_factory=list)
