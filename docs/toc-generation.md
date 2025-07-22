# Table of Contents Workflow

This document explains how `src/toc.md` is processed and how individual `toc.yml` files contribute to the final `toc.html` page.

## Dependency Tracking

`dep.mk` declares that `toc.md` should be touched whenever any other Markdown file in `src/` changes:

```make
# dep.mk
 toc.md: $(filter-out src/toc.md, $(MARKDOWNS))
        touch $@
```

Updating the timestamp ensures the file participates in rebuilds if any content page changes.

## Preprocessing `toc.md`

When `make -f redo.mk all` runs, `app/shell/mk/build.mk` creates `build/toc.md` from `src/toc.md` using the `preprocess` script. This script performs include expansion and renders the Jinja template:

```make
# build.mk
build/%.md: %.md | prebuild build
        preprocess $<
```

Inside `src/toc.md` a Jinja macro loads several `toc.yml` files with `read_yaml` and recursively renders nested lists:

```jinja
{% macro render_list(items) %}
  {% for item in items %}
    {% if item is string %}
      <li>{{ render_jinja(item) }}</li>
    {% elif item is iterable %}
      <li>
        <ul>{{ render_list(item) }}</ul>
      </li>
    {% endif %}
  {% endfor %}
{% endmacro %}

<ul>
{{render_list(read_yaml("src/bones/clavicle/toc.yml"))}}
{{render_list(read_yaml("src/bones/femur/toc.yml"))}}
...
</ul>
```

Each YAML file defines a `toc:` list containing link references. The rendered HTML from this macro becomes part of `build/toc.md`.

## Generating HTML

After preprocessing, Pandoc converts `build/toc.md` to `build/toc.html` with a generic rule:

```make
build/%.html: build/%.md $(PANDOC_TEMPLATE) | build
        $(PANDOC_CMD) $(PANDOC_OPTS) -o $@ $<
        python3 -m pie.error_on_python_dict $@
```

The resulting page is minified along with the rest of the site.

## `toc.yml` Structure

Each `toc.yml` file contains a YAML list under the `toc` key. Entries can be nested to create sublists. Example from `src/bones/scapula/toc.yml`:

```yaml
toc:
  - "{{scapula|linktitle}}"
  - - "{{acromion_process|linktitle}}"
    - "{{coracoid_process|linktitle}}"
    - "{{glenohumeral_joint|linktitle}}"
    - "{{inferior_angle_of_scapula|linktitle}}"
    - "{{spine_of_scapula|linktitle}}"
    - "{{scapular_movements|linktitle}}"
```

During rendering, these entries become nested `<ul>` elements on the Table of Contents page.

## Muscle Index

The muscle listing inside `src/toc.md` is generated automatically. A dedicated
index is built from all files under `src/muscles/` and then inserted into the
Table of Contents.

```make
build/static/index/muscles.json: | build/static/index
        build-index -o $@ src/muscles 2> log/build-index.muscles

build/static/index/muscles.md: build/static/index/muscles.json | build/static/index
        gen-markdown-index $^ > $@
        emojify < $@ > $@.tmp
        mv $@.tmp $@
```

`src/toc.md` includes the generated Markdown with:

```python
include("build/static/index/muscles.md")
```

Whenever the muscle pages change the index regenerates, keeping the muscle list
up to date.

## Summary

In short, modifications anywhere under `src/` trigger `toc.md` to update. The build system preprocesses this file with Jinja, reading all `toc.yml` fragments to assemble the hierarchy, and then Pandoc generates `toc.html`. This keeps the Table of Contents synchronized with the entire content library.
