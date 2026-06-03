const state = {
  view: "map",
  selectedDepartmentId: "all",
  search: "",
  contract: "全部",
  level: "全部",
  sourceName: "Ashley_AIHR_640_roster.csv",
  validation: [],
  mappingOpen: false,
  importOpen: false,
  selectedPersonId: "E1007",
  rule: {
    maxSpan: 12,
    minSeniorRatio: 8,
    highNewHireRatio: 35
  }
};

const storeKey = "employee-map-h5-state-v3";

const seededCompany = {
  departments: [
    { name: "产品与研发", head: "周然", roles: ["产品经理", "前端工程师", "后端工程师", "算法工程师", "测试工程师", "架构师"], weight: 112 },
    { name: "平台工程", head: "顾骁", roles: ["平台工程师", "SRE", "数据工程师", "安全工程师", "技术经理"], weight: 78 },
    { name: "设计中心", head: "许诺", roles: ["体验设计师", "视觉设计师", "用户研究员", "设计经理"], weight: 46 },
    { name: "销售与市场", head: "林嘉", roles: ["销售经理", "市场运营", "渠道经理", "销售总监", "商务拓展"], weight: 118 },
    { name: "增长销售", head: "罗一", roles: ["客户经理", "增长顾问", "销售运营", "区域经理"], weight: 86 },
    { name: "大客户销售", head: "孟夏", roles: ["大客户经理", "解决方案顾问", "售前顾问", "客户总监"], weight: 74 },
    { name: "运营与客户成功", head: "陈晗", roles: ["客户成功经理", "运营专员", "交付经理", "服务顾问"], weight: 82 },
    { name: "职能支持", head: "何青", roles: ["HRBP", "招聘经理", "财务分析师", "法务专员", "行政经理"], weight: 44 }
  ],
  cities: ["上海", "北京", "深圳", "广州", "杭州", "成都", "南京", "武汉", "西安", "苏州"],
  surnames: "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳鲍史唐费薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹",
  given: ["然", "骁", "诺", "嘉", "一", "夏", "清", "晗", "青", "柏", "澈", "西", "宁", "雨", "可", "沐", "禾", "川", "岚", "舟", "言", "远", "知", "予", "乔", "星", "北", "南", "森", "白", "辰", "越"]
};

function generateDefaultPeople(total = 640) {
  const peopleRows = [];
  seededCompany.departments.forEach((department, deptIndex) => {
    const leaderId = `E${String(1001 + peopleRows.length).padStart(4, "0")}`;
    peopleRows.push({
      id: leaderId,
      name: department.head,
      department: department.name,
      role: deptIndex < 4 ? "VP" : "总监",
      level: deptIndex < 4 ? "P7" : "P6",
      city: seededCompany.cities[deptIndex % seededCompany.cities.length],
      contract: "正式员工",
      hireDate: `2019-${String((deptIndex % 9) + 1).padStart(2, "0")}-12`,
      manager: "Ashley"
    });
  });

  let deptCursor = 0;
  while (peopleRows.length < total) {
    const dept = seededCompany.departments[deptCursor % seededCompany.departments.length];
    const localIndex = peopleRows.filter(person => person.department === dept.name).length;
    if (localIndex < dept.weight) {
      const absoluteIndex = peopleRows.length;
      const id = `E${String(1001 + absoluteIndex).padStart(4, "0")}`;
      const surname = seededCompany.surnames[absoluteIndex % seededCompany.surnames.length];
      const name = `${surname}${seededCompany.given[(absoluteIndex * 7) % seededCompany.given.length]}`;
      const level = levelFor(localIndex, dept.name);
      const contract = contractFor(absoluteIndex, dept.name);
      const hireDate = hireDateFor(absoluteIndex, level);
      peopleRows.push({
        id,
        name,
        department: dept.name,
        role: dept.roles[absoluteIndex % dept.roles.length],
        level,
        city: seededCompany.cities[(absoluteIndex + deptCursor) % seededCompany.cities.length],
        contract,
        hireDate,
        manager: managerFor(peopleRows, dept.name, level, dept.head)
      });
    }
    deptCursor += 1;
  }
  return peopleRows;
}

