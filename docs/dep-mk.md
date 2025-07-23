# Custom Build Dependencies: dep.mk

`dep.mk` is an optional Makefile included by `app/shell/mk/build.mk`. It provides extra rules and dependency declarations on top of the generic build system.
When mounted into the Docker container via `docker-compose.yml`, it allows the
project to customize how certain files are generated and how changes trigger
rebuilds.

## Inclusion in the Build

`app/shell/mk/build.mk` contains:

```make
-include /app/mk/dep.mk
```

`docker-compose.yml` mounts the repository's `dep.mk` to that location, so any
rules defined here participate in every `make` invocation.

## Rule Breakdown

### Study Pages

```make
build/study/%.html: build/study/%.md build/style-social.css | build
$(PANDOC_CMD) \
--css '/style-social.css' \
--standalone \
-t html \
--toc \
--toc-depth=2 \
--filter pandoc-crossref \
-o $@ $<
```

This rule converts processed Markdown under `build/study/` to HTML using Pandoc.
It attaches a separate social‑media stylesheet and includes cross‑references. The
pattern `%.html` matches any study page name.

```make
build/study/%.png: build/study/%.html | build
wkhtmltoimage --format png --width 1080 --height 1920 --quality 100 \
http://localhost/study/$*.html $@
```

After the HTML page is built, this rule captures a screenshot with
`wkhtmltoimage` for use in social previews.

### Trigger Files

Several rules simply `touch` a file when their prerequisites change. This forces
Make to rebuild any targets that depend on the touched file.

```make
resources/study-questions.md: $(wildcard src/study/*)
touch $@
```

`resources/study-questions.md` updates whenever any file in `src/study/` is
modified. Likewise:

```make
src/deltoid.md: src/study/deltoid.md
touch $@
```

keeps `src/deltoid.md` in sync with the deltoid quiz JSON.

The Table of Contents page depends on every Markdown file in `src/`:

```make
toc.md: $(filter-out src/toc.md, $(MARKDOWNS))
touch $@
```

### Build Invalidations

```make
build/.buildinfo: redo.mk dep.mk
rm -f %@
```

Whenever `redo.mk` or `dep.mk` itself changes, the `.buildinfo` marker is
removed to force a full rebuild.

### Shared Attachment Fragment

```make
build/spine.md: muscles/ld_trz_attachments.mdi
build/muscles/latissimus_dorsi.md: muscles/ld_trz_attachments.mdi
build/muscles/trapezius.md: muscles/ld_trz_attachments.mdi
```

These declarations state that several generated pages depend on the
`ld_trz_attachments.mdi` snippet. With `VPATH := src` in `build.mk`, the file is
found under `src/muscles/`.

### Index Generation

`dep.mk` also orchestrates creation of a metadata index used by Jinja templates.
It adds `build/static/index` to the list of build directories and ensures that
the index exists before other targets run.

```make
BUILD_SUBDIRS += build/static/index

prebuild: build/static/index/muscles.md
prebuild: src/resources/anatomy-lessons-from-the-great-masters.md
```

The first prerequisite builds a JSON index of all muscle files and renders a
Markdown listing. The second fetches a reference file from the `/app/references`
image.

```make
build/static/index/muscles.json: | build/static/index
build-index -o $@ src/muscles 2> log/build-index.muscles

build/static/index/muscles.md: | build/static/index
build/static/index/muscles.md: build/static/index/muscles.json
gen-markdown-index $^ > $@
emojify < $@ > $@.tmp
mv $@.tmp $@
```

### Study JSON

Study quizzes are rendered with a custom Python module:

```make
BUILD_SUBDIRS += build/study
STUDY_JSONS := $(patsubst src/%,build/%,$(wildcard src/study/*.json))
prebuild: $(STUDY_JSONS)

build/study/%.json: study/%.json | build/static/index.json
python3 -m pie.render_study_json build/static/index.json $< > $@
```

Each source JSON under `src/study/` becomes a processed file in `build/study/`.
The rendering uses the metadata index for variable expansion.

### Generic JSON Rule

```make
build/%.json: %.json
emojify < $< > $@
```

Any other JSON file copied to the build directory is filtered through `emojify`
so emoji short codes are expanded.

### Key Term Dependency

Finally, the key term HTML page depends on its JSON source:

```make
build/keyterms/index.md: build/keyterms/index.json
```

which allows Pandoc to regenerate the page when the index changes.

## Summary

`dep.mk` augments the standard rules with project-specific dependencies. By
including this file, the build system gains awareness of study quiz generation,
index creation, and various cross-links so that pages stay synchronized whenever
source material changes.
