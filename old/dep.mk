include app/indextree/dep.mk

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

build/.buildinfo: redo.mk dep.mk
	rm -f %@

#-------------------
# Index Generation
#-------------------

BUILD_SUBDIRS += build/static/index

#prebuild: build/static/index/muscles.md
prebuild: src/resources/anatomy-lessons-from-the-great-masters.md

#build/static/index/muscles.json: | build/static/index
#	build-index -o $@ src/muscles 2> log/build-index.muscles
#
#build/static/index/muscles.md: | build/static/index
#build/static/index/muscles.md: build/static/index/muscles.json
#	gen-markdown-index $^ > $@
#	emojify < $@ > $@.tmp
#	mv $@.tmp $@

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

build/background/keyterms/index.md: build/background/keyterms/index.json

BONES_YAMLS := $(shell find src/bones -name '*.yml')
BACKGROUND_YAMLS := $(shell find src/background -name '*.yml')
HEAD_YAMLS := $(shell find src/head -name '*.yml')
JOINT_YAMLS := $(shell find src -name '*.yml')
MUSCLE_YAMLS := $(shell find src/muscles -name '*.yml')
TENDON_YAMLS := $(shell find src -name '*.yml')
LANDMARK_YAMLS := $(shell find src -name '*.yml')
TORSO_YAMLS := $(shell find src -name '*.yml')
MOVEMENT_YAMLS := $(shell find src/movements -name '*.yml')
APPENDIX_YAMLS := $(shell find src/appendix -name '*.yml')
RESOURCE_YAMLS := $(shell find src/resources -name '*.yml')

build/static/index/background-indextree.json: $(BACKGROUND_YAMLS) | build/static/index
	indextree-json src/background > $@

build/static/index/head-indextree.json: $(HEAD_YAMLS) | build/static/index
	indextree-json src/head > $@

build/static/index/bones-indextree.json: $(BONES_YAMLS) | build/static/index
	indextree-json src/bones > $@

build/static/index/joints-indextree.json: $(JOINT_YAMLS) | build/static/index
	indextree-json -t joint src/bones > $@

build/static/index/muscles-indextree.json: $(MUSCLE_YAMLS) | build/static/index
	indextree-json src/muscles > $@

build/static/index/tendons-indextree.json: $(TENDON_YAMLS) | build/static/index
	indextree-json -t tendon src/tendons > $@

build/static/index/landmarks-indextree.json: $(LANDMARK_YAMLS) | build/static/index
	indextree-json -t landmark src > $@

build/static/index/movements-indextree.json: $(MOVEMENT_YAMLS) | build/static/index
	indextree-json src/movements > $@

build/static/index/torso-indextree.json: $(TORSO_YAMLS) | build/static/index
	indextree-json -t torso src > $@

build/static/index/appendix-indextree.json: $(APPENDIX_YAMLS) | build/static/index
	indextree-json src/appendix > $@

build/static/index/resources-indextree.json: $(RESOURCE_YAMLS) | build/static/index
	indextree-json src/resources > $@

build/static/index/forearm-indextree.json: $(MUSCLE_YAMLS) | build/static/index
	indextree-json -t forearm src/muscles > $@

build/toc.html: \
	build/static/index/background-indextree.json \
	build/static/index/head-indextree.json \
	build/static/index/bones-indextree.json \
	build/static/index/joints-indextree.json \
	build/static/index/muscles-indextree.json \
	build/static/index/tendons-indextree.json \
	build/static/index/landmarks-indextree.json \
	build/static/index/torso-indextree.json \
	build/static/index/movements-indextree.json \
	build/static/index/appendix-indextree.json \
	build/static/index/resources-indextree.json \
	build/static/index/forearm-indextree.json

build/static/index:
	mkdir -p $@

V2_YAMLS = $(shell find src/v2 -name '*.yml')
