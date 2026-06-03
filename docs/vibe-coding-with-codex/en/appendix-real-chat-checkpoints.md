# Appendix - Real Chat Checkpoints And Concrete Data Examples

This appendix grounds the tutorial in actual project evidence instead of abstract advice.

## Real user corrections that changed the build

These were the turning points:

1. `this is simply putting pics into html while i want you to understand the words -- it is a fulld esign of a real product not just pics`
2. `i need fully functional h5 with no backend -- not that i only want UI!!!!!!!!!!!!!!!!`
3. `also you need to feed in real data with the size of a at least 500 person company for each page`
4. `你的tutorial很不细致，也没有双语`
5. `还是不够细给我拆成10个章节，每个章节独立文件，中英分开文件夹`

Each one changed either scope, architecture, data expectations, or documentation shape.

## Concrete facts from the current repo

The app now ships with:

- a deterministic 640-person sample company
- 8 departments
- 10 major city values
- local CSV import
- alias-based field mapping
- validation for missing required fields, duplicate IDs, and invalid dates
- localStorage persistence
- front-end exports

## Seeded departments in `script.js`

- 产品与研发
- 平台工程
- 设计中心
- 销售与市场
- 增长销售
- 大客户销售
- 运营与客户成功
- 职能支持

## Actual rule thresholds in the app

- `maxSpan = 12`
- `minSeniorRatio = 8`
- `highNewHireRatio = 35`

## Real CSV alias support

- `employee_id / 员工ID / 员工编号 / id / ID`
- `name / 姓名 / 员工姓名`
- `department / department_l2 / 部门 / 二级部门 / 团队`
- `job_title / 岗位名称 / 岗位 / 职位`
- `contract_type / 合同类型 / 用工类型 / 用工形式`
- `hire_date / 入职日期 / 入职时间`

## One known-good CSV row

```csv
employee_id,name,department,job_title,level,city,contract_type,hire_date,manager
E0001,张三,销售与市场,销售经理,P4,上海,正式员工,2024-03-01,李四
```
