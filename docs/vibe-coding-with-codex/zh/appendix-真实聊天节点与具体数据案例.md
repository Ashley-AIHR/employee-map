# 附录：真实聊天节点与具体数据案例

这个附录的目的，是让教程有真实支撑，而不是只讲空泛方法。

## 真正改变项目方向的几次原话

这些是最关键的聊天节点：

1. `this is simply putting pics into html while i want you to understand the words -- it is a fulld esign of a real product not just pics`
2. `i need fully functional h5 with no backend -- not that i only want UI!!!!!!!!!!!!!!!!`
3. `also you need to feed in real data with the size of a at least 500 person company for each page`
4. `你的tutorial很不细致，也没有双语`
5. `还是不够细给我拆成10个章节，每个章节独立文件，中英分开文件夹`

每一句都不是小修小补，而是在重设项目边界、数据要求或者文档结构。

## 当前 repo 里已经落下去的真实事实

现在这个 app 已经包含：

- 一套固定的 640 人样例公司
- 8 个部门
- 10 个主要城市值
- 本地 CSV 导入
- 基于别名的字段映射
- 必填字段 / 重复 ID / 日期异常校验
- localStorage 持久化
- 纯前端导出

## `script.js` 里的样例部门

- 产品与研发
- 平台工程
- 设计中心
- 销售与市场
- 增长销售
- 大客户销售
- 运营与客户成功
- 职能支持

## 当前 app 的真实规则阈值

- `maxSpan = 12`
- `minSeniorRatio = 8`
- `highNewHireRatio = 35`

## 当前 CSV 导入支持的别名

- `employee_id / 员工ID / 员工编号 / id / ID`
- `name / 姓名 / 员工姓名`
- `department / department_l2 / 部门 / 二级部门 / 团队`
- `job_title / 岗位名称 / 岗位 / 职位`
- `contract_type / 合同类型 / 用工类型 / 用工形式`
- `hire_date / 入职日期 / 入职时间`

## 一条当前可直接导入的 CSV 示例

```csv
employee_id,name,department,job_title,level,city,contract_type,hire_date,manager
E0001,张三,销售与市场,销售经理,P4,上海,正式员工,2024-03-01,李四
```
