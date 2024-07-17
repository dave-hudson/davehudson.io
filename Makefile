.DEFAULT_GOAL := all

#
# Collect the list of source files.
#
FILES :=
TS_FILES :=

include src/Makefile.mk

#
# Convert source file paths to build file paths.
#
BUILD_FILES := $(patsubst src/%, build/%, $(FILES))

#
# Rule to copy files to the build directory if they have been modified
#
build/%: src/%
	@mkdir -p $(dir $@)
	@cp $< $@
	echo "Copied $< to $@"

build/app.js: $(TS_FILES)
	tsc \
		-noEmit \
		--strict \
		--target es6 \
		--module es6 \
		--esModuleInterop true \
		--moduleResolution node \
		--noImplicitOverride \
		--noImplicitReturns \
		--noPropertyAccessFromIndexSignature \
		--noFallthroughCasesInSwitch \
		--noUnusedLocals \
		--skipLibCheck \
		src/app.ts
	./node_modules/.bin/esbuild \
		--bundle \
		--sourcemap \
		--platform=browser \
		--outfile=build/app.js \
		--loader:.ts=ts \
		--log-level=info \
		src/app.ts

.PHONY: all

all: $(BUILD_FILES) build/app.js

#
# Rule to pre-render all the pages of the site.
#
.PHONY: prerender

prerender: all
	node prerender.js --sitemap build/sitemap.xml --replace-url http://localhost:3000=https://davehudson.io --output build -p 64

#
# Rule to build a tarball of the built site.
#
.PHONY: tar

tar: prerender
	tar -czvf davehudson.io.tar.gz -C build .

#
# Rules to clean up after builds.
#
.PHONY: clean 

clean:
	rm -f $(BUILD_FILES) build/app.js davehudson.io.tar.gz

.PHONY: realclean

realclean: clean
	rm -fr build coverage

#
# Start the local webserver.
#
.PHONY: start

start: all
	npm run start &

#
# Run tests.
#
.PHONY: test

test:
	npm run test

