import json
from pathlib import Path
import pytest
from bs4 import BeautifulSoup


def test_key_terms_present():
    json_path = Path('key_term.json')
    if not json_path.is_file():
        json_path = Path('src/keyterms/index.json')
    if not json_path.is_file():
        pytest.skip('key_term.json not found')
    html_path = Path('build/keyterms/index.html')
    if not html_path.is_file():
        pytest.skip('build/keyterms/index.html not found')
    data = json.loads(json_path.read_text())
    with html_path.open() as f:
        soup = BeautifulSoup(f, 'html.parser')
    for key, value in data.items():
        term_id = key
        assert soup.find(id=term_id) is not None, f"missing id {term_id}"
