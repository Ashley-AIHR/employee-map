const state = {
  view: "map",
  selectedDepartmentId: "all",
  search: "",
  contract: "全部",
  level: "全部",
  mappingOpen: false,
  importOpen: false,
  selectedPersonId: "E1007",
  rule: {
    maxSpan: 12,
    minSeniorRatio: 8,
    highNewHireRatio: 35
  }
};

const departments = [
  { id: "all", name: "Ashley AIHR", parent: null, head: "Ashley", people: 18732, open: 12, span: 7.2, newHire: 28.4, senior: 18.7, city: "全集团", budget: 19300 },
  { id: "prd", name: "产品与研发", parent: "all", head: "周然", people: 4258, open: 31, span: 7.8, newHire: 21.4, senior: 39.2, city: "上海", budget: 4380 },
  { id: "sales", name: "销售与市场", parent: "all", head: "林嘉", people: 3862, open: 56, span: 12.4, newHire: 43.0, senior: 32.6, city: "上海", budget: 3970 },
  { id: "ops", name: "运营与客户成功", parent: "all", head: "陈晗", people: 2214, open: 22, span: 9.6, newHire: 28.6, senior: 24.8, city: "北京", budget: 2300 },
  { id: "func", name: "职能支持", parent: "all", head: "何青", people: 1986, open: 13, span: 8.4, newHire: 17.3, senior: 21.5, city: "深圳", budget: 2050 },
  { id: "design", name: "设计中心", parent: "prd", head: "许诺", people: 1123, open: 9, span: 6.4, newHire: 18.8, senior: 28.1, city: "杭州", budget: 1160 },
  { id: "platform", name: "平台工程", parent: "prd", head: "顾骁", people: 1732, open: 15, span: 8.2, newHire: 23.1, senior: 44.5, city: "上海", budget: 1780 },
  { id: "growth", name: "增长销售", parent: "sales", head: "罗一", people: 1840, open: 34, span: 14.1, newHire: 46.2, senior: 30.4, city: "上海", budget: 1900 },
  { id: "enterprise", name: "大客户销售", parent: "sales", head: "孟夏", people: 1248, open: 18, span: 12.4, newHire: 43.0, senior: 32.6, city: "北京", budget: 1320 }
];

const people = [
  ["E1001", "周然", "产品与研发", "VP", "P7", "上海", "正式员工", "2019-04-12", "Ashley"],
  ["E1002", "顾骁", "平台工程", "总监", "P6", "上海", "正式员工", "2020-03-18", "周然"],
  ["E1003", "许诺", "设计中心", "总监", "P6", "杭州", "正式员工", "2021-01-09", "周然"],
  ["E1004", "林嘉", "销售与市场", "VP", "P7", "上海", "正式员工", "2018-11-06", "Ashley"],
  ["E1005", "罗一", "增长销售", "高级经理", "P5", "上海", "正式员工", "2023-08-20", "林嘉"],
  ["E1006", "孟夏", "大客户销售", "高级经理", "P5", "北京", "正式员工", "2024-02-15", "林嘉"],
  ["E1007", "韩清", "增长销售", "销售经理", "P4", "深圳", "正式员工", "2025-01-06", "罗一"],
  ["E1008", "陈晗", "运营与客户成功", "总监", "P6", "北京", "正式员工", "2021-09-17", "Ashley"],
  ["E1009", "何青", "职能支持", "总监", "P6", "深圳", "正式员工", "2020-07-01", "Ashley"],
  ["E1010", "苏柏", "平台工程", "工程师", "P4", "上海", "外包", "2024-10-10", "顾骁"],
  ["E1011", "程澈", "大客户销售", "客户经理", "P4", "广州", "正式员工", "2025-03-21", "孟夏"],
  ["E1012", "陆西", "运营与客户成功", "客户成功", "P3", "成都", "实习生", "2025-04-02", "陈晗"]
].map(([id, name, department, role, level, city, contract, hireDate, manager]) => ({ id, name, department, role, level, city, contract, hireDate, manager }));

const fieldMap = [
  ["员工编号", "employee_id", "必填", "唯一员工标识"],
  ["姓名", "name", "必填", "员工姓名"],
  ["一级部门", "department_l1", "必填", "组织树第一层"],
  ["二级部门", "department_l2", "可选", "组织树第二层"],
  ["直属上级", "manager_id", "必填", "用于生成汇报关系"],
  ["岗位名称", "job_title", "必填", "岗位与序列分析"],
  ["职级", "level", "必填", "职级密度与断层"],
  ["入职日期", "hire_date", "必填", "司龄与新人占比"],
  ["城市", "city", "可选", "城市分布和集中度"],
  ["合同类型", "contract_type", "可选", "正式/外包/实习分析"]
];

