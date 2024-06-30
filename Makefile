.DEFAULT_GOAL := all

#
# Collect the list of source files.
#
FILES :=
JS_FILES :=
TS_FILES :=

include src/Makefile.inc

%.js: %.ts
	tsc --target es6 --module es6 --esModuleInterop true --moduleResolution node $<

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

build/app.js: $(JS_FILES) $(patsubst %.ts, %.js, $(TS_FILES))
	./node_modules/.bin/esbuild src/app.js --bundle --sourcemap --outfile=build/app.js

.PHONY: all

all: $(BUILD_FILES) build/app.js

#
# Rule to build a tarball of the built site.
#
.PHONY: tar

tar: all
	tar -czvf davehudson.io.tar.gz -C build .

#
# Rules to clean up after builds.
#
.PHONY: clean 

clean:
	rm -f $(patsubst %.ts, %.js, $(TS_FILES)) $(BUILD_FILES) build/app.js davehudson.io.tar.gz

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

