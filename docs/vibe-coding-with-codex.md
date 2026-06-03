# Vibe Coding With Codex: A Bilingual, Detailed Tutorial

## 1. What This Document Is

This is a practical, bilingual tutorial for how `employee-map` was actually built with Codex.

It is based on the real working pattern behind this repo:

- start from visual references
- realize the first pass is too shallow
- push from "pretty UI" to "usable product"
- add real data, import flow, drill-down, and exports
- verify locally
- push to GitHub

这是一份双语、可实操的教程，讲的是 `employee-map` 这个项目到底是怎么用 Codex 做出来的。

它不是抽象心得，也不是事后美化过的故事，而是基于这个仓库背后的真实工作路径：

- 从视觉参考图开始
- 很快发现第一版太浅
- 把目标从“好看页面”推向“可用产品”
- 加入真实数据、导入流程、下钻和导出
- 本地验证
- 推到 GitHub

## 2. What "Vibe Coding" Meant In This Project

In this repo, vibe coding did **not** mean:

- give AI one sentence
- accept the first shiny output
- stop when the UI looks close enough

Instead, it meant:

- move fast
- keep the conversation natural
- correct shallow output immediately
- use Codex for product reasoning, not only code generation
- keep going until the artifact is actually testable

在这个项目里，vibe coding 不是：

- 丢给 AI 一句话
- 第一版看着顺眼就收工
- 页面长得像就算完成

它真正的意思更接近：

- 快速推进
- 保持自然对话
- 一旦结果太浅就立刻纠偏
- 让 Codex 参与产品判断，不只是生成代码
- 一直推进到东西真的能测、能跑、能验证

## 3. The Core Lesson Up Front

The single most important move was reframing the task.

The project could have been framed like this:

`Copy this design.`

That would probably have produced:

- static layout
- fake charts
- screenshot-like UI
- decorative buttons with no workflow behind them

Instead, the project had to be reframed like this:

`Build a front-end-only, H5-style employee map prototype that actually works, even with no backend.`

最重要的一步，是重新定义任务。

这件事如果一开始被定义成：

`照着这个设计图做一个页面`

那很容易得到的是：

- 静态布局
- 写死的图表
- 很像截图的界面
- 看起来能点、实际上没有工作流的按钮

真正有效的定义应该是：

`做一个纯前端、H5 风格、没有后端但真的可用的员工组织地图原型`

这个改写，决定了后面是不是产品，而不只是图片。

## 4. The Real Interaction Pattern

This section matters because many people think the quality came from one magic prompt.

It did not.

The quality came from a sequence of corrections.

### 4.1 Initial request

The initial request was essentially:

`Use the attached pictures to build this repo and match the design/UI.`

That is a common starting point in vibe coding: visual references first, product semantics second.

最初的请求，本质上是：

`用这些参考图把 repo 做出来，并尽量对齐设计与界面`

这是很典型的 vibe coding 起点：先有视觉参考，再慢慢补产品语义。

### 4.2 First correction

Then came the critical correction:

- this is just putting pictures into HTML
- I want you to understand the words
- this is a real product, not just images
- I do not want only UI
- I need a fully functional H5 with no backend

This is what turned the direction.

The user was not asking for "better styling."
The user was asking for a change in the ontology of the thing:

- from mockup
- to system

接着出现了真正关键的纠偏：

- 这只是把图片塞进 HTML
- 我要你理解图上的意思
- 这是一个真实产品，不只是图片
- 我不要只有 UI
- 我要一个没有后端但完整可用的 H5

这一步不是在要求“样式更好”。
这一步是在改变这个东西的本体：

- 从 mockup
- 变成 system

### 4.3 Second correction: realism

Then came another strong requirement:

`Feed in real data with the size of at least a 500 person company for each page.`

That forced the app to stop leaning on tiny placeholder arrays and start acting like a real internal tool.

然后又加了一层很硬的要求：

`每一页都要喂真实数据，规模至少像 500 人以上的公司`

这一条会强制系统脱离“小数组 + 好看图表”的演示套路，开始朝真实内部工具靠近。

### 4.4 Third correction: testability

Then the work moved into testability:

- create a CSV for me to test
- explain how to use it
- explain what kind of CSV works well

At that point, the repo was no longer just a demo artifact. It had to be operable by someone else.

接着任务进入“可测试性”阶段：

- 给我创建一份测试 CSV
- 告诉我怎么用
- 告诉我什么样的 CSV 最好用

走到这一步时，这个 repo 就不再只是展示品了，而必须变成“别人也能真的上手试”的东西。

## 5. The Concrete Build Sequence

Below is the actual sequence that worked well.

