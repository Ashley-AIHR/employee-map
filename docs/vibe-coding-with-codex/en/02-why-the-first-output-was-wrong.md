# Chapter 02 - Why The First Output Was Wrong

## What went wrong first

The earliest failure mode was predictable: the output leaned toward static HTML that looked like the references instead of behaving like a product.

That happened because the initial request still left room for a shallow interpretation.

## The correction that changed the project

The strongest user feedback was essentially:

- this is just putting pictures into HTML
- understand the words
- this is a real product, not just images
- I do not want only UI
- I need fully functional H5 with no backend

This was not a request for polish. It was a reset of the objective.

## Why Codex needed that push

Large models are very willing to complete the nearest visible pattern. If the most obvious pattern is "design recreation," the output often stays at the level of:

- cards
- fake charts
- styled buttons
- static copy

That is not laziness so much as pattern matching. The user correction was what re-anchored the work around product semantics.

## The important lesson

When the first result is wrong, the best correction is usually not "make it better." The better correction is "you misread the object we are building."

That is what happened here.

## How to correct this in your own project

Use language like:

- "Do not stop at UI."
- "The words in the design are product requirements."
- "Every major panel must be data-driven."
- "The workflow must actually operate in the browser."
- "Treat this as a usable prototype, not a landing page."

## Key takeaway

Good vibe coding is not accepting the first shiny thing. It is steering quickly when the model locks onto the wrong abstraction level.
