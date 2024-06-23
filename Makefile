#
# Collect the list of source files.
#
FILES :=

include src/Makefile.inc

#
# Convert source file paths to build file paths.
#
BUILD_FILES := $(patsubst src/%, build/%, $(FILES))

.PHONY: all

all: $(BUILD_FILES) build/app.js
	./node_modules/.bin/esbuild src/app.js --bundle --sourcemap --outfile=build/app.js

#
# Rule to copy files to the build directory if they have been modified
#
build/%: src/%
	@mkdir -p $(dir $@)
	@cp $< $@

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
	rm -f $(BUILD_FILES) davehudson.io.tar.gz

.PHONY: realclean

realclean: clean
	rm -fr build coverage

.PHONY: start

#
# Start the local webserver.
#
start: all
	npm run start &

#
# Run tests.
#
.PHONY: test

test:
	npm run test

