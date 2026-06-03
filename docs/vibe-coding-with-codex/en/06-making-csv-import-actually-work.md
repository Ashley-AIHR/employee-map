# Chapter 06 - Making CSV Import Actually Work

## Why import matters so much

Upload is one of the easiest parts of a prototype to fake. A button can exist without a workflow behind it.

The user pushed this project past that point by asking for:

- a real test CSV
- an explanation of how to use it
- clarity on what kind of CSV works best

## What "actually work" meant here

A working front-end CSV import needed to:

1. Read a local file in the browser.
2. Parse rows safely.
3. Recognize common column aliases.
4. Convert rows into the internal employee model.
5. Validate missing fields and duplicates.
6. Replace the active dataset.
7. Recompute all dependent views.
8. Persist state for refreshes.

## Field aliasing was part of the product

Real company rosters are inconsistent. One file may use `employee_id`, another may use `员工编号`, another may use `ID`.

So a good import flow cannot depend on one perfect header shape. It should map a family of likely aliases into standard fields.

## Concrete alias groups from this repo

The current implementation maps groups such as:

- `employee_id / 员工ID / 员工编号 / id / ID`
- `name / 姓名 / 员工姓名`
- `department / department_l2 / 部门 / 二级部门 / 团队`
- `job_title / 岗位名称 / 岗位 / 职位`
- `contract_type / 合同类型 / 用工类型 / 用工形式`
- `hire_date / 入职日期 / 入职时间`

## Why this matters product-wise

This is where the product stopped being "demo-like." Once import works on plausible real files, the app becomes a genuine exploratory tool.

## A practical CSV template

The repo also needed a friendly sample file because users test faster when they have a known-good input.

A simple compatible shape looked like:

```csv
employee_id,name,department,job_title,level,city,contract_type,hire_date,manager
E0001,张三,销售与市场,销售经理,P4,上海,正式员工,2024-03-01,李四
```

The repo also ships a real test file:

- `outputs/test-employee-map-import.csv`

## How to prompt Codex here

Useful prompt:

`Implement a browser-side CSV import that maps common header aliases into the app's employee schema, validates common errors, updates all derived views, and ships with a known-good test CSV.`

## Key takeaway

If import is fake, the product is fake. Making import real is one of the fastest ways to make a prototype respectable.
