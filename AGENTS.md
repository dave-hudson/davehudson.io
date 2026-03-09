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
