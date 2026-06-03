# Employee Map

Interactive JS-only front-end prototype for an employee map product. The built-in sample is a deterministic 640-person company roster, so every page starts with realistic 500+ employee scale even before importing a file.

**Learning project / 学习型项目**

This repository is a learning project about turning strong visual references into a usable front-end-only product prototype with Codex. It is intentionally built as a browser-first demo for exploration, iteration, and product thinking.

这个仓库是一个学习型项目，目标是用 Codex 把一组强视觉参考图，真正落成一个“前端可用”的产品原型。它被刻意做成浏览器优先的演示系统，用来练习产品拆解、交互实现、数据建模和快速迭代。

## Mini how-to / 快速上手

1. Start a local server from the repo root: `python3 -m http.server 4173`
2. Open `http://127.0.0.1:4173`
3. Try the built-in 640-person sample first
4. Click `导入数据` and import `outputs/test-employee-map-import.csv`
5. Switch departments, open `结构信号`, and export CSV / JSON outputs

1. 在仓库根目录启动本地服务：`python3 -m http.server 4173`
2. 打开 `http://127.0.0.1:4173`
3. 先体验内置的 640 人样例数据
4. 点击 `导入数据`，导入 `outputs/test-employee-map-import.csv`
5. 切换部门，查看 `结构信号`，并测试 CSV / JSON 导出

The prototype models the actual employee-map workflow:

- Import a roster and normalize fields into a reusable employee data model
- Map inconsistent company roster columns into standard organization fields
- Browse an organization tree and switch department context
- Filter the employee table by department, contract type, level, and search text
- Inspect department metrics, people records, open positions, and structure signals
- Adjust front-end rule thresholds and immediately refresh structure signals
- Persist imported data, mapping selections, and rules in `localStorage`
- Generate CSV / JSON / text exports directly in the browser

The sample roster includes eight departments, department heads, individual employee IDs, managers, job titles, cities, contract types, levels, hire dates, validation status, and derived budget/open-HC signals.

## Codex tutorial

This repo now includes a chapter-based bilingual tutorial on how the project was vibe-coded with Codex using the real interactive development flow: reference images, user corrections, realistic data, import logic, verification, and GitHub publication.

这个仓库现在包含一套按章节组织的双语教程，完整讲了这个项目是怎么在真实互动中用 Codex 做出来的：从参考图、纠偏、真实数据、导入逻辑，到验证和发布。

- `docs/vibe-coding-with-codex.md`: bilingual tutorial landing page / 双语教程总目录
- `docs/vibe-coding-with-codex/en/`: 10 English tutorial chapters
- `docs/vibe-coding-with-codex/zh/`: 10 个中文教程章节
- `docs/vibe-coding-with-codex/en/appendix-real-chat-checkpoints.md`: real chat checkpoints and concrete data evidence
- `docs/vibe-coding-with-codex/zh/appendix-真实聊天节点与具体数据案例.md`: 真实聊天节点与具体数据证据
- `outputs/test-employee-map-import.csv`: test import file for trying the app quickly

## Local preview

Run a simple static server from the repo root:

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173`.

## Structure

- `index.html`: minimal app mount point
- `styles.css`: dashboard visual system and responsive layout
- `script.js`: all sample data, CSV parser, local storage, derived org metrics, rendering, navigation, filters, drawers, rules, and browser-side exports
