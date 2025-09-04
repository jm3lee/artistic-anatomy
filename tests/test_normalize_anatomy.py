import sys
from pathlib import Path

import pytest

sys.path.append(str(Path(__file__).resolve().parents[1]))
from scripts.normalize_anatomy import normalize_anatomy


def test_accepts_dict_items():
    anatomy = [
        {"actions": [{"id": "flex", "note": "flex the elbow"}]},
        {"insertions": {"id": "radius"}},
        "Supinates forearm",
    ]
    expected = {
        "actions": [{"id": "flex", "note": "flex the elbow"}, "Supinates forearm"],
        "insertions": [{"id": "radius"}],
        "origins": [],
    }
    assert normalize_anatomy(anatomy) == expected


def test_simple_string_defaults_to_actions():
    anatomy = "Flexes the elbow"
    expected = {"actions": ["Flexes the elbow"], "insertions": [], "origins": []}
    assert normalize_anatomy(anatomy) == expected
