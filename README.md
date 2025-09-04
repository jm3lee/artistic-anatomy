## Quickstart

1. Edit `docker-compose.yml`. Adjust `image` as necessary. *In the future,
   provide users with templates or wizards. Need examples.*
2. Edit `redo.mk`. Update the list of services.
3. Edit documents under `src/`.
4. Optionally customize `src/pandoc-template.html` for your project.
5. Edit `docker` rule in `redo.mk` if you'd like to push docker images to a
   container registry.

### General Setup

```
alias r='make -f redo.mk'
r seed
r up
```

## template params

- `status`: "Reviewed", "Pending Review"

## Anatomy Data Model

`models/anatomy.py` defines an `Anatomy` dataclass that captures basic muscle
information. The class contains three list fields:

- `actions`: movements produced by the muscle
- `insertions`: distal attachment points
- `origins`: proximal attachment points

List items may be plain strings or dictionaries. Actions can reference other
muscles with an `id` and an optional `note`. Attachments in `insertions` and
`origins` accept structured objects with a `site` mapping and optional
`label` and `note` fields:

```yaml
- site:
    bone: humerus
    feature: greater-tubercle
  label: posterior fibers
  note: via a short tendon
```

Each field defaults to an empty list. Use this schema when recording muscle
metadata in Python code.