This is the part you can copy for your own projects.

下面是这次真正有效的构建顺序。

这一部分最适合你直接照着复用。

### Step 1: Define the product boundary first

Before asking Codex to write much code, define the boundaries clearly.

For this project, the boundary was:

- front end only
- JavaScript only
- no backend
- browser-side import
- browser-side persistence
- browser-side export

Why this matters:

- it prevents hidden server assumptions
- it keeps Codex from over-abstracting
- it makes the architecture simpler and more honest

第一步：先定义产品边界，再让 Codex 写代码。

这次项目的边界很清楚：

- 只做前端
- 只用 JavaScript
- 不做后端
- 浏览器内导入
- 浏览器内存储
- 浏览器内导出

这一步为什么重要：

- 可以防止它偷偷依赖服务端假设
- 可以避免 Codex 一上来就过度抽象
- 会让整体架构更简单，也更诚实

### Step 2: Extract product capabilities from the design

The design images were not treated as final UI instructions.

They were treated as a capability source.

The app capabilities implied by the references were:

- roster upload
- field mapping
- org overview
- department drill-down
- structure signals
- report output

That capability list became the real spec.

第二步：把设计图当成“能力来源”，不是“最终说明书”。

这组设计图真正暗示的产品能力包括：

- 花名册导入
- 字段映射
- 组织总览
- 部门下钻
- 结构信号
- 报表输出

这份能力清单，才是真正的产品规格。

### Step 3: Build the data model before polishing the UI

This was one of the biggest quality upgrades.

Before polishing the interface, Codex was pushed to define the data model.

The people model needed:

- `id`
- `name`
- `department`
- `role`
- `level`
- `city`
- `contract`
- `hireDate`
- `manager`

The department model needed to be derived from people so the numbers would stay consistent.

That made it possible to compute:

- headcount
- budget usage
- span of control
- new hire ratio
- senior ratio
- open roles

第三步：先做数据模型，再做精修界面。

这是整个质量提升最大的动作之一。

在打磨界面之前，我先让 Codex 定义数据模型。

员工对象至少需要：

- `id`
- `name`
- `department`
- `role`
- `level`
- `city`
- `contract`
- `hireDate`
- `manager`

部门对象则必须从员工数据派生出来，这样页面上的统计才不会互相打架。

有了这一层，系统才能稳定算出：

- 人数
- 编制使用率
- 管理跨度
- 新人占比
- 高阶人才占比
- 开放岗位

### Step 4: Seed realistic sample data early

This repo eventually used a deterministic 640-person sample company.

That decision mattered because realistic sample data changes everything:

- charts become meaningful
- department filters become believable
- drill-down becomes useful
- export files are no longer empty or toy-like
- the product feels alive before any import

This is an important Codex lesson:

If you leave the data vague, the app will often stay shallow.

第四步：尽早放入真实感足够强的样例数据。

这个 repo 最后使用的是一套可重复生成的 640 人样例公司数据。

这一步非常关键，因为一旦数据足够真实：

- 图表才有意义
- 部门筛选才像真的
- 下钻才值得做
- 导出文件才不是玩具
- 产品在没导入数据前就已经“活着”

这也是一个很重要的 Codex 使用经验：

如果你把数据留得太模糊，应用通常也会一直停在浅层。

### Step 5: Make import real, not decorative

This was a hard requirement for the project.

The import path had to work fully in-browser:

1. choose a local CSV
2. parse it in JavaScript
3. match common header aliases
4. normalize rows into the app model
5. validate missing fields, duplicates, and date formatting
6. rebuild departments and derived metrics
7. save the result in local state and `localStorage`

That is the moment the app stopped being "dashboard theater" and started becoming a usable prototype.

第五步：让导入变成真的，而不是装饰性的按钮。

这次项目里，这一步是硬要求。

导入流程必须完全在浏览器里成立：

1. 选择本地 CSV
2. 用 JavaScript 解析
3. 匹配常见表头别名
4. 统一映射成员工对象
5. 校验缺失字段、重复 ID、日期格式
6. 重建部门与派生指标
7. 写入本地状态和 `localStorage`

就是从这一步开始，项目才真正从“仪表盘表演”变成“可用原型”。

### Step 6: Make drill-down drive everything

Department drill-down was not treated as a label change.

When the selected department changes, the app updates:

- metric cards
- current org context
- filtered people table
- structure signals
- positions/openings
- export payload

This unified state flow is one of the biggest reasons the product feels coherent.

第六步：让“下钻”真正驱动全局，而不是只换个标题。

部门切换之后，下面这些都必须联动：

- 指标卡
- 当前组织上下文
- 人员清单
- 结构信号
- 编制与空缺
- 导出内容

