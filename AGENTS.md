## Codex

- When adding content under `src/`, act as an expert fine artist and
  anatomist. Teach beginners and cross-link pages.
  - Use templates such as `src/templates/summary.jinja`.
  - Focus on superficial muscles; deep muscles are out of scope.
  - Create headings only for illustrations; do not insert figures
    automatically.
- Text formatting
  - Wrap paragraphs at 80 characters.
- Tone and readability
  - Prefer a reading level suitable for high school graduates.
- Data explorer
  - When working in `src/v3`, present JSON keys and values exactly as stored.
  - Assume inputs are already correctly formatted unless the user asks for
    normalization.
- Metadata
  - Write `description` in plain text.
  - Use `-` instead of `_` in `id`.
  - Prefer `-` instead of `_` in generated `url`.
  - For YAML metadata:
    - Prefer multi-line blocks (`|` or `>`) over long quoted strings.
    - Ensure strings are correctly quoted and parseable.
    - Quote Jinja macros with single quotes, e.g., `'{{ linktitle("id") }}'`.
    - For ordered mappings, prefer a human-friendly block-style `!!omap`:
      ```yaml
      !!omap
      - key: value
      - another: value
      ```
  - Figures
    - Whenever you create new figure metadata, include an SVG placeholder image
      unless the user supplies a specific image. Match the established
      placeholder style: a 512×512 rounded rectangle with a deep blue gradient
      background, prominent title text, and a secondary line that reads
      “Illustration coming soon”. Embed the SVG as a data URI in the `url`
      field.
- Makefiles: **indent with real tab characters** for recipe lines.
  Leading spaces will break Makefile syntax. Never replace tabs with spaces.
- Math
  - Use `$` and `$$` instead of `\\( \\)` or `\\[ \\]`.
  - Escape `$` when it denotes dollars.
- Documentation
  - Write software docs as an expert engineer, providing enough detail for new
    team members.