const charts = {
  age: [["25岁以下", 15.2], ["25-34岁", 47.6], ["35-44岁", 24.8], ["45岁以上", 12.4]],
  tenure: [["0-1年", 28.4], ["1-3年", 32.5], ["3-5年", 19.7], ["5年以上", 19.4]],
  city: [["上海", 4864], ["北京", 4254], ["深圳", 3310], ["广州", 1582], ["杭州", 1197], ["成都", 886]],
  level: [["P1-P2", 12.1], ["P3", 24.6], ["P4-P5", 45.7], ["P6+", 17.6]]
};

const root = document.querySelector("#app");

function selectedDepartment() {
  return departments.find(dept => dept.id === state.selectedDepartmentId) || departments[0];
}

function fmt(value) {
  return Number(value).toLocaleString("zh-CN");
}

function setState(patch) {
  Object.assign(state, patch);
  render();
}

function departmentChildren(parentId) {
  return departments.filter(dept => dept.parent === parentId);
}

function filterPeople() {
  const selected = selectedDepartment();
  const allowedNames = new Set([selected.name, ...departmentChildren(selected.id).map(child => child.name)]);
  return people.filter(person => {
    const inDepartment = selected.id === "all" || allowedNames.has(person.department);
    const inContract = state.contract === "全部" || person.contract === state.contract;
    const inLevel = state.level === "全部" || person.level === state.level;
    const text = `${person.id}${person.name}${person.department}${person.role}${person.city}`.toLowerCase();
    return inDepartment && inContract && inLevel && text.includes(state.search.toLowerCase());
  });
}

function signalFor(dept) {
  const signals = [];
  if (dept.span > state.rule.maxSpan) signals.push(["高", "管理跨度偏大", `${dept.name} 平均跨度 ${dept.span}，超过阈值 ${state.rule.maxSpan}`]);
  if (dept.newHire > state.rule.highNewHireRatio) signals.push(["中", "新人占比偏高", `0-1年员工占比 ${dept.newHire}%，需要关注带教承接`]);
  if (dept.senior < state.rule.minSeniorRatio) signals.push(["高", "高阶人才不足", `P6+ 占比 ${dept.senior}%，低于阈值 ${state.rule.minSeniorRatio}%`]);
  if (dept.open > 25) signals.push(["中", "关键岗位空缺", `当前开放 HC ${dept.open} 个，应接入招聘计划`]);
  if (!signals.length) signals.push(["低", "结构健康", "当前部门未触发高风险组织规则"]);
  return signals;
}

function render() {
  const dept = selectedDepartment();
  root.innerHTML = `
    <div class="app-shell">
      ${sidebar()}
      <main class="workspace">
        ${topbar(dept)}
        ${tabs()}
        ${views(dept)}
      </main>
    </div>
    ${state.importOpen ? importDrawer() : ""}
    ${state.mappingOpen ? mappingDrawer() : ""}
    <div class="toast" id="toast" hidden></div>
  `;
  bindEvents();
}

function sidebar() {
  const items = [
    ["map", "组织地图"],
    ["people", "人员清单"],
    ["positions", "编制与空缺"],
    ["signals", "结构信号"],
    ["exports", "报表输出"],
    ["rules", "规则配置"]
  ];
  return `
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">A</span>
        <div><strong>Ashley</strong><small>Employee Map</small></div>
      </div>
      <nav>
        ${items.map(([id, label]) => `<button class="nav-button ${state.view === id ? "active" : ""}" data-view="${id}">${label}</button>`).join("")}
      </nav>
      <section class="source-card">
        <div><span class="status-dot"></span><strong>Roster_2025_05.xlsx</strong></div>
        <small>18,732 人 · 156 部门 · 10 字段已映射</small>
      </section>
    </aside>
  `;
}

function topbar(dept) {
  return `
    <header class="topbar">
      <div>
        <p class="crumb">组织地图 / ${dept.name}</p>
        <h1>${dept.name}</h1>
      </div>
      <div class="toolbar">
        <button class="secondary" data-action="open-import">导入数据</button>
        <button class="secondary" data-action="open-mapping">字段映射</button>
        <button class="primary" data-action="export">导出当前视图</button>
      </div>
    </header>
  `;
}

