# blueprint.md — Purpose and Intent of this Mindspace

This file describes **what this mindspace is for and why it is the way it is**. For
**how to work in it** (build commands, layout, authoring mechanics, what not to touch),
see `AGENTS.md`.

---

## Purpose

This mindspace is the source for **davehudson.io**, the personal website of Dave Hudson.
It is the canonical home for:

- the open source projects he has been involved with,
- his blog, and
- his open source research notes.

The site is written in the first person and is explicitly a personal site, not a company
site or a product site. Its current centre of gravity is AI: the most recent work
documented here concerns what it takes to build an AI operating system.

## Audience

The site is written for developers, AI and tooling practitioners, and people following the
Humbug / Menai / Metaphor projects. It also serves readers arriving from search engines and
from legacy `hashingit.com` links (the 404 page exists specifically to redirect those
visitors to the migrated blog content).

## Voice

Content is first person, informal, technical, and candid — the About page opens with a
joke about the time of day and describes the author as "an unrepentant geek". Opinions are
disclaimed as solely the author's own. New content should read as something the author
would write, not as neutral documentation.

---

## Content model

The site is organised into a small number of content types. Each has a distinct intent:

| Type | Intent |
|------|--------|
| **Projects** | Long-term portfolio, spanning the early 1990s to the present. Current focus is Humbug and Menai; earlier work includes VSTa, mkdosfs, gcc backends, Liquorice, c8, and countdown. |
| **Blog** | Dated essays. Older entries (roughly 2014–2020) are migrated from `hashingit.com` and are preserved for continuity. |
| **Notes** | Short, frequent, dated "open source research notes". This is the highest-volume content type and the most informal. |
| **About** | Who the author is, what the site is, and the site's design philosophy. |
| **M6R** | A one-off farewell page announcing the closure of the M6R company. See *Context and history* below. |
| **Papers** | A shared store of PDFs that blog posts and notes link to as reference material. |

Content is authored as **TypeScript virtual-DOM code**, not Markdown and not via a CMS.
This is a deliberate choice, not an accident — see *Design principles*.

**Papers is an asset store, not a section.** It has no index page and no route of its own;
PDFs placed there are served directly and linked from the blog posts and notes that cite
them. Adding a paper is a matter of dropping the PDF in place and linking to it — the build
collects the directory's PDFs automatically.

---

## Design principles and non-goals

These are durable decisions. An agent should not "helpfully" undo them.

- **Self-contained.** The site has no third-party runtime or browser dependencies. It uses a
  hand-written virtual DOM library and component framework, built originally to understand how
  single-page applications work. The only external runtime component is the nginx web server
  that serves the static files. (Note: the *build* does use tooling such as `tsc` and `esbuild`;
  the constraint is on what ships to the browser.)
- **SPA with pre-rendering.** The site is a single-page application for fast in-browser
  navigation, but every page is pre-rendered to full HTML so that search engines and first
  loads get complete markup. Both halves of this matter: dropping the SPA would lose the
  navigation speed, and dropping the pre-rendering would lose SEO.
- **Static deployment.** The build output is static files.
- **No cookies, no advertising, no tracking.** The site sets no cookies and hosts no ads.
  Server logs are retained for 28 days for operational purposes only.
- **Content as code.** Authoring in TypeScript is intentional and enables the shared
  component framework (notably syntax-highlighted code fragments).

**Non-goals:** adopting a general-purpose web framework, adding analytics or tracking,
adding advertising, or introducing a CMS.

---

## Relationship to the author's other projects

Humbug, Menai, Metaphor, and siterender are *documented* on this site but *live in separate
repositories*. This mindspace is not the source of truth for any of them. Where the site
makes claims about those projects, the project's own repository and documentation take
precedence.

The site is also a **dogfooding ground**: it is authored with the help of the author's own
AI tooling, and the `siterender` pre-rendering tool was written as part of this work. The
published `.m6r` files under `src/blog/` and `src/notes/` are content artefacts (prompt and
guideline files referenced by those posts and notes), not project-context files.

---

## Context and history

Some parts of the site will look unexplained without this background:

- **M6R closed on 2025-09-29.** The `/m6r` page announces that the author's company, M6R, was
  closed. It states that Humbug, Metaphor, and AIFPL/Menai continue as open source. The page
  is a deliberate historical record and should not be removed or "corrected".
- **Menai was formerly AIFPL.** The language began as AIFPL (AI Functional Programming
  Language), was renamed to Menai in February 2026, and was extracted into its own repository.
  The `/projects/aifpl` page exists to preserve the earlier name and history.
- **Legacy `hashingit.com` content.** Older blog posts were migrated from a previous site.
  Preserving working links into that content is a standing concern.
- **The author now lives in Abu Dhabi**, having previously been based in North Wales.

Note that the M6R page is dated 2025 while content has continued to be published well into
2026. The closure announcement marks the end of the *company*, not the end of the site or of
the open source work.

---

## Quality bar

Work in this mindspace is "done" when:

- Pages render correctly both as pre-rendered HTML and under client-side navigation.
- Every published page is reachable from the site's navigation and is listed in the sitemap.
- Previously published URLs continue to work.
- Code samples use the shared `CodeFragment` component rather than raw `pre` blocks.
- The build is reproducible from a clean checkout.

---

## External dependencies

Two things live outside this mindspace and are referenced by it:

- **`siterender`** — a sibling repository (also published as a project on this site) used to
  pre-render pages. The `siterender` make target depends on it being present alongside this
  mindspace.
- **The nginx host** — the deployment target for the built static files.

How these work is out of scope here; see `AGENTS.md` for the build and deployment commands.
