# Build rules for the IndexTree React interface.
# Included by src/dep.mk so build.mk knows how to generate assets.

# Ensure built JS is available under build/static/
all: build/static/js/indextree.js

build/static/js:
	$(Q)mkdir -p $@

# Copy the generated bundle from the app directory into the build tree
build/static/js/indextree.js: /press/static/js/indextree.js | build/static/js
	$(Q)cp $< $@

# Helper rule for copying example JSON into build tree
build/%.json: %.json
	$(Q)mkdir -p $(dir $@)
	$(Q)cp $< $@
