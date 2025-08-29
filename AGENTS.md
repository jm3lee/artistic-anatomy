## Codex

- When asked to add content under src/, handle request as an expert fine artist
  and an anatomist. Focus on educating beginners. Cross-link pages.
  - use appropriate templates like templates/summary.jinja
  - focus on superficial muscles. deep muscles aren't useful for our purposes.
  - create headings only for the illustrations; do not add any figures
    automatically
- text formatting:
  - use 80 char columns for paragraphs only
- metadata management:
  - write `description` in plain text
  - use `-` instead of `_` in `id`
  - prefer `-` instead of `_` in `url` when generating metadata
  - When editing metadata yaml, follow these rules.
    - prefer multi-line blocks (`|` or `<`) over long quoted strings
    - ensure that strings are quoted correctly and parseable
    - jinja macros must be quoted using a single quote. For example `'{{ linktitle("id") }}'`.
- When editing math, always use `$` and `$$` instead of `\( \)` or `\[ \]`.
- When editing markdown, escape single dollar signs used to mean "dollars."
- When writing software documentation, write as an expert software engineer.
  Give enough details to help new engineers on the team.
- `pie` is a built-in Python module in press. This is available in
  `press-release` docker image.
  - Do not create any new code in pie unless explicitly instructed.

### Python Module pie

`pie` is defined in the git submodule press.

path press/app/shell/py/pie