这种统一的状态流，是产品看起来“像真的”最核心的原因之一。

### Step 7: Add an explanation layer

Management-facing products cannot stop at charts.

So the app added structure signals such as:

- management span too high
- new hire ratio too high
- senior ratio too low
- too many open roles

That means the system does not only say:

`here is a number`

It also begins to say:

`here is what this number might mean`

第七步：补上“解释层”。

面向管理者的产品，不能停在图表本身。

所以系统里又增加了结构信号，例如：

- 管理跨度偏大
- 新人占比偏高
- 高阶人才占比偏低
- 开放岗位过多

这样系统不只是告诉你：

`这个数字是多少`

它还开始告诉你：

`这个数字可能意味着什么`

### Step 8: Add outputs, not only views

If the tool can only be looked at, it still feels incomplete.

So the repo exports:

- current employees as CSV
- structure signals as CSV
- management summary as JSON
- report text via clipboard or text download

This is one of the strongest patterns for internal-tool vibe coding:

Do not stop at visualization. Add outputs that could plausibly enter a workflow.

第八步：不要只做“看”，还要做“出”。

如果一个工具只能浏览，不能输出，它通常还是会显得没做完。

所以这个 repo 做了：

- 当前人员 CSV 导出
- 结构信号 CSV 导出
- 管理摘要 JSON 导出
- 汇报文本复制或文本下载

这是内部工具型 vibe coding 很值得记住的一条：

不要停在可视化，要继续补到可进入工作流的输出动作。

### Step 9: Verify and publish

Codex was not used only to generate code.

It was also used to:

- check syntax
- run runtime sanity checks
- create a test CSV
- start a local server
- inspect Git state
- commit changes
- push to GitHub

This is what turns the workflow from "prompting" into development.

第九步：验证并发布。

Codex 在这里不只是代码生成器，它还被用来：

- 做语法检查
- 做运行时 sanity check
- 生成测试 CSV
- 启动本地服务
- 查看 Git 状态
- 提交改动
- 推送到 GitHub

这一步会把整个流程从“提问”变成真正的“开发”。

## 6. The Most Useful Prompt Shapes

The best prompts in this project were not long and poetic. They were sharp and corrective.

Examples:

- `This is a real product, not just pictures.`
- `Do not give me only UI.`
- `I need fully functional H5 with no backend.`
- `Feed in real data for at least a 500 person company.`
- `Create a CSV so I can test it.`
- `Explain how to use it.`
- `Update the repo to contain a tutorial of how to do vibe coding with Codex.`

Why these worked:

- they removed ambiguity
- they rejected shallow success criteria
- they re-attached the project to actual usage

这一项目里，最有用的提示词并不文艺，也不追求完美措辞，它们很直接，而且带纠偏能力。

例如：

- `This is a real product, not just pictures.`
- `Do not give me only UI.`
- `I need fully functional H5 with no backend.`
- `Feed in real data for at least a 500 person company.`
- `Create a CSV so I can test it.`
- `Explain how to use it.`
- `Update the repo to contain a tutorial of how to do vibe coding with Codex.`

这些提示词为什么有效：

- 它们消除了模糊空间
- 它们拒绝了浅层“看起来差不多”的成功标准
- 它们把项目重新绑回真实使用场景

## 7. A Reusable Prompt Sequence You Can Copy

If you want to repeat this kind of project with Codex, this order works well.

### Prompt 1: define the project type

```text
This is not a static UI replication task.
Build a front-end-only product prototype that really works.
No backend. JavaScript only. Browser-side state and exports are fine.
```

### Prompt 2: extract capabilities from references

```text
Do not start coding yet.
Look at the references and tell me what product capabilities they imply.
I care about the workflow, not just the visuals.
```

### Prompt 3: define the data model

```text
Before polishing the UI, define the people and department data models we need
so the metrics, drill-down, and exports can all run on the same state.
```

### Prompt 4: require realistic seed data

```text
Create realistic sample data for a 500+ person company so every page has believable content.
```

### Prompt 5: force real import behavior

```text
Do not make upload a fake button.
Implement a real browser-side CSV import flow with validation.
```

### Prompt 6: force shared-state drill-down

```text
When I switch departments, metrics, tables, signals, and exports should all update together.
```

### Prompt 7: require testability

```text
Create a sample CSV for testing and explain exactly how to use it in the app.
```

### Prompt 8: require repo-quality documentation

```text
Document how this was actually built with Codex, including the interaction history pattern, corrections, and workflow.
```

如果你想复用这类流程，下面这组顺序很稳。

### 提示词 1：先定义项目类型

