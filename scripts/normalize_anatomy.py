#!/usr/bin/env python3
"""Normalize anatomy sections in muscle index YAML files.

The script searches for all ``index.yml`` files under ``src/muscles`` and
rewrites their ``anatomy`` sections so that the section contains three lists:
``actions``, ``insertions``, and ``origins``. Existing content is coerced into
lists when necessary. Files are overwritten in-place using a consistent key
order and two-space indentation.
"""
from __future__ import annotations

from collections import OrderedDict
from pathlib import Path
from typing import Any, Dict, List, Union

from models.anatomy import AnatomyItem, AnatomyRef

from ruamel.yaml import YAML


yaml = YAML(typ="safe")
yaml.indent(mapping=2, sequence=2, offset=0)
yaml.allow_unicode = True

ANATOMY_KEYS = ("actions", "insertions", "origins")

NormalizedItem = Union[AnatomyItem, Dict[str, Any]]


def _normalize_item(value: Any) -> NormalizedItem:
    if isinstance(value, dict):
        if "site" in value:
            result: Dict[str, Any] = OrderedDict()
            site: Dict[str, Any] = value.get("site") or {}
            site_norm: Dict[str, Any] = OrderedDict()
            if isinstance(site, dict):
                for key in ("bone", "feature"):
                    if key in site and site[key] is not None:
                        site_norm[key] = str(site[key]).strip()
            if site_norm:
                result["site"] = site_norm
            for key in ("label", "note"):
                if key in value and value[key] is not None:
                    result[key] = str(value[key]).strip()
            return result
        result: AnatomyRef = OrderedDict()
        for key in ("id", "note"):
            if key in value and value[key] is not None:
                result[key] = str(value[key]).strip()
        return result
    return str(value).strip()


def _coerce_list(value: Any) -> List[NormalizedItem]:
    """Return ``value`` as a list of anatomy items."""
    if value is None:
        return []
    if isinstance(value, list):
        return [_normalize_item(v) for v in value]
    return [_normalize_item(value)]


def normalize_anatomy(anatomy: Any) -> Dict[str, List[NormalizedItem]]:
    """Convert ``anatomy`` into a mapping of lists.

    Unsupported or unrecognised keys are ignored.
    """
    result: Dict[str, List[NormalizedItem]] = {k: [] for k in ANATOMY_KEYS}

    if isinstance(anatomy, dict):
        items = [anatomy]
    elif isinstance(anatomy, list):
        items = anatomy
    elif anatomy is None:
        items = []
    else:  # simple string defaults to actions
        items = [{"actions": anatomy}]

    for item in items:
        if isinstance(item, dict):
            for key, value in item.items():
                key_l = key.lower()
                if key_l in result:
                    result[key_l].extend(_coerce_list(value))
        elif isinstance(item, str):
            result["actions"].extend(_coerce_list(item))

    # Ensure list order is deterministic
    return {k: result[k] for k in ANATOMY_KEYS}


def process_file(path: Path) -> None:
    data = yaml.load(path.read_text()) or {}
    if "anatomy" not in data:
        return

    normalized = normalize_anatomy(data["anatomy"])
    data["anatomy"] = OrderedDict((k, normalized[k]) for k in ANATOMY_KEYS)

    with path.open("w") as fh:
        yaml.dump(data, fh)


def main() -> None:
    base = Path("src/muscles")
    for yaml_path in base.glob("**/index.yml"):
        process_file(yaml_path)


if __name__ == "__main__":
    main()
