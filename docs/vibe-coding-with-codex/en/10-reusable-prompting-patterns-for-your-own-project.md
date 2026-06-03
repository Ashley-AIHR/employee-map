# Chapter 10 - Reusable Prompting Patterns For Your Own Project

## Why patterns are better than one magic prompt

This project did not succeed because of one perfect instruction. It succeeded because the prompts evolved with the work.

Below are patterns you can reuse.

## Pattern 1: Reframe the object

`Do not just recreate the visuals. Read the text and infer the real product workflow behind the design.`

Use this when the model is drifting toward mockups.

## Pattern 2: Freeze the architecture

`This must be front-end-only, JavaScript-only, and runnable locally without a backend. Every workflow must happen in the browser.`

Use this when you want a prototype that is easy to run and inspect.

## Pattern 3: Force a real data model

`Before polishing the UI, define the internal entities, fields, relationships, and derived metrics needed for the product.`

Use this to avoid fake dashboards.

## Pattern 4: Force realistic sample data

`Seed a deterministic sample company of at least 500 employees so every page has plausible data and the product can be tested immediately.`

Use this when scale matters.

## Pattern 5: Force operable import

`Implement a real import flow, create a known-good test file, and explain exactly how to use it.`

Use this when you want the build to be testable by another person.

## Pattern 6: Force explainability

`Do not stop at charts. Add clear interpretations and rule-based structure signals so the output reads like a product, not just a dashboard.`

Use this when the product needs to help decision-making.

## Pattern 7: Force documentation

`Update the repo so a new visitor can understand what this is, how to run it, how to test it, and how Codex was used to build it.`

Use this when the repo itself is part of the deliverable.

## A reusable sequence

1. Reframe the product
2. Freeze the architecture
3. Define the data model
4. Build realistic sample data
5. Implement real workflows
6. Test locally
7. Document and publish

## The real sequence from this project

Our actual collaboration evolved roughly like this:

1. Start from design references.
2. Reject static HTML imitation.
3. Force front-end-only real workflows.
4. Force 500+ employee-scale data.
5. Force testable CSV import.
6. Force bilingual documentation.
7. Force a 10-chapter tutorial structure.

## Final takeaway

The best way to use Codex for product work is not to ask for everything at once. It is to keep giving the next sharp constraint that makes the artifact more real.
