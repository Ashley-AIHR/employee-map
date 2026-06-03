# Vibe Coding This Project With Codex

This is a practical tutorial for how this `employee-map` project was built with Codex, using the real interaction pattern from this repo: rough design references, strong product feedback, multiple corrections, live coding, verification, and a GitHub push.

It is not a polished after-the-fact fiction. It is the actual shape of the work:

- start from visual references
- reject "just make it look similar"
- force the build toward a usable product
- add real data flow
- test the result
- publish it

## What "vibe coding" meant here

In this project, vibe coding did **not** mean "ask AI for a page and accept the first answer."

It meant:

- move quickly from intent to implementation
- keep the conversation natural and direct
- correct the agent when the result is too shallow
- use the agent for both coding and product thinking
- keep pushing until the artifact is actually usable

The quality came from iteration pressure, not from a perfect first prompt.

## The real project arc

The project started from design images for an employee organization map product.

The first possible failure mode was obvious: a model can easily turn those into a static HTML replica with screenshots or decorative panels. That would look impressive for a minute and then collapse under any real usage.

So the project had to be reframed from:

`"copy this UI"`

to:

`"build a front-end-only product prototype that really works"`

That change in framing is the most important move in the whole process.

## The actual interaction history pattern

This is the simplified but real shape of the interaction that produced the repo.

### Phase 1: visual direction

User intent:

`Use the attached pics to create a repo called employee-map with exactly the design and UI.`

What that *really* meant after clarification:

- preserve the product feel from the references
- but do not stop at a static mock
- build a functional H5 front end
- no backend

### Phase 2: correction when the first result was too shallow

User feedback pattern:

- this is simply putting pics into html
- I want you to understand the words
- this is a real product, not just pics
- I do not want only UI
- I need fully functional H5 with no backend

This was the turning point.

The build had to pivot from "visual reproduction" to:

- import flow
- data model
- department drill-down
- derived metrics
- explanation layer
- exports

### Phase 3: force realistic data

User requirement:

`Feed in real data with the size of at least a 500 person company for each page.`

That forced another major upgrade:

- replace tiny mock arrays
- generate a realistic company dataset
- make every page consume the same underlying roster

The project ended up with a deterministic 640-person sample dataset so the app opens in a believable state even before any import.

### Phase 4: testability

User requirement:

- create a CSV for testing
- explain how to use it
- explain what kind of CSV works best

That turned the repo from a demo into something someone else can actually try.

### Phase 5: documentation and publication

After the product worked locally, the repo was pushed to GitHub and then documented from the perspective of:

- how the product was built
- how Codex was used
- how to reproduce the workflow

## The concrete build sequence

This is the exact order that worked well.

### 1. Lock the product boundary

Before writing much code, define the boundary:

- front end only
- JavaScript only
- no backend
- browser-side import
- browser-side persistence
- browser-side exports

Without this, the agent can drift into vague abstractions or hidden backend assumptions.

### 2. Extract product capabilities from the design

The design images implied these capabilities:

- roster upload
- field mapping
- org overview
- department drill-down
- structure signals
- report output

That capability list became the real product spec.

### 3. Build the data model before polishing the UI

The core data model centered on people and departments.

People needed:

- `id`
- `name`
- `department`
- `role`
- `level`
- `city`
- `contract`
- `hireDate`
- `manager`

Departments needed to be derived from people so the UI would stay honest.

This made it possible to compute:

- headcount
- budget usage
- span of control
- new hire ratio
- senior ratio
- open roles

### 4. Generate realistic sample data

This repo does not open with 8 fake rows. It opens with a generated 640-person sample company.

That matters because:

- the dashboard looks populated
- department switching is meaningful
- people filters are believable
- signals can actually trigger
- exports have real content

Vibe coding works much better when the system has realistic data early.

### 5. Implement the import path

The import system was built to work fully in-browser:

- choose a local CSV
- parse it in JavaScript
- match known header aliases
- normalize rows into the app model
- validate missing values, duplicates, and date formats
- rebuild departments and metrics
- persist the imported result in `localStorage`

This is where the project stopped being "a dashboard lookalike" and started being "a usable prototype."

### 6. Make drill-down actually drive the app

Department switching was not handled as a cosmetic label change.

When the selected department changes, the app updates:

- metric cards
- org context
- people table
- signal list
- positions/openings
- export payload

That single shared state model is one of the biggest reasons the product feels real.

### 7. Add an explanation layer

Raw charts are not enough for a management-facing tool.

So the app includes derived structure signals such as:

- management span too high
- new hire ratio too high
- senior talent ratio too low
- too many open roles

This is a useful pattern when vibe coding: ask the agent not only for visuals and interactions, but also for a thin decision layer.

### 8. Add outputs, not just views

The repo exports:

- current employees as CSV
- structure signals as CSV
- management summary as JSON
- report text via clipboard or text download

This is an important lesson: if an internal tool cannot emit artifacts, it often still feels unfinished no matter how good the UI is.

### 9. Verify and ship

Codex was used not only to write code but to verify and publish it:

- syntax check
- runtime sanity check
- test CSV creation
- local server startup
- Git commit
- GitHub push

That end-to-end loop is what makes this feel like real development rather than prompt theater.

## The most useful kinds of prompts

The prompts that moved the project forward were not generic.

They had pressure and direction, for example:

- this is a real product, not just pictures
- do not give me only UI
- it must be fully functional H5 with no backend
- feed in real data for a 500+ person company
- create a CSV so I can test it
- explain how to use it
- document how Codex was actually used

These prompts work well because they:

- remove ambiguity
- correct shallow behavior quickly
- keep the agent attached to product reality

## The mistakes to avoid

If you want to vibe code a product like this with Codex, avoid these traps.

### Trap 1: asking only for "the same design"

That often yields a screenshot-inspired shell with fake buttons.

### Trap 2: accepting the first visually plausible answer

A result can look "80% there" and still have no meaningful interaction model.

### Trap 3: leaving data unspecified

If you do not ask for real sample data, the agent may build a dashboard that cannot prove anything.

### Trap 4: not asking for verification

If you do not ask for testability, you may end up with something that demos well but cannot be exercised by someone else.

## A reusable Codex workflow

If you want to do this yourself, this sequence works well:

1. Start with the product intent, not the UI alone.
2. Tell Codex what the build is **not** allowed to be.
3. Ask for the product capabilities implied by the references.
4. Ask for the data model next.
5. Ask for realistic seed data.
6. Ask for real imports, not placeholder buttons.
7. Ask for shared state and drill-down.
8. Ask for exports.
9. Ask for a sample test file.
10. Ask Codex to verify and publish.

## Why this repo is a good Codex example

This repo is useful as a tutorial because the interaction was messy in the productive way real product building is messy.

The conversation included:

- an initial visual goal
- dissatisfaction with shallow output
- a stronger restatement of the product need
- a requirement for scale and realism
- testing artifacts
- explanation requests
- documentation requests

That is much closer to real work than a neat single-shot prompt.

## Files to inspect

If you want to study the result in code:

- `README.md`
- `script.js`
- `styles.css`

If you want to test imports:

- `outputs/test-employee-map-import.csv`

If you want the narrative writeups created during the process:

- `outputs/怎么用Codex把员工组织地图做出来.md`
- `outputs/ashley-动手做06-小红书笔记文案.md`

## Final takeaway

The best way to use Codex for vibe coding a product is not to ask for magic.

Ask for momentum with accountability:

- turn the design into a capability list
- turn the capability list into a data model
- turn the data model into a working app
- turn the app into something testable
- turn the result into a published artifact

That is what happened in this repo.
