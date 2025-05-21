#!/usr/bin/env python3
"""
index_md.py

Recursively process Markdown files under a project root, extract titles from YAML front
matter, and build a stable, hierarchically organized ASCII code for each file. Codes
incorporate directory‐based prefixes (after `src/`) so that when sorted alphabetically,
related files cluster together.

Output is written to build/index.json as a JSON object:

```json
{
  "<code>": {
    "title": "<page title>",
    "path": "<absolute file path>"
  },
  ...
}
```

Usage:
    python index_md.py /path/to/project_root
"""

import os
import sys
import yaml
import re
import json
from pprint import pprint
from typing import Any, Dict, Optional
from loguru import logger

# ### configure loguru so that kwargs show up when calling logger.info
logger.remove()
logger.add(
    sys.stderr,
    format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {message} | {extra}",
    level="INFO",
)

# Configuration: tweak these to adjust code length & depth
SEGMENT_CODE_LEN: int = 3     # chars per directory segment
NAME_CODE_LEN: int = 3        # chars for filename segment
MAX_HIER_SEGMENTS: int = 4    # how many path segments to include after `src/`

def extract_front_matter(file_path: str) -> Optional[Dict[str, Any]]:
    """Extract YAML front matter from a Markdown file.

    Args:
        file_path: Path to the Markdown file.

    Returns:
        A dict of parsed YAML front matter, or None if not present or invalid.
    """
    lines = []
    in_block = False
    with open(file_path, 'r', encoding='utf-8') as f:
        for line in f:
            if line.strip() == '---':
                if not in_block:
                    in_block = True
                else:
                    break
            elif in_block:
                lines.append(line)
    if in_block and lines:
        try:
            return yaml.safe_load(''.join(lines))
        except yaml.YAMLError:
            return None
    return None

def abbreviate_segment(segment: str, length: int = 2) -> str:
    """Turn a path segment into a lowercase ASCII prefix of given length.

    Strips non-alphanumeric chars, removes vowels, then pads or truncates.

    Args:
        segment: Directory or filename (without extension).
        length: Desired prefix length.

    Returns:
        A lowercase prefix of ASCII letters/digits, length `length`.
    """
    # Strip to ASCII alnum
    cleaned = re.sub(r'[^A-Za-z0-9]', '', segment.encode('ascii', 'ignore').decode())
    lower = cleaned.lower()
    # Remove vowels for extra density
    no_vowels = re.sub(r'[aeiou]', '', lower)
    code = no_vowels[:length]
    if len(code) < length:
        # fallback on raw letters
        code = (code + lower[:length])[:length]
    if len(code) < length:
        # pad with underscore
        code = code.ljust(length, '_')
    return code

def strip_src_prefix(rel_dir: str) -> str:
    """Drop everything up to and including the first 'src' segment."""
    if not rel_dir or rel_dir in ('.',):
        return ''
    parts = rel_dir.split(os.sep)
    if 'src' in parts:
        idx = parts.index('src')
        return os.sep.join(parts[idx + 1 :])
    return rel_dir

def abbreviate_hierarchical(rel_dir: str,
                            max_segments: int = MAX_HIER_SEGMENTS) -> str:
    """Generate a hierarchical prefix from a relative directory path.

    Uses only the segments after `src/`, up to `max_segments` deepest segments.
    Each segment is abbreviated to SEGMENT_CODE_LEN and concatenated.

    Args:
        rel_dir: Relative directory path (using os.sep).
        max_segments: Max number of path segments to include.

    Returns:
        String of length up to `SEGMENT_CODE_LEN * max_segments`.
    """
    # drop leading up-to-src/
    cleaned = strip_src_prefix(rel_dir)
    if not cleaned:
        return ''
    parts = cleaned.split(os.sep)
    # Focus on the last `max_segments` directories for locality
    tail = parts[-max_segments:]
    codes = [abbreviate_segment(seg, length=SEGMENT_CODE_LEN) for seg in tail]
    return ''.join(codes)

def abbreviate_name(name: str) -> str:
    """Abbreviate a filename (without extension) to a stable NAME_CODE_LEN–char code."""
    return abbreviate_segment(name, length=NAME_CODE_LEN)

def process_directory(root_dir: str) -> Dict[str, Dict[str, str]]:
    """Walk the directory tree, extract titles, and build a code→metadata index.

    Codes are of the form:
        [hier_prefix][file_code][optional digit]

    where hier_prefix is up to SEGMENT_CODE_LEN×MAX_HIER_SEGMENTS chars,
    file_code is NAME_CODE_LEN chars, and an optional digit is appended on collisions.

    Args:
        root_dir: Root directory to scan.

    Returns:
        A dict mapping each unique code to a dict with 'title' and 'path'.
    """
    index: Dict[str, Dict[str, str]] = {}
    seen: Dict[str, int] = {}

    for dirpath, dirnames, filenames in os.walk(root_dir):
        dirnames.sort()
        filenames.sort()

        # Relative directory path from project root
        rel_dir = os.path.relpath(dirpath, root_dir)
        hier_prefix = abbreviate_hierarchical(rel_dir)

        for fname in filenames:
            if not fname.lower().endswith('.md'):
                continue
            if fname.lower() == "index.md":
                continue

            full_path = os.path.abspath(os.path.join(dirpath, fname))
            fm = extract_front_matter(full_path)
            title = fm.get('title') if isinstance(fm, dict) else None
            linktext = fm.get('linktext') if isinstance(fm, dict) else None

            if not title:
                logger.warning("Missing front matter or title", path=full_path)
                continue

            base = os.path.splitext(fname)[0]
            file_code = abbreviate_name(base)

            # Combine hierarchical prefix and file code
            raw_code = f"{hier_prefix}{file_code}" if hier_prefix else file_code

            # Resolve collisions by appending a digit
            count = seen.get(raw_code, 0)
            if count:
                code = f"{raw_code}{count}"
                seen[raw_code] = count + 1
            else:
                code = raw_code
                seen[raw_code] = 1

            index[code] = {
                "title": title,
                "url": os.path.join(dirpath, fname).replace("src/", "/").replace(".md", ".html"),
                "linktext": linktext
            }

    return index

def main() -> None:
    """Entry point: parse args, build index, and write JSON."""
    if len(sys.argv) != 2 or not os.path.isdir(sys.argv[1]):
        print("Usage: python index_md.py /path/to/project_root")
        sys.exit(1)

    root = sys.argv[1]
    idx = process_directory(root)

    # 1) ensure build/ exists
    os.makedirs('build', exist_ok=True)

    # 2) write JSON
    out_file = os.path.join('build/static', 'index.json')
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(idx, f, ensure_ascii=True, indent=2)

    # 3) pprint to stdout
    pprint(idx)

if __name__ == '__main__':
    main()