function levelFor(index, department) {
  if (index % 97 === 0) return "P7";
  if (index % 31 === 0 || ["产品与研发", "平台工程"].includes(department) && index % 17 === 0) return "P6";
  if (index % 7 === 0) return "P5";
  if (index % 3 === 0) return "P4";
  if (index % 5 === 0) return "P2";
  return "P3";
}

function contractFor(index, department) {
  if (department === "职能支持" && index % 11 === 0) return "外包";
  if (index % 29 === 0) return "实习生";
  if (index % 13 === 0) return "外包";
  return "正式员工";
}

function hireDateFor(index, level) {
  const year = level === "P7" ? 2018 : level === "P6" ? 2020 + (index % 3) : 2021 + (index % 5);
  const month = String((index % 12) + 1).padStart(2, "0");
  const day = String((index % 27) + 1).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function managerFor(rows, department, level, fallback) {
  if (["P7", "P6"].includes(level)) return fallback;
  const candidates = rows.filter(person => person.department === department && ["P7", "P6", "P5"].includes(person.level));
  return candidates[candidates.length ? rows.length % candidates.length : 0]?.name || fallback;
}

const defaultPeople = generateDefaultPeople();

let people = structuredClone(defaultPeople);
let departments = buildDepartments(people);

let fieldMap = [
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

loadFromStorage();

function saveToStorage() {
  localStorage.setItem(storeKey, JSON.stringify({
    people,
    departments,
    fieldMap,
    sourceName: state.sourceName,
    rule: state.rule,
    selectedDepartmentId: state.selectedDepartmentId,
    selectedPersonId: state.selectedPersonId,
    validation: state.validation
  }));
}

function loadFromStorage() {
  const raw = localStorage.getItem(storeKey);
  if (!raw) {
    departments = buildDepartments(people);
    state.validation = validatePeople(people);
    return;
  }
  try {
    const saved = JSON.parse(raw);
    people = Array.isArray(saved.people) && saved.people.length ? saved.people : people;
    departments = Array.isArray(saved.departments) && saved.departments.length ? saved.departments : buildDepartments(people);
    fieldMap = Array.isArray(saved.fieldMap) && saved.fieldMap.length ? saved.fieldMap : fieldMap;
    state.sourceName = saved.sourceName || state.sourceName;
    state.rule = { ...state.rule, ...(saved.rule || {}) };
    state.selectedDepartmentId = saved.selectedDepartmentId || state.selectedDepartmentId;
    state.selectedPersonId = saved.selectedPersonId || people[0]?.id || "";
    state.validation = saved.validation || validatePeople(people);
  } catch {
    state.validation = validatePeople(people);
  }
}

function resetSampleData() {
  people = structuredClone(defaultPeople);
  departments = buildDepartments(people);
  state.sourceName = "Ashley_AIHR_640_roster.csv";
  state.selectedDepartmentId = "all";
  state.selectedPersonId = people[0]?.id || "";
  state.validation = validatePeople(people);
  saveToStorage();
  setState({ importOpen: false, mappingOpen: false, view: "map" });
  setTimeout(() => toast("已恢复内置样例数据。"));
}

function validatePeople(rows) {
  const ids = new Set();
  const duplicateIds = new Set();
  let missingRequired = 0;
  let invalidDates = 0;
  rows.forEach(row => {
    if (!row.id || !row.name || !row.department) missingRequired += 1;
    if (row.id && ids.has(row.id)) duplicateIds.add(row.id);
    if (row.id) ids.add(row.id);
    if (row.hireDate && Number.isNaN(Date.parse(row.hireDate))) invalidDates += 1;
  });
  return [
    { label: "员工记录", value: `${rows.length} 行`, tone: "ok" },
    { label: "必填字段缺失", value: `${missingRequired} 行`, tone: missingRequired ? "bad" : "ok" },
    { label: "重复员工ID", value: `${duplicateIds.size} 个`, tone: duplicateIds.size ? "warn" : "ok" },
    { label: "日期格式异常", value: `${invalidDates} 行`, tone: invalidDates ? "warn" : "ok" }
  ];
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell.trim());
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function mapCSVRows(rows) {
  if (rows.length < 2) return [];
  const headers = rows[0].map(header => header.trim());
  const aliases = {
    id: ["employee_id", "员工ID", "员工编号", "id", "ID"],
    name: ["name", "姓名", "员工姓名"],
    department: ["department", "department_l2", "部门", "二级部门", "团队"],
    role: ["job_title", "岗位名称", "岗位", "职位"],
    level: ["level", "职级", "级别"],
    city: ["city", "城市", "工作城市"],
    contract: ["contract_type", "合同类型", "用工类型", "用工形式"],
    hireDate: ["hire_date", "入职日期", "入职时间"],
    manager: ["manager", "manager_id", "直属上级", "上级"]
  };
  const indexFor = key => headers.findIndex(header => aliases[key].some(alias => alias.toLowerCase() === header.toLowerCase()));
  const index = Object.fromEntries(Object.keys(aliases).map(key => [key, indexFor(key)]));
  return rows.slice(1).map((row, rowIndex) => ({
    id: row[index.id] || `EMP${String(rowIndex + 1).padStart(4, "0")}`,
    name: row[index.name] || `员工${rowIndex + 1}`,
    department: row[index.department] || "未分配部门",
    role: row[index.role] || "未填写岗位",
    level: row[index.level] || "P3",
    city: row[index.city] || "未填写城市",
    contract: row[index.contract] || "正式员工",
    hireDate: row[index.hireDate] || "2025-01-01",
    manager: row[index.manager] || "未填写"
  }));
}

function buildDepartments(rows) {
  const grouped = rows.reduce((map, person) => {
    if (!map.has(person.department)) map.set(person.department, []);
    map.get(person.department).push(person);
    return map;
  }, new Map());
  const total = rows.length || 1;
  const rootDept = {
    id: "all",
    name: "全公司",
    parent: null,
    head: rows.find(person => person.level === "P7")?.name || rows[0]?.manager || "未设置",
    people: rows.length,
    open: Math.max(0, Math.round(rows.length * 0.03)),
    span: averageSpan(rows),
    newHire: newHireRatio(rows),
    senior: seniorRatio(rows),
    city: "全集团",
    budget: Math.ceil(rows.length * 1.05)
  };
  const childDepts = [...grouped.entries()].map(([name, members], index) => ({
    id: slugify(name) || `dept-${index + 1}`,
    name,
    parent: "all",
    head: findDepartmentHead(members),
    people: members.length,
    open: Math.max(0, Math.round(members.length * 0.04)),
    span: averageSpan(members),
    newHire: newHireRatio(members),
    senior: seniorRatio(members),
    city: mode(members.map(person => person.city)) || "未填写",
    budget: Math.ceil(members.length * 1.06)
  }));
  rootDept.open = childDepts.reduce((sum, dept) => sum + dept.open, 0);
  rootDept.budget = Math.ceil(total * 1.05);
  return [rootDept, ...childDepts];
}

function averageSpan(rows) {
  const managerCounts = rows.reduce((map, person) => {
    if (!person.manager || person.manager === "未填写") return map;
    map.set(person.manager, (map.get(person.manager) || 0) + 1);
    return map;
  }, new Map());
  if (!managerCounts.size) return 0;
  const avg = [...managerCounts.values()].reduce((sum, count) => sum + count, 0) / managerCounts.size;
  return Number(avg.toFixed(1));
}

function newHireRatio(rows) {
  const cutoff = new Date("2024-06-01").getTime();
  const count = rows.filter(person => Date.parse(person.hireDate) >= cutoff).length;
  return Number(((count / Math.max(rows.length, 1)) * 100).toFixed(1));
}

function seniorRatio(rows) {
  const count = rows.filter(person => ["P6", "P7", "P8"].includes(person.level)).length;
  return Number(((count / Math.max(rows.length, 1)) * 100).toFixed(1));
}

function findDepartmentHead(rows) {
  return rows.find(person => ["P7", "P6"].includes(person.level))?.name || rows[0]?.manager || rows[0]?.name || "未设置";
}

function mode(values) {
  const counts = values.reduce((map, value) => map.set(value, (map.get(value) || 0) + 1), new Map());
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
}

function slugify(text) {
  let hash = 0;
  [...text].forEach(char => {
    hash = ((hash << 5) - hash) + char.charCodeAt(0);
    hash |= 0;
  });
  return `dept-${Math.abs(hash)}`;
}

function rowsToCSV(rows) {
  const headers = ["id", "name", "department", "role", "level", "city", "contract", "hireDate", "manager"];
  const escape = value => `"${String(value ?? "").replaceAll('"', '""')}"`;
  return [headers.join(","), ...rows.map(row => headers.map(key => escape(row[key])).join(","))].join("\n");
}

function reportPayload() {
  const dept = selectedDepartment();
  return {
    generatedAt: new Date().toISOString(),
    source: state.sourceName,
    department: dept,
    rules: state.rule,
    metrics: {
      people: dept.people,
      budget: dept.budget,
      budgetUsage: Math.round((dept.people / Math.max(dept.budget, 1)) * 100),
      span: dept.span,
      newHire: dept.newHire,
      senior: dept.senior,
      openRoles: dept.open
    },
    signals: signalFor(dept).map(([level, title, description]) => ({ level, title, description })),
    employees: filterPeople()
  };
}

function reportText() {
  const payload = reportPayload();
  const metric = payload.metrics;
  return [
    `${payload.department.name} 组织复盘`,
    `数据源：${payload.source}`,
    `在职人数 ${fmt(metric.people)} 人，编制使用率 ${metric.budgetUsage}%，开放岗位 ${metric.openRoles} 个。`,
    `管理跨度 ${metric.span}，新人占比 ${metric.newHire}%，P6+ 占比 ${metric.senior}%。`,
    "结构信号：",
    ...payload.signals.map(item => `- [${item.level}] ${item.title}：${item.description}`)
  ].join("\n");
}

function signalsCSV() {
  const escape = value => `"${String(value).replaceAll('"', '""')}"`;
  return ["level,title,description", ...signalFor(selectedDepartment()).map(row => row.map(escape).join(","))].join("\n");
}

function downloadFile(filename, content, type = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function selectedDepartment() {
  return departments.find(dept => dept.id === state.selectedDepartmentId) || departments[0];
}

function fmt(value) {
  return Number(value).toLocaleString("zh-CN");
}

function setState(patch) {
  Object.assign(state, patch);
  saveToStorage();
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

function peopleInDepartment(dept = selectedDepartment()) {
  const allowedNames = new Set([dept.name, ...departmentChildren(dept.id).map(child => child.name)]);
  return people.filter(person => dept.id === "all" || allowedNames.has(person.department));
}

function distributionRows(rows, key) {
  const counts = rows.reduce((map, row) => map.set(row[key] || "未填写", (map.get(row[key] || "未填写") || 0) + 1), new Map());
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
}

function percentDistributionRows(rows, key) {
  const total = Math.max(rows.length, 1);
  return distributionRows(rows, key).map(([label, count]) => [label, Number(((count / total) * 100).toFixed(1))]);
}

function tenureDistributionRows(rows) {
  const buckets = { "0-1年": 0, "1-3年": 0, "3-5年": 0, "5年以上": 0 };
  const now = new Date("2026-06-03").getTime();
  rows.forEach(person => {
    const years = (now - Date.parse(person.hireDate || "2025-01-01")) / (365 * 24 * 60 * 60 * 1000);
    if (years < 1) buckets["0-1年"] += 1;
    else if (years < 3) buckets["1-3年"] += 1;
    else if (years < 5) buckets["3-5年"] += 1;
    else buckets["5年以上"] += 1;
  });
  const total = Math.max(rows.length, 1);
  return Object.entries(buckets).map(([label, count]) => [label, Number(((count / total) * 100).toFixed(1))]);
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
        <div><span class="status-dot"></span><strong>${state.sourceName}</strong></div>
        <small>${fmt(people.length)} 人 · ${departments.length - 1} 部门 · ${fieldMap.length} 字段已映射</small>
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
        <div class="project-intro">
          <p><strong>Learning project / 学习型项目</strong></p>
          <p>This is a browser-only Employee Map prototype built with Codex. Try the built-in 640-person sample or import <code>outputs/test-employee-map-import.csv</code>.</p>
          <p>这是一个用 Codex 做出来的纯前端 Employee Map 学习项目。你可以先体验内置 640 人样例，或者导入 <code>outputs/test-employee-map-import.csv</code> 进行测试。</p>
        </div>
      </div>
      <div class="toolbar">
        <button class="secondary" data-action="open-import">导入数据</button>
        <button class="secondary" data-action="open-mapping">字段映射</button>
        <button class="secondary" data-action="reset-sample">恢复样例</button>
        <button class="primary" data-action="export-csv">导出当前人员</button>
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
  const scopedPeople = peopleInDepartment(dept);
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
          ${donut("司龄结构", tenureDistributionRows(scopedPeople))}
          ${donut("用工类型", percentDistributionRows(scopedPeople, "contract"))}
          ${barList("城市分布", distributionRows(scopedPeople, "city"))}
          ${barList("职级密度", percentDistributionRows(scopedPeople, "level"))}
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

function primaryHiringRole(departmentName) {
  const roleByDepartment = {
    产品与研发: "后端工程师",
    平台工程: "SRE",
    设计中心: "体验设计师",
    销售与市场: "销售经理",
    增长销售: "客户经理",
    大客户销售: "解决方案顾问",
    运营与客户成功: "客户成功经理",
    职能支持: "HRBP"
  };
  return roleByDepartment[departmentName] || "业务关键岗位";
}

function positionsView(dept) {
  const openRoles = (dept.id === "all" ? departments.filter(item => item.id !== "all") : [dept, ...departmentChildren(dept.id)])
    .filter((item, index, rows) => item.id !== "all" && rows.findIndex(row => row.id === item.id) === index)
    .map(item => {
      const risk = item.open > 16 || item.span > state.rule.maxSpan ? "高" : item.open > 8 ? "中" : "低";
      const action = risk === "高"
        ? "同步招聘优先级与用人经理复盘"
        : risk === "中"
          ? "保持周度跟进，确认到岗节奏"
          : "维持编制观察";
      return [item.name, primaryHiringRole(item.name), item.open, risk, action];
    })
    .sort((a, b) => b[2] - a[2]);
  return `
    ${metricCards(dept)}
    <section class="panel table-panel">
      <div class="panel-head"><h2>编制与空缺</h2><small>按岗位跟踪预算、在岗与开放 HC</small></div>
      <table>
        <thead><tr><th>部门</th><th>岗位</th><th>开放HC</th><th>风险</th><th>建议动作</th></tr></thead>
        <tbody>${openRoles.map(([team, role, open, risk, action]) => `<tr><td>${team}</td><td>${role}</td><td>${open}</td><td><span class="risk ${risk}">${risk}</span></td><td>${action}</td></tr>`).join("")}</tbody>
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
        <div class="panel-head"><h2>导出</h2><small>全部在浏览器内生成文件</small></div>
        <div class="export-buttons">
          <button data-action="export-report">下载管理摘要 JSON</button>
          <button data-action="export-csv">下载当前人员 CSV</button>
          <button data-action="export-signals">下载结构信号 CSV</button>
          <button data-action="copy-report">复制汇报文本</button>
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
        <p>选择 CSV 文件后，浏览器会直接解析字段、生成员工清单、重建部门结构并保存到 localStorage。没有后端。</p>
        <div class="dropzone">
          <strong>${state.sourceName}</strong>
          <span>${fmt(people.length)} rows · ${departments.length - 1} departments · ${state.validation.filter(item => item.tone !== "ok").length} issues</span>
          <input type="file" accept=".csv,text/csv" data-action="import-file" />
        </div>
        <div class="validation-list">
          ${state.validation.map(item => `<span class="${item.tone}"><b>${item.label}</b>${item.value}</span>`).join("")}
        </div>
        <button class="secondary" data-action="download-template">下载 CSV 模板</button>
        <button class="primary" data-action="reset-sample">恢复内置样例</button>
      </aside>
    </div>
  `;
}

function mappingDrawer() {
  const standardFields = ["employee_id", "name", "department_l1", "department_l2", "manager_id", "job_title", "level", "hire_date", "city", "contract_type", "ignore"];
  return `
    <div class="drawer-backdrop" data-action="close-drawers">
      <aside class="drawer wide" data-stop>
        <h2>字段映射</h2>
        <p>把公司花名册字段映射为组织地图标准字段，后续导入可复用。</p>
        <table>
          <thead><tr><th>原始字段</th><th>标准字段</th><th>要求</th><th>用途</th></tr></thead>
          <tbody>${fieldMap.map(([raw, standard, required, usage], index) => `<tr><td>${raw}</td><td><select data-map-index="${index}">${standardFields.map(field => `<option ${field === standard ? "selected" : ""}>${field}</option>`).join("")}</select></td><td>${required}</td><td>${usage}</td></tr>`).join("")}</tbody>
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
      saveToStorage();
      render();
    });
  });
  root.querySelectorAll("[data-map-index]").forEach(select => {
    select.addEventListener("change", event => {
      const index = Number(event.target.dataset.mapIndex);
      fieldMap[index][1] = event.target.value;
      saveToStorage();
      toast("字段映射已更新。");
    });
  });
  root.querySelectorAll('input[data-action="import-file"]').forEach(input => {
    input.addEventListener("change", async event => {
      const file = event.target.files?.[0];
      if (!file) return;
      const text = await file.text();
      const parsedRows = parseCSV(text);
      const mappedPeople = mapCSVRows(parsedRows);
      if (!mappedPeople.length) {
        toast("CSV 没有可导入的数据行。");
        return;
      }
      people = mappedPeople;
      departments = buildDepartments(people);
      state.sourceName = file.name;
      state.selectedDepartmentId = "all";
      state.selectedPersonId = people[0]?.id || "";
      state.validation = validatePeople(people);
      state.importOpen = false;
      state.view = "map";
      saveToStorage();
      render();
      setTimeout(() => toast(`已导入 ${fmt(people.length)} 条员工记录。`));
    });
  });
  root.querySelectorAll("[data-action]").forEach(button => {
    button.addEventListener("click", event => {
      const action = button.dataset.action;
      if (action === "open-import") setState({ importOpen: true });
      if (action === "open-mapping") setState({ mappingOpen: true });
      if (action === "close-drawers") setState({ importOpen: false, mappingOpen: false });
      if (action === "reset-sample") resetSampleData();
      if (action === "save-mapping") {
        saveToStorage();
        setState({ mappingOpen: false });
        setTimeout(() => toast("字段映射模板已保存。"));
      }
      if (action === "download-template") downloadFile("employee-map-template.csv", rowsToCSV(defaultPeople), "text/csv;charset=utf-8");
      if (action === "export-csv") downloadFile(`${selectedDepartment().name}-employees.csv`, rowsToCSV(filterPeople()), "text/csv;charset=utf-8");
      if (action === "export-report") downloadFile(`${selectedDepartment().name}-report.json`, JSON.stringify(reportPayload(), null, 2), "application/json;charset=utf-8");
      if (action === "export-signals") downloadFile(`${selectedDepartment().name}-signals.csv`, signalsCSV(), "text/csv;charset=utf-8");
      if (action === "copy-report") {
        navigator.clipboard?.writeText(reportText())
          .then(() => toast("汇报文本已复制。"))
          .catch(() => {
            downloadFile(`${selectedDepartment().name}-report.txt`, reportText(), "text/plain;charset=utf-8");
            toast("浏览器未开放剪贴板权限，已改为下载文本。");
          });
      }
      event.stopPropagation();
    });
  });
  root.querySelectorAll("[data-stop]").forEach(el => el.addEventListener("click", event => event.stopPropagation()));
}

render();
