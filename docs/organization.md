# Repository Organization

The project groups content under directories in `src/` that mirror the Table
of Contents. Each section builds a JSON index consumed by the IndexTree React
component. `dep.mk` declares rules that generate `*-indextree.json` for
background, head, bones, joints, muscles, tendons, landmarks, movements,
appendix, and resources. These files are placed under `build/static/index/` and
are loaded by `src/toc.md` through `<div>` elements with matching `data-src`
attributes. The frontend script `indextree.js` enhances each section with an
interactive tree.

Moving Markdown pages into their section directories ensures `indextree-json`
can locate metadata and keep indices current.
