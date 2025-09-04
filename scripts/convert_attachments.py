#!/usr/bin/env python3
"""Convert attachment strings to structured objects in muscle YAML files.

The script walks through every ``index.yml`` under ``src/muscles`` and
transforms the ``anatomy.origins`` and ``anatomy.insertions`` lists. Each
string item is parsed for ``linkcap("feature-id")`` and
``linkicon("bone-id")`` macros and converted into an ``Attachment`` object
containing ``site.feature``, ``site.bone``, an optional ``label`` derived from
any leading text ending with a colon, and remaining text stored as ``note``.
The updated YAML is written back to disk.
"""
from __future__ import annotations

from dataclasses import asdict
import re
import sys
from pathlib import Path
from typing import Any, List

# Allow ``models`` to be imported when running as a script
sys.path.append(str(Path(__file__).resolve().parents[1]))

from models.anatomy import Attachment
from ruamel.yaml import YAML

FEATURE_RE = re.compile(r"\{\{\s*linkcap\(\"([^\"]+)\"\)\s*\}\}")
BONE_ICON_RE = re.compile(r"\{\{\s*linkicon\(\"([^\"]+)\"\)\s*\}\}")
BONE_TITLE_RE = re.compile(r"\{\{\s*linktitle\(\"([^\"]+)\"\)\s*\}\}")


def parse_attachment(text: str) -> Attachment:
    """Parse a free-form attachment string into an ``Attachment`` object."""
    label: str | None = None
    body = text.strip()
    if ":" in body:
        label, body = body.split(":", 1)
        label = label.strip()
        body = body.strip()

    feature_match = FEATURE_RE.search(body)
    bone_match = BONE_ICON_RE.search(body) or BONE_TITLE_RE.search(body)
    feature = feature_match.group(1) if feature_match else None
    bone = bone_match.group(1) if bone_match else None

    note = FEATURE_RE.sub("", body)
    note = BONE_ICON_RE.sub("", note)
    note = BONE_TITLE_RE.sub("", note)
    note = re.sub(r"\bof\b", "", note)
    note = re.sub(r"\bthe\b", "", note)
    note = re.sub(r"\s+", " ", note).strip(" ,;")
    if not note:
        note = None

    site: dict[str, Any] = {}
    if bone:
        site["bone"] = bone
    if feature:
        site["feature"] = feature

    if bone is None and note and re.fullmatch(r"[A-Za-z-]+", note):
        bone, note = note, None
        site["bone"] = bone

    attachment = Attachment(site=site, label=label, note=note)
    return attachment


def convert_list(items: List[Any]) -> List[Any]:
    result: List[Any] = []
    for item in items:
        if isinstance(item, str):
            att = parse_attachment(item)
            data = asdict(att)
            if data.get("label") is None:
                data.pop("label", None)
            if data.get("note") is None:
                data.pop("note", None)
            result.append(data)
        else:
            result.append(item)
    return result


def process_file(path: Path) -> None:
    data = yaml.load(path.read_text()) or {}
    anatomy = data.get("anatomy")
    if not anatomy:
        return

    if isinstance(anatomy, dict):
        if "origins" in anatomy and isinstance(anatomy["origins"], list):
            anatomy["origins"] = convert_list(anatomy["origins"])
        if "insertions" in anatomy and isinstance(anatomy["insertions"], list):
            anatomy["insertions"] = convert_list(anatomy["insertions"])
    elif isinstance(anatomy, list):
        for block in anatomy:
            if not isinstance(block, dict):
                continue
            if "origins" in block and isinstance(block["origins"], list):
                block["origins"] = convert_list(block["origins"])
            if "insertions" in block and isinstance(block["insertions"], list):
                block["insertions"] = convert_list(block["insertions"])

    with path.open("w") as fh:
        yaml.dump(data, fh)


yaml = YAML(typ="safe")
yaml.indent(mapping=2, sequence=2, offset=0)
yaml.allow_unicode = True
yaml.default_flow_style = False


def main() -> None:
    base = Path("src/muscles")
    for yaml_path in base.glob("**/index.yml"):
        process_file(yaml_path)


if __name__ == "__main__":
    main()
