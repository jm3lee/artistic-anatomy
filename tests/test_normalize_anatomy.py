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


def test_handles_structured_attachments():
    anatomy = [
        {
            "insertions": {
                "site": {"feature": "tubercle", "bone": "humerus"},
                "label": "Main",
                "note": "strong",
            }
        },
        {
            "origins": [
                {
                    "site": {"bone": "scapula", "feature": "fossa"},
                    "note": "broad",
                }
            ]
        },
    ]

    result = normalize_anatomy(anatomy)

    assert result["insertions"] == [
        {
            "site": {"bone": "humerus", "feature": "tubercle"},
            "label": "Main",
            "note": "strong",
        }
    ]
    insertion = result["insertions"][0]
    assert list(insertion.keys()) == ["site", "label", "note"]
    assert list(insertion["site"].keys()) == ["bone", "feature"]

    origin = result["origins"][0]
    assert list(origin.keys()) == ["site", "note"]
    assert list(origin["site"].keys()) == ["bone", "feature"]
