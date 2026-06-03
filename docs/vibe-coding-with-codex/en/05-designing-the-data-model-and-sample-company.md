# Chapter 05 - Designing The Data Model And Sample Company

## Why data came before polish

The app could not become real until every major view was driven by a shared employee dataset.

That meant designing the data model before obsessing over chart cosmetics.

## The core employee fields

The minimum useful employee model in this project included:

- `employee_id`
- `name`
- `department`
- `job_title`
- `level`
- `city`
- `contract_type`
- `hire_date`
- `manager`

These fields were enough to derive many of the product's first useful signals.

## What those fields unlocked

With this structure, the app could compute:

- total headcount
- department headcount
- new hire share
- manager span
- senior talent ratio
- city concentration
- contract mix
- open positions derived from department state

## Why the sample company needed to be large

The user explicitly asked for data that looked like at least a 500-person company. That was a smart requirement because tiny toy datasets tend to hide structural problems.

The repo ultimately used a deterministic 640-person sample company so that:

- charts looked plausible
- drill-down had enough variation
- validation felt meaningful
- exports were worth testing

## Deterministic sample data is underrated

Using deterministic generated data instead of random throwaway data helps a lot:

- bugs are reproducible
- screenshots remain consistent
- exported values remain stable
- documentation can reference fixed behavior

## How to prompt Codex here

Try something like:

`Generate a deterministic internal sample dataset representing a realistic 500-800 employee company across multiple departments. Use fields needed for organization analysis, not generic lorem ipsum rows.`

## Key takeaway

If the data model is weak, the whole product stays fake. If the data model is sound, even a no-backend prototype starts to feel real.
