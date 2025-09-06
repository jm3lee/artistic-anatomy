from pathlib import Path
from bs4 import BeautifulSoup


def test_muscle_page_uses_template():
    html = Path('build/muscles/deltoid/index.html').read_text(encoding='utf-8')
    soup = BeautifulSoup(html, 'html.parser')
    assert soup.find('h2', string='Illustrations') is not None
    assert soup.find('h2', string='Examples') is not None
    assert soup.find('h2', string='Related Muscles') is not None


def test_non_muscle_page_unaffected():
    html = Path('build/landmarks/index.html').read_text(encoding='utf-8')
    soup = BeautifulSoup(html, 'html.parser')
    assert soup.find('h2', string='Illustrations') is None
    assert soup.find('h2', string='Examples') is None
    assert soup.find('h2', string='Related Muscles') is None
