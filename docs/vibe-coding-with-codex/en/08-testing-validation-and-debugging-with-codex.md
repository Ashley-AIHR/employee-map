# Chapter 08 - Testing, Validation, And Debugging With Codex

## Why this stage matters

A lot of AI-generated work looks finished before it is tested. This project improved because the user kept asking the practical questions:

- can I import a file now?
- what CSV should I use?
- why is the server not reachable?

Those questions pulled the project into real verification.

## The kinds of checks that mattered here

For a front-end-only product like this, useful checks included:

- does the local server return HTTP 200
- does the browser load the app
- does CSV import parse correctly
- are there duplicate IDs
- are required fields missing
- are date formats valid
- do derived metrics recompute after import

## Concrete validations in the current app

The current import flow explicitly validates:

- total employee rows
- missing required fields
- duplicate employee IDs
- invalid date formats

The import drawer also tells the user that the browser will:

- parse the file
- generate the employee list
- rebuild departments
- save the result to `localStorage`

## Why Codex is useful in this phase

Codex is strong at turning fuzzy bug reports into structured debugging passes:

- inspect the current files
- inspect server state
- inspect sample data
- search for stale text
- verify outputs
- patch the exact broken logic

## The role of deterministic data in testing

Because the sample company was deterministic, validation outputs were stable. That made it easier to:

- confirm regression fixes
- document expected behavior
- explain usage to another person

## Good prompting for debugging

Examples:

- `Find why the local page is refusing the connection and make the preview reachable again.`
- `Create a known-good CSV that fits the current import logic so I can test end to end.`
- `Search the source for old static marketing phrases and remove anything that is not product-real.`

## Key takeaway

Testing is where vibe coding becomes engineering. The handoff from "looks right" to "proves right" is where the project gains credibility.