function tabs() {
  return `
    <section class="filters">
      <label>部门
        <select data-filter="department">
          ${departments.map(dept => `<option value="${dept.id}" ${dept.id === state.selectedDepartmentId ? "selected" : ""}>${dept.name}</option>`).join("")}
        </select>
      </label>
      <label>用工类型
        <select data-filter="contract">
          ${["全部", "正式员工", "外包", "实习生"].map(type => `<option ${type === state.contract ? "selected" : ""}>${type}</option>`).join("")}
        </select>
      </label>
      <label>职级
        <select data-filter="level">
          ${["全部", "P3", "P4", "P5", "P6", "P7"].map(level => `<option ${level === state.level ? "selected" : ""}>${level}</option>`).join("")}
        </select>
      </label>
      <label class="search-label">搜索员工 / 岗位 / 城市
        <input data-filter="search" value="${state.search}" placeholder="输入姓名、员工号、岗位..." />
      </label>
    </section>
  `;
}

function views(dept) {
  if (state.view === "people") return peopleView();
  if (state.view === "positions") return positionsView(dept);
  if (state.view === "signals") return signalsView(dept);
  if (state.view === "exports") return exportsView(dept);
  if (state.view === "rules") return rulesView();
  return mapView(dept);
}

function metricCards(dept) {
  const cards = [
    ["在职人数", fmt(dept.people), `${Math.round((dept.people / dept.budget) * 100)}% 编制使用率`],
    ["部门预算", fmt(dept.budget), `剩余 ${fmt(Math.max(0, dept.budget - dept.people))} HC`],
    ["管理跨度", dept.span, dept.span > state.rule.maxSpan ? "超过规则阈值" : "阈值内"],
    ["新人占比", `${dept.newHire}%`, dept.newHire > state.rule.highNewHireRatio ? "高于规则阈值" : "阈值内"],
    ["P6+ 占比", `${dept.senior}%`, dept.senior < state.rule.minSeniorRatio ? "低于规则阈值" : "阈值内"],
    ["开放岗位", dept.open, "招聘计划待跟进"]
  ];
  return `<section class="metric-grid">${cards.map(([label, value, note]) => `<article class="metric-card"><span>${label}</span><strong>${value}</strong><em>${note}</em></article>`).join("")}</section>`;
}

function mapView(dept) {
  return `
    ${metricCards(dept)}
    <section class="map-layout">
      <article class="panel org-panel">
        <div class="panel-head"><h2>组织结构</h2><small>点击节点切换部门视图</small></div>
        <div class="org-tree">${orgNode("all")}</div>
      </article>
      <article class="panel">
        <div class="panel-head"><h2>部门画像</h2><small>${dept.head} · ${dept.city}</small></div>
        <div class="profile-grid">
          ${donut("年龄结构", charts.age)}
          ${donut("司龄结构", charts.tenure)}
          ${barList("城市分布", charts.city)}
          ${barList("职级密度", charts.level)}
        </div>
      </article>
      <article class="panel right-panel">
        <div class="panel-head"><h2>结构信号</h2><small>${signalFor(dept).length} 条</small></div>
        ${signalList(dept)}
      </article>
    </section>
  `;
}

function orgNode(id) {
  const dept = departments.find(item => item.id === id);
  const children = departmentChildren(id);
  return `
    <div class="org-node-wrap">
      <button class="org-node ${state.selectedDepartmentId === id ? "selected" : ""}" data-dept="${id}">
        <strong>${dept.name}</strong>
        <span>${fmt(dept.people)} 人</span>
        <small>${dept.head} · 跨度 ${dept.span}</small>
      </button>
      ${children.length ? `<div class="org-children">${children.map(child => orgNode(child.id)).join("")}</div>` : ""}
    </div>
  `;
}

function donut(title, rows) {
  let cursor = 0;
  const palette = ["#55c9ff", "#7b68ff", "#ff5438", "#ff9f42", "#78df9f"];
  const stops = rows.map(([, value], index) => {
    const start = cursor;
    cursor += value;
    return `${palette[index]} ${start}% ${cursor}%`;
  }).join(", ");
  return `
    <div class="chart-card">
      <h3>${title}</h3>
      <div class="donut-wrap">
        <div class="donut" style="--donut: conic-gradient(${stops})"></div>
        <div class="legend">${rows.map(([label, value], index) => `<span><i style="--c:${palette[index]}"></i>${label}<b>${value}%</b></span>`).join("")}</div>
      </div>
    </div>
  `;
}

function barList(title, rows) {
  const max = Math.max(...rows.map(([, value]) => value));
  return `
    <div class="chart-card">
      <h3>${title}</h3>
      <div class="bar-list">
        ${rows.map(([label, value]) => `<div class="bar-row"><span>${label}</span><b><i style="width:${Math.max(8, value / max * 100)}%"></i></b><em>${value > 100 ? fmt(value) : `${value}%`}</em></div>`).join("")}
      </div>
    </div>
  `;
}

