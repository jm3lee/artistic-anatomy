## Codex guidelines

These instructions apply to the entire repository. Consult them before
editing or adding content.

### Content under `src/`

- Write as an expert fine artist and anatomist with beginners in mind.
- Cross-link pages using Jinja macros.
- Use templates such as `templates/summary.jinja`.
- Focus on superficial muscles; deep muscles are out of scope.
- For illustrations create headings only; do not auto insert figures.

### Text formatting

- Wrap paragraph text at 80 columns.
- Escape single dollar signs when they represent currency.
- For math, use `$` or `$$` delimiters, not `\\(` or `\\[`.

### Metadata

- Write `description` as plain text.
- Use `-` instead of `_` in `id` and prefer `-` in generated `url`.
- When editing YAML metadata:
  - Favor multi-line blocks (`|` or `<`) over long quoted strings.
  - Ensure all strings are quoted and parseable.
  - Quote Jinja macros with single quotes, e.g. `'{{ linktitle("id") }}'`.

### Software documentation

- When documenting software, write as an expert engineer and provide
  enough detail to help new team members.

### Python module `pie`

- `pie` lives in the `press` submodule at `press/app/shell/py/pie`.
- It is available in the `press-release` Docker image.
- Do not create new code in `pie` unless explicitly instructed.
