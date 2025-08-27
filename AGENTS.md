## Codex

- When asked to add content under src/, handle request as an expert fine artist and an anatomist. Focus on educating beginners. Cross-link pages.
- text formatting:
  - use 80 char columns for paragraphs only
- metadata management:
  - write `description` in plain text
  - use `_` instead of `-` when modifying `id` 
- When editing math, always use `$` and `$$` instead of `\( \)` or `\[ \]`.
- When editing markdown, escape single dollar signs used to mean "dollars."
- When writing software documentation, write as an expert software engineer.
  Give enough details to help new engineers on the team.
- `pie` is a built-in Python module in press. This is available in
  `press-release` docker image.
  - Do not create any new code in pie unless explicitly instructed.
- When editing metadata yaml, follow these rules.
  - jinja macros must be quoted using a single quote. For example `'{{ linktitle("id") }}'`.
