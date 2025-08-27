"""Minimal stub of the ``bs4`` package used in tests.

It implements just enough of the :class:`BeautifulSoup` API for the
tests in this repository.  The parser simply records all ``id``
attributes and exposes a :meth:`find` method that looks them up.
"""

from __future__ import annotations

from html.parser import HTMLParser
from typing import Any


class _IDParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: set[str] = set()

    def handle_starttag(self, tag: str, attrs):  # noqa: D401 - HTMLParser API
        for k, v in attrs:
            if k == "id":
                self.ids.add(v)


class BeautifulSoup:
    def __init__(self, markup: Any, parser: str = "html.parser") -> None:
        if hasattr(markup, "read"):
            markup = markup.read()
        parser_obj = _IDParser()
        parser_obj.feed(markup)
        self._ids = parser_obj.ids

    def find(self, id: str | None = None):
        if id in self._ids:
            return object()
        return None


__all__ = ["BeautifulSoup"]

