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

toc.md: $(MARKDOWNS)
	touch $@

build/.buildinfo: redo.mk dep.mk
	rm -f %@

build/spine.md: muscles/ld-trz-attachments.mdi
build/muscles/latissimus-dorsi.md: muscles/ld-trz-attachments.mdi
build/muscles/trapezius.md: muscles/ld-trz-attachments.mdi

#-------------------
# Index Generation
#-------------------

$(shell mkdir -p build/static/index/)

all: build/static/index/muscles.html

prebuild: build/static/index/muscles.md

build/static/index/muscles.md: | build/static/index
build/static/index/muscles.md: $(wildcard src/muscles/*.md)
	gen-markdown-index $^ | tee $@
	emojify < $@ > $@.tmp
	mv $@.tmp $@
	cat $@
