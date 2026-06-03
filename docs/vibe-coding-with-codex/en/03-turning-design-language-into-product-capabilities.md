# Chapter 03 - Turning Design Language Into Product Capabilities

## Why this translation step matters

Design references usually mix three layers together:

- visual style
- interface layout
- product meaning

Codex can help most when we separate those layers explicitly.

## The capability map from this project

The design set implied at least six major capabilities:

1. Roster upload
2. Field mapping
3. Organization overview
4. Department drill-down
5. Structure signals
6. Report output

Once that list existed, implementation became much clearer.

## Example of semantic extraction

If a page says "字段配置," the product implication is not just "show two columns." It suggests:

- imported source columns
- standardized target fields
- mapping rules
- validation checks
- maybe reusable templates

If a page says "深度分析" or "下钻," the implication is not just a filtered page. It suggests:

- a current scope
- a department context
- calculations based on that context
- comparison against company-wide baselines

## How to do this with Codex

A useful prompt pattern is:

`Do not code yet. Read these references as product requirements. List the workflows, state, inputs, outputs, and derived metrics implied by the design.`

That prompt helps Codex become a product interpreter before it becomes a code generator.

## The output you want from this step

By the end of capability extraction, you want a list like:

- required screens
- required data inputs
- required state transitions
- required derived metrics
- required exports

Only after that should UI implementation become the main focus.

## Key takeaway

The more precisely you translate design language into product capabilities, the less likely Codex is to build a beautiful but hollow shell.