function signalList(dept) {
  return `<div class="signal-list">${signalFor(dept).map(([level, title, body]) => `<article class="signal ${level === "高" ? "danger" : level === "中" ? "warn" : ""}"><span>${level}</span><div><strong>${title}</strong><p>${body}</p></div></article>`).join("")}</div>`;
}

function peopleView() {
  const rows = filterPeople();
  return `
    <section class="panel table-panel">
      <div class="panel-head"><h2>人员清单</h2><small>${rows.length} 人匹配当前筛选</small></div>
      <table>
        <thead><tr><th>员工ID</th><th>姓名</th><th>部门</th><th>岗位</th><th>职级</th><th>城市</th><th>用工</th><th>入职日期</th><th>直属上级</th></tr></thead>
        <tbody>${rows.map(person => `<tr class="${person.id === state.selectedPersonId ? "selected" : ""}" data-person="${person.id}"><td>${person.id}</td><td>${person.name}</td><td>${person.department}</td><td>${person.role}</td><td>${person.level}</td><td>${person.city}</td><td>${person.contract}</td><td>${person.hireDate}</td><td>${person.manager}</td></tr>`).join("")}</tbody>
      </table>
    </section>
    ${personPanel()}
  `;
}

function personPanel() {
  const person = people.find(item => item.id === state.selectedPersonId) || people[0];
  return `
    <section class="panel person-panel">
      <div class="panel-head"><h2>员工画像</h2><small>${person.id}</small></div>
      <div class="person-card">
        <div class="avatar">${person.name.slice(0, 1)}</div>
        <div><h3>${person.name}</h3><p>${person.role} · ${person.level}</p></div>
      </div>
      <div class="detail-grid">
        <span>部门 <b>${person.department}</b></span>
        <span>城市 <b>${person.city}</b></span>
        <span>用工类型 <b>${person.contract}</b></span>
        <span>直属上级 <b>${person.manager}</b></span>
        <span>入职日期 <b>${person.hireDate}</b></span>
      </div>
    </section>
  `;
}

function positionsView(dept) {
  const openRoles = [
    ["增长销售", "客户经理", 18, "高"],
    ["平台工程", "前端工程师", 7, "中"],
    ["大客户销售", "解决方案顾问", 9, "高"],
    ["运营与客户成功", "客户成功经理", 6, "中"],
    ["职能支持", "HRBP", 4, "低"]
  ];
  return `
    ${metricCards(dept)}
    <section class="panel table-panel">
      <div class="panel-head"><h2>编制与空缺</h2><small>按岗位跟踪预算、在岗与开放 HC</small></div>
      <table>
        <thead><tr><th>部门</th><th>岗位</th><th>开放HC</th><th>风险</th><th>建议动作</th></tr></thead>
        <tbody>${openRoles.map(([team, role, open, risk]) => `<tr><td>${team}</td><td>${role}</td><td>${open}</td><td><span class="risk ${risk}">${risk}</span></td><td>${risk === "高" ? "同步招聘优先级与用人经理复盘" : "保持周度跟进"}</td></tr>`).join("")}</tbody>
      </table>
    </section>
  `;
}

function signalsView(dept) {
  return `
    <section class="signals-layout">
      <article class="panel">
        <div class="panel-head"><h2>规则触发</h2><small>${dept.name}</small></div>
        ${signalList(dept)}
      </article>
      <article class="panel">
        <div class="panel-head"><h2>建议动作</h2><small>基于当前规则</small></div>
        <div class="action-list">
          <button>创建部门复盘任务</button>
          <button>发送给 HRBP</button>
          <button>加入招聘计划</button>
          <button>标记为下月复查</button>
        </div>
      </article>
    </section>
  `;
}

function exportsView(dept) {
  const summary = signalFor(dept).map(([, title, body]) => `${title}：${body}`);
  return `
    <section class="export-layout">
      <article class="panel report-preview">
        <div class="panel-head"><h2>管理层摘要</h2><small>${dept.name} · 2025-05</small></div>
        <p>${dept.name} 当前在职 ${fmt(dept.people)} 人，编制使用率 ${Math.round((dept.people / dept.budget) * 100)}%。管理跨度为 ${dept.span}，新人占比 ${dept.newHire}%，P6+ 占比 ${dept.senior}%。</p>
        <ul>${summary.map(item => `<li>${item}</li>`).join("")}</ul>
      </article>
      <article class="panel">
        <div class="panel-head"><h2>导出队列</h2><small>前端模拟生成</small></div>
        <div class="export-buttons">
          <button data-action="export">导出 PDF 摘要</button>
          <button data-action="export">导出部门 PNG</button>
          <button data-action="export">导出结构信号 CSV</button>
          <button data-action="export">复制汇报文本</button>
        </div>
      </article>
    </section>
  `;
}

