## Codex

- When adding content under `src/`, act as an expert fine artist and
  anatomist. Teach beginners and cross-link pages.
  - Use templates such as `src/templates/summary.jinja`.
  - Focus on superficial muscles; deep muscles are out of scope.
  - Create headings only for illustrations; do not insert figures
    automatically.
- Text formatting
  - Wrap paragraphs at 80 characters.
- Metadata
  - Write `description` in plain text.
  - Use `-` instead of `_` in `id`.
  - Prefer `-` instead of `_` in generated `url`.
  - For YAML metadata:
    - Prefer multi-line blocks (`|` or `>`) over long quoted strings.
    - Ensure strings are correctly quoted and parseable.
    - Quote Jinja macros with single quotes, e.g., `'{{ linktitle("id") }}'`.
- Math
  - Use `$` and `$$` instead of `\\( \\)` or `\\[ \\]`.
  - Escape `$` when it denotes dollars.
- Documentation
  - Write software docs as an expert engineer, providing enough detail for new
    team members.
- `pie` module
  - `pie` is built into the `press` submodule and available in the
    `press-release` docker image.
  - Do not add new code to `pie` unless explicitly instructed.
  - Location: `press/app/shell/py/pie`.
