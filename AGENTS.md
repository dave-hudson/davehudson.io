# AGENTS.md — AI Agent Guide for this Mindspace

This file provides guidance for AI agents operating within this mindspace.

For the **purpose and intent** of this mindspace — what the site is for, who it is for, its
design principles, and its history — see `blueprint.md`. This file covers **how to operate**
here: layout, build, and authoring mechanics.

---

## Project Overview

This mindspace is the project for a blogsite (davehudson.io). It is a single-page application
written in TypeScript, pre-rendered to static HTML for deployment, and managed with a
TypeScript/Node.js toolchain and GNU Make.

---

## Repository Layout

| Path | Purpose |
|------|---------|
| `src/` | All website source content and code |
| `src/blog/` | Blog posts |
| `src/notes/` | Notes entries |
| `src/about/` | About page |
| `src/projects/` | Projects pages |
| `src/m6r/` | M6R closure announcement page |
| `src/papers/` | Shared PDF store, linked from blog posts and notes (no index page) |
| `src/lib/` | Shared libraries |
| `src/components/` | Shared UI components |
| `src/css/`, `src/fonts/`, `src/icons/`, `src/manifest/` | Static assets |
| `src/sitemap.xml` | Site map |
| `build/` | Build output — do not edit directly |
| `instructions/` | Prompts for creating new blog posts and notes |
| `Makefile` | Top-level makefile; recursively includes sub-makefiles |
| `esbuild.config.js` | esbuild bundler configuration |
| `jest.config.mjs` | Jest test configuration |
| `tsconfig.json` | TypeScript configuration |
| `package.json` | Node.js package manifest |
| `server.js` | Local development server |

Note: this repository is the source for the site, not for the projects it documents. Humbug,
Menai, Metaphor, and siterender live in separate repositories.

Note: `conversations/`, `temp/`, and `.humbug/` are gitignored working directories. They may
not exist in a fresh checkout and are not part of the repository.

---

## Build System

- The site is built using **GNU Make**. Run `make` from the mindspace root to build.
- Makefiles are **recursively included** from subdirectories into the top-level `Makefile`.
- The build system tracks source modifications and ensures all necessary supporting files are
  copied to the `build/` directory.
- `make` produces the client-side bundle. The `make siterender` target additionally pre-renders
  every page to static HTML; it depends on the sibling `siterender` repository being present
  alongside this mindspace, so it will fail in a checkout where that is absent.
- Do **not** manually edit files under `build/` — they are generated artefacts.

---

## Guidance for AI Agents

- **Content changes** (new posts, notes, project pages, or edits to existing content) belong
  under the appropriate `src/` subdirectory.
- **Shared logic or UI** changes belong in `src/lib/` or `src/components/`.
- **Always run `make`** (or advise the user to do so) after making source changes, so the build
  directory is kept in sync.
- The `instructions/` directory contains prompts for creating new blog posts and notes. Consult
  these when adding new dated content.
- `.m6r` files under `src/blog/` and `src/notes/` are published content artefacts (Metaphor
  prompt files referenced by those posts and notes), not project-context files.
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

  The exception is PDFs in `src/papers/`: that directory is a shared store for documents cited
  by blog posts and notes, and its `Makefile.mk` picks up every PDF with a wildcard, so no
  `FILES` edit is needed. Link to them as `/papers/<filename>.pdf`.