function rulesView() {
  return `
    <section class="rules-grid">
      ${[
        ["maxSpan", "管理跨度上限", state.rule.maxSpan, 4, 20, "人"],
        ["minSeniorRatio", "P6+ 占比下限", state.rule.minSeniorRatio, 1, 30, "%"],
        ["highNewHireRatio", "新人占比上限", state.rule.highNewHireRatio, 5, 60, "%"]
      ].map(([key, label, value, min, max, unit]) => `
        <article class="panel rule-card">
          <label>${label}<input type="range" min="${min}" max="${max}" value="${value}" data-rule="${key}" /></label>
          <strong>${value}${unit}</strong>
          <small>调整后会立即影响结构信号判断。</small>
        </article>
      `).join("")}
    </section>
  `;
}

function importDrawer() {
  return `
    <div class="drawer-backdrop" data-action="close-drawers">
      <aside class="drawer" data-stop>
        <h2>导入员工数据</h2>
        <p>前端原型使用内置样例数据。真实产品中，这里会解析 Excel / CSV 并在浏览器内完成字段识别。</p>
        <div class="dropzone">
          <strong>Roster_2025_05.xlsx</strong>
          <span>18,732 rows · 10 recognized fields · 4 validation checks</span>
        </div>
        <button class="primary" data-action="finish-import">应用样例数据</button>
      </aside>
    </div>
  `;
}

function mappingDrawer() {
  return `
    <div class="drawer-backdrop" data-action="close-drawers">
      <aside class="drawer wide" data-stop>
        <h2>字段映射</h2>
        <p>把公司花名册字段映射为组织地图标准字段，后续导入可复用。</p>
        <table>
          <thead><tr><th>原始字段</th><th>标准字段</th><th>要求</th><th>用途</th></tr></thead>
          <tbody>${fieldMap.map(([raw, standard, required, usage]) => `<tr><td>${raw}</td><td><select><option>${standard}</option></select></td><td>${required}</td><td>${usage}</td></tr>`).join("")}</tbody>
        </table>
        <button class="primary" data-action="save-mapping">保存映射模板</button>
      </aside>
    </div>
  `;
}

function toast(message) {
  const el = document.querySelector("#toast");
  el.textContent = message;
  el.hidden = false;
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => {
    el.hidden = true;
  }, 2200);
}

function bindEvents() {
  root.querySelectorAll("[data-view]").forEach(button => {
    button.addEventListener("click", () => setState({ view: button.dataset.view }));
  });
  root.querySelectorAll("[data-dept]").forEach(button => {
    button.addEventListener("click", () => setState({ selectedDepartmentId: button.dataset.dept }));
  });
  root.querySelectorAll("[data-person]").forEach(row => {
    row.addEventListener("click", () => setState({ selectedPersonId: row.dataset.person }));
  });
  root.querySelectorAll("[data-filter]").forEach(control => {
    control.addEventListener("input", event => {
      const key = event.target.dataset.filter;
      const patch = key === "department"
        ? { selectedDepartmentId: event.target.value }
        : key === "search"
          ? { search: event.target.value }
          : { [key]: event.target.value };
      setState(patch);
    });
  });
  root.querySelectorAll("[data-rule]").forEach(input => {
    input.addEventListener("input", event => {
      state.rule[event.target.dataset.rule] = Number(event.target.value);
      render();
    });
  });
  root.querySelectorAll("[data-action]").forEach(button => {
    button.addEventListener("click", event => {
      const action = button.dataset.action;
      if (action === "open-import") setState({ importOpen: true });
      if (action === "open-mapping") setState({ mappingOpen: true });
      if (action === "close-drawers") setState({ importOpen: false, mappingOpen: false });
      if (action === "finish-import") {
        setState({ importOpen: false });
        setTimeout(() => toast("样例数据已应用，组织地图已刷新。"));
      }
      if (action === "save-mapping") {
        setState({ mappingOpen: false });
        setTimeout(() => toast("字段映射模板已保存。"));
      }
      if (action === "export") toast("已生成前端导出任务。");
      event.stopPropagation();
    });
  });
  root.querySelectorAll("[data-stop]").forEach(el => el.addEventListener("click", event => event.stopPropagation()));
}

render();
