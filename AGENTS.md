# AGENTS.md — AI Agent Guide for this Mindspace

This file provides guidance for AI agents operating within this mindspace.

---

## Project Overview

This mindspace is the project for a blogsite (davehudson.io). It is a statically built website
managed with a TypeScript/Node.js toolchain and GNU Make.

---

## Repository Layout

| Path | Purpose |
|------|---------|
| `src/` | All website source content and code |
| `src/blog/` | Blog posts |
| `src/notes/` | Notes entries |
| `src/about/` | About page |
| `src/projects/` | Projects pages |
| `src/lib/` | Shared libraries |
| `src/components/` | Shared UI components |
| `src/sitemap.xml` | Site map |
| `build/` | Build output — do not edit directly |
| `metaphor/` | Metaphor (`.m6r`) context files describing the project |
| `conversations/` | Saved Humbug AI conversations |
| `temp/` | Temporary working files |
| `Makefile` | Top-level makefile; recursively includes sub-makefiles |
| `esbuild.config.js` | esbuild bundler configuration |
| `jest.config.mjs` | Jest test configuration |
| `tsconfig.json` | TypeScript configuration |
| `package.json` | Node.js package manifest |
| `server.js` | Local development server |

---

## Build System

- The site is built using **GNU Make**. Run `make` from the mindspace root to build.
- Makefiles are **recursively included** from subdirectories into the top-level `Makefile`.
- The build system tracks source modifications and ensures all necessary supporting files are
  copied to the `build/` directory.
- Do **not** manually edit files under `build/` — they are generated artefacts.

---

## Guidance for AI Agents

- **Content changes** (new posts, notes, project pages, or edits to existing content) belong
  under the appropriate `src/` subdirectory.
- **Shared logic or UI** changes belong in `src/lib/` or `src/components/`.
- **Always run `make`** (or advise the user to do so) after making source changes, so the build
  directory is kept in sync.
- The `metaphor/` directory contains `.m6r` context files that describe the project in more
  detail. Consult these when deeper context is needed.
- Do not commit or modify files in `build/`, `node_modules/`, `venv/`, or `temp/` unless
  explicitly instructed.
- The `.humbug/` directory is managed by the Humbug system — do not modify it.

---

## Content Authoring

Content pages are built from virtual DOM nodes using the `h()` helper (see `src/lib/dvdi.ts`).
When writing notes, blog posts, or project pages, follow these conventions:

- **Never use `+` to concatenate a string with an `h(...)` element.** `h()` takes its children
  as separate arguments, and only treats each argument as a child if it is a `string` or a
  `VNode`. Concatenating with `+` coerces the element to a string, producing the literal text
  `[object Object]` and discarding the element. Pass each piece as its own argument instead:

  ```typescript
  // Wrong — renders "[object Object]":
  h('p', {}, 'Use the ' + h('code', {}, 'bytes') + ' type.')

  // Right — separate arguments:
  h('p', {}, 'Use the ', h('code', {}, 'bytes'), ' type.')
  ```

- **Use `CodeFragment` for code blocks and code fragments** (see
  `src/lib/code-fragments/CodeFragment.ts`), not raw `pre` blocks. `CodeFragment` provides syntax
  highlighting and nicer formatting. Do not include components you do not need.

- **Referenced files** (images, source files, etc.) must be copied into the relevant content
  directory and listed in the `FILES` make variable in that directory's `Makefile.mk`. If no
  files are referenced, the `FILES` variable is not needed.
