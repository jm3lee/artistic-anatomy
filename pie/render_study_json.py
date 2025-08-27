"""Render study JSON with a very small template engine.

This module provides a tiny subset of the original project's
functionality, just enough for the tests in this kata.  It exposes a
``render_study`` helper that renders Jinja expressions inside a list of
question dictionaries and a ``main`` function that behaves like a small
CLI utility.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any, Dict, Iterable

import re


TEMPLATE_RE = re.compile(r"{{(.*?)}}")


def _make_env(index: Dict[str, Dict[str, Any]]):
    """Create a tiny templating environment.

    It exposes ``get_desc``, ``get_insertions`` and ``render_jinja`` similar to
    the original project but without depending on external libraries.
    """

    def get_desc(name: str) -> Dict[str, Any]:
        data = dict(index[name])
        if "title" not in data and "name" in data:
            data["title"] = data["name"]
        return data

    def get_insertions(name: str) -> Iterable[str]:
        desc = get_desc(name)
        return desc.get("anatomy", {}).get("insertions", [])

    def render_jinja(value: Any) -> Any:
        if isinstance(value, str):
            def repl(match: re.Match[str]) -> str:
                expr = match.group(1).strip()
                return str(eval(expr, {'get_desc': get_desc, 'get_insertions': get_insertions}))

            return TEMPLATE_RE.sub(repl, value)
        if isinstance(value, list):
            return [render_jinja(v) for v in value]
        if isinstance(value, dict):
            return {k: render_jinja(v) for k, v in value.items()}
        return value

    return {
        'get_desc': get_desc,
        'get_insertions': get_insertions,
        'render_jinja': render_jinja,
    }


def render_study(index: Dict[str, Dict[str, Any]], questions: Iterable[Dict[str, Any]]):
    """Render a list of question dictionaries using Jinja2."""

    env = _make_env(index)
    render = env['render_jinja']
    return [render(q) for q in questions]


def main(argv: Iterable[str] | None = None) -> None:
    """Command‑line entry point used in the tests."""

    parser = argparse.ArgumentParser()
    parser.add_argument("index")
    parser.add_argument("study")
    parser.add_argument("-o", "--output")
    args = parser.parse_args(argv)

    index_data = json.loads(Path(args.index).read_text())
    study_data = json.loads(Path(args.study).read_text())
    rendered = render_study(index_data, study_data)

    if args.output:
        Path(args.output).write_text(json.dumps(rendered))
    else:
        print(json.dumps(rendered))


if __name__ == "__main__":  # pragma: no cover - manual CLI use
    main()

