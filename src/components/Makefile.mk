COMPONENT_TS := $(wildcard src/components/*.ts)
COMPONENT_JS := $(patsubst %.ts,%.js,$(COMPONENT_TS))

$(COMPONENT_JS): %.js: %.ts
	npx tsc $< --outDir ./ --target es2020 --module es2020 --moduleResolution node --allowSyntheticDefaultImports

components: $(COMPONENT_JS)

.PHONY: components
