# Chapter 04 - Defining The Front-End-Only Architecture

## The constraint

This project had a hard architectural rule:

- front end only
- JavaScript only
- no backend

That sounds simple, but it has serious implications.

## What the browser had to own

Because there was no backend, the browser had to handle:

- built-in sample data
- file import
- CSV parsing
- field mapping
- validation
- derived metrics
- filtering
- drill-down state
- persistence
- exports

## Why this was the right call

For a learning project and prototype, this architecture is excellent because:

- setup is trivial
- anyone can run it locally
- there is no deployment dependency
- iteration is fast
- product logic stays visible

## What we intentionally did not build

We did not build:

- a login system
- an API
- a database
- background jobs
- server-side report generation

Those would have slowed the learning loop and obscured the front-end product reasoning the user actually wanted.

## What Codex needed to understand

Codex had to be pushed to avoid hidden backend assumptions. A good prompt in this phase sounds like:

`Every workflow must complete in-browser. Use local state, browser file APIs, localStorage, and downloadable outputs. Do not introduce a server requirement.`

## The resulting architecture

At a high level, the app ended up with:

- `index.html` as the mount point
- `styles.css` as the visual system
- `script.js` as the main runtime for state, data, calculations, rendering, import, and export

That is intentionally simple, and simplicity was a feature here.

## Key takeaway

When your boundary is strict, state it early and often. Codex will stay much more faithful to the product you actually want.
