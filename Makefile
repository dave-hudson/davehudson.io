# Collect the list of source files.
FILES :=

include src/Makefile.inc

# Convert source file paths to build file paths.
BUILD_FILES := $(patsubst src/%, build/%, $(FILES))

.PHONY: all

all: $(BUILD_FILES) build/app.js
	./node_modules/.bin/esbuild src/app.js --bundle --outfile=build/app.js

# Rule to copy files to the build directory if they have been modified
build/%: src/%
	@mkdir -p $(dir $@)
	@cp $< $@

.PHONY: clean 

clean:
	rm -f $(BUILD_FILES)

.PHONY: realclean

realclean:
	rm -fr build
