import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))
from scripts.convert_attachments import parse_attachment


def test_parse_attachment_structured():
    text = (
        'Posterior: {{linkcap("tubercle")}} of '
        '{{linkicon("humerus")}} connective tissue'
    )
    att = parse_attachment(text)
    assert att.label == "Posterior"
    assert att.site == {"bone": "humerus", "feature": "tubercle"}
    assert att.note == "connective tissue"

