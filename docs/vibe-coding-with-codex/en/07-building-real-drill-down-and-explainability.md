# Chapter 07 - Building Real Drill-Down And Explainability

## What "drill-down" should mean

In many prototypes, drill-down means changing a label or tab highlight. That is not enough.

In this project, drill-down had to mean that department context drives the rest of the system.

## What should change with department scope

When the selected department changes, the app should be able to update:

- visible headcount
- budget usage
- people table
- role mix
- structure signals
- open positions
- exports

If those do not update, the drill-down is cosmetic.

## Why explainability mattered

The design language emphasized "可解释". That meant the app should not stop at charts. It should also translate patterns into short interpretations such as:

- new hire concentration is high
- span of control is above baseline
- senior ratio is low
- city concentration is strong

## Explainability comes from rules

To produce interpretations, the app needs explicit front-end rules or thresholds. For example:

- if new hire ratio exceeds X, raise a growth signal
- if manager span exceeds Y, raise a management-load signal
- if senior share drops below Z, raise a capability gap signal

That is how numbers become usable product language.

## Why this was worth doing in the browser

Even in a no-backend prototype, rules are valuable because they:

- make the UI feel alive
- let users inspect cause and effect
- create a bridge from charts to action

## Key takeaway

Drill-down makes the product navigable. Explainability makes the product understandable.
