build/study/%.html: build/study/%.md build/style-social.css | build
	$(PANDOC_CMD) \
		--css '/style-social.css' \
		--standalone \
		-t html \
		--toc \
		--toc-depth=2 \
		--filter pandoc-crossref \
	-o $@ $<

build/study/%.png: build/study/%.html | build
	 wkhtmltoimage --format png --width 1080 --height 1920 --quality 100 http://localhost/study/$*.html $@

resources/study-questions.md: $(wildcard src/study/*)
	touch $@

src/deltoid.md: src/study/deltoid.md
	touch $@

toc.md: $(filter-out src/toc.md, $(MARKDOWNS))
	touch $@

build/.buildinfo: redo.mk dep.mk
	rm -f %@

#-------------------
# Index Generation
#-------------------

BUILD_SUBDIRS += build/static/index

prebuild: build/static/index/muscles.md
prebuild: src/resources/anatomy-lessons-from-the-great-masters.md

build/static/index/muscles.json: | build/static/index
	build-index -o $@ src/muscles 2> log/build-index.muscles

build/static/index/muscles.md: | build/static/index
build/static/index/muscles.md: build/static/index/muscles.json
	gen-markdown-index $^ > $@
	emojify < $@ > $@.tmp
	mv $@.tmp $@

src/resources/anatomy-lessons-from-the-great-masters.md: /app/references/src/hc77.yml
	/app/references/bin/build.py $< /app/references/src reference.jinja | tee $@

build/resources/study-questions.md: study/triceps.json

BUILD_SUBDIRS += build/study
STUDY_JSONS := $(patsubst src/%,build/%,$(wildcard src/study/*.json))
prebuild: $(STUDY_JSONS)
build/study/%.json: study/%.json | build/static/index.json
	python3 -m pie.render_study_json build/static/index.json $< > $@

build/%.json: %.json
	emojify < $< > $@

build/keyterms/index.md: build/keyterms/index.json