```text
This is not a static UI replication task.
Build a front-end-only product prototype that really works.
No backend. JavaScript only. Browser-side state and exports are fine.
```

### 提示词 2：先抽产品能力

```text
Do not start coding yet.
Look at the references and tell me what product capabilities they imply.
I care about the workflow, not just the visuals.
```

### 提示词 3：先定数据模型

```text
Before polishing the UI, define the people and department data models we need
so the metrics, drill-down, and exports can all run on the same state.
```

### 提示词 4：要求真实样例数据

```text
Create realistic sample data for a 500+ person company so every page has believable content.
```

### 提示词 5：强制导入流程为真

```text
Do not make upload a fake button.
Implement a real browser-side CSV import flow with validation.
```

### 提示词 6：强制联动式下钻

```text
When I switch departments, metrics, tables, signals, and exports should all update together.
```

### 提示词 7：强制可测试性

```text
Create a sample CSV for testing and explain exactly how to use it in the app.
```

### 提示词 8：要求 repo 级教程文档

```text
Document how this was actually built with Codex, including the interaction history pattern, corrections, and workflow.
```

## 8. Common Failure Modes

These are the failure modes most likely to appear if you are not explicit enough with Codex.

### Failure mode 1: screenshot shell

The app looks impressive but has no real inputs, state, or outputs.

### Failure mode 2: fake upload

There is an upload button, but it does not parse anything meaningful.

### Failure mode 3: disconnected modules

The org tree, metric cards, people list, and exports all depend on different fake datasets.

### Failure mode 4: nice charts, no interpretation

The app shows numbers but gives no decision signal.

### Failure mode 5: undocumented demo

The app works on the builder's machine but is hard for anyone else to try.

如果你对 Codex 的要求不够明确，这类项目最容易掉进下面几个坑。

### 坑 1：截图外壳

页面看起来挺像，但没有真实输入、状态和输出。

### 坑 2：假的上传

页面上有上传按钮，但并没有真正解析可用数据。

### 坑 3：模块彼此断裂

组织树、指标卡、人员表、导出，背后其实是不同的假数据源。

### 坑 4：图表很漂亮，但没有解释

只能展示数字，不能形成决策信号。

### 坑 5：只有作者自己会用

项目在作者机器上能跑，但别人很难接手和验证。

## 9. What Codex Was Best At In This Project

Codex was most helpful when used as a persistent collaborator across several layers:

- translating product intent into modules
- generating realistic seed data
- wiring front-end data flow
- implementing browser-side import/export logic
- verifying the build
- handling GitHub publication

It was less useful when allowed to guess the nature of the task too loosely.

The tighter the product boundary became, the more useful Codex became.

在这个项目里，Codex 最有价值的地方，不是单点写某一段代码，而是能跨多个层次持续协作：

- 把产品意图翻译成模块
- 生成真实感足够的样例数据
- 串起前端数据流
- 实现浏览器内导入与导出
- 帮忙做验证
- 帮忙处理 GitHub 发布

相反，如果让它太自由地“猜任务性质”，它就更容易做浅。

项目边界越清楚，Codex 的价值越大。

## 10. Files To Inspect

If you want to study this repo:

- `README.md`
- `script.js`
- `styles.css`
- `docs/vibe-coding-with-codex.md`

If you want to test the import flow quickly:

- `outputs/test-employee-map-import.csv`

If you want the narrative writeups created during the process:

- `outputs/怎么用Codex把员工组织地图做出来.md`
- `outputs/ashley-动手做06-小红书笔记文案.md`

如果你想继续研究这个 repo，可以重点看：

- `README.md`
- `script.js`
- `styles.css`
- `docs/vibe-coding-with-codex.md`

如果你想快速测试导入流程，可以直接用：

- `outputs/test-employee-map-import.csv`

如果你想看这次过程中写出来的叙事型文档：

- `outputs/怎么用Codex把员工组织地图做出来.md`
- `outputs/ashley-动手做06-小红书笔记文案.md`

## 11. Final Takeaway

The best way to use Codex for vibe coding is not to ask it for magic.

Ask it to help you keep momentum while staying accountable to reality:

- turn the design into capabilities
- turn capabilities into a data model
- turn the data model into a working app
- turn the app into something testable
- turn the tested result into a publishable project

That is what happened in this repo.

用 Codex 做 vibe coding，最好的方式不是求“魔法”。

而是让它帮你在保持速度的同时，对现实负责：

- 把设计图变成能力清单
- 把能力清单变成数据模型
- 把数据模型变成可运行应用
- 把应用变成可测试产物
- 把通过验证的结果变成可发布项目

这就是这个 repo 真正发生的事情。
