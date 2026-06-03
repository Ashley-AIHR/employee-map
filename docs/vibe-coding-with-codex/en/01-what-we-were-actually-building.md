# Chapter 01 - What We Were Actually Building

## The short answer

We were not building a poster.

We were building a front-end-only employee map product prototype that could:

- load a realistic company dataset
- import a local CSV roster
- normalize fields
- switch department context
- compute metrics from data
- explain structure signals
- export usable outputs

## Why this chapter matters

Most AI-assisted builds fail very early because the task definition is too shallow. If the prompt is effectively "copy this visual," the model will optimize for resemblance. That usually produces a nice-looking shell with fake charts and dead buttons.

The real breakthrough in this project was changing the assignment from "match the image" to "build the product the image is describing."

## What the reference images were really saying

The Chinese phrases in the design references were product clues, not decoration:

- "可配置" meant the product had to support some kind of configurable mapping or rules
- "可下钻" meant department-level drill-down had to actually change data views
- "可解释" meant numbers alone were not enough; the system needed written interpretations
- "组织地图" implied a structured representation of the company, not a loose dashboard

So the right reading was not visual-only. It was semantic.

## The practical product boundary

The user wanted:

- H5 style
- no backend
- JavaScript only
- actually usable

That boundary shaped every later decision. It meant the browser had to do the work that many teams would normally push into APIs or a database.

## The artifact we ended up targeting

A usable prototype in this context meant:

1. Someone can open the app locally.
2. Someone can inspect built-in realistic data immediately.
3. Someone can import their own CSV.
4. The app recalculates views from that imported data.
5. The app stores state locally and exports meaningful outputs.

That is a very different goal from "make a dashboard page."

## Real checkpoint from this project

One of the most important corrections was:

`this is simply putting pics into html while i want you to understand the words -- it is a fulld esign of a real product not just pics`

That line changed the task from visual recreation to product interpretation.

## Key takeaway

Before using Codex heavily, spend one prompt clarifying what the thing actually is. That one move often saves hours of cleanup.
