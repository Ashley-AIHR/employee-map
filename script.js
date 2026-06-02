const colors = ["#55c9ff", "#7b68ff", "#ff5438", "#ff9f42", "#78df9f", "#ffd166"];

const appData = {
  overviewMetrics: [
    ["在职人数", "18,732", "较上月 +312（+1.69%）"],
    ["部门数量", "156", "较上月 +3（+1.96%）"],
    ["平均年龄", "29.6 岁", "较上月 +0.3"],
    ["中位司龄", "2.8 年", "较上月 +0.2"],
    ["新人占比", "28.4%", "较上月 +2.6pp", "bad"],
    ["正式员工占比", "86.6%", "较上月 +0.8pp"],
    ["平均管理跨度", "7.2 人", "较上月 +0.3"],
    ["非正式用工占比", "8.7%", "较上月 -0.3pp"]
  ],
  commandMetrics: [
    ["员工总数", "2,431", "较上月 +2.4%"],
    ["部门数", "28", "较上月 +1"],
    ["管理跨度", "6.2", "较上月 -0.3"],
    ["中层占比", "18.7%", "较上月 -1.2pp", "bad"],
    ["关键岗位空缺", "23", "较上月 +3", "bad"]
  ],
  age: [
    ["18-24岁", 6.2],
    ["25-29岁", 31.4],
    ["30-34岁", 30.7],
    ["35-39岁", 18.3],
    ["40-44岁", 9.1],
    ["45岁以上", 4.3]
  ],
  tenure: [
    ["0-1年", 28.4],
    ["1-3年", 32.5],
    ["3-5年", 19.7],
    ["5-10年", 13.2],
    ["10年以上", 6.2]
  ],
  cities: [
    ["上海", 4864],
    ["北京", 4254],
    ["深圳", 3310],
    ["广州", 1582],
    ["杭州", 1197],
    ["成都", 886],
    ["南京", 725],
    ["武汉", 612],
    ["苏州", 471],
    ["西安", 370]
  ],
  departments: [
    { name: "产品与研发", people: 4258, share: 22.7, span: 3, h: "190px", colors: ["#7067ff", "#425ed2"] },
    { name: "销售与市场", people: 3862, share: 20.6, span: 3, h: "190px", colors: ["#5e6bff", "#315bbd"] },
    { name: "运营与客户成功", people: 2214, share: 11.8, span: 2, h: "170px", colors: ["#4f72ff", "#244eb2"] },
    { name: "职能支持", people: 1986, share: 10.6, span: 2, h: "170px", colors: ["#4087ff", "#2458a8"] },
    { name: "设计中心", people: 1123, share: 6.0, span: 1, h: "140px", colors: ["#39adff", "#216ea4"] },
    { name: "供应链", people: 923, share: 4.9, span: 1, h: "140px", colors: ["#6f5cff", "#43379c"] }
  ],
  employment: [
    ["正式员工", 86.6],
    ["外包", 8.7],
    ["实习生", 3.1],
    ["劳务派遣", 1.6]
  ],
  contract: [
    ["无固定期限", 59.2],
    ["固定期限", 35.8],
    ["以完成一定任务为期限", 4.0],
    ["其他", 1.0]
  ],
  fields: [
    ["ID", "员工编号", "ID", "员工ID"],
    ["人", "姓名", "人", "姓名"],
    ["组", "部门", "夹", "一级部门"],
    ["夹", "一级部门", "夹", "二级部门"],
    ["夹", "二级部门", "包", "岗位名称"],
    ["包", "岗位名称", "组", "岗位序列"],
    ["级", "职级", "级", "职级"],
    ["日", "入职时间", "日", "入职日期"],
    ["生", "出生日期", "生", "年龄 / 出生日期"],
    ["城", "工作城市", "城", "城市"],
    ["性", "性别", "性", "性别"],
    ["上", "直属上级", "上", "直属上级ID"],
    ["约", "合同类型", "约", "合同类型"],
    ["工", "用工形式", "工", "用工形式"],
    ["在", "在职状态", "在", "在职状态"]
  ],
  quality: [
    ["缺失值检查", "通过", "ok"],
    ["日期格式校验", "通过", "ok"],
    ["重复员工 ID", "警告", "warn"],
    ["花名册字段识别", "通过", "ok"]
  ],
  departmentsDeep: {
    "销售中心": {
      metrics: [
        ["人数", "1,248", "高于公司平均 ↑", "bad"],
        ["平均年龄", "29.6 岁", "低于公司平均 ↓"],
        ["中位司龄", "1.8 年", "低于公司平均 ↓"],
        ["新人占比", "43.0%", "高于公司平均 ↑", "bad"],
        ["管理跨度", "1:12.4", "高于公司平均 ↑", "bad"],
        ["P4+ 占比", "32.6%", "低于公司平均 ↓"]
      ],
      age: [["≤25岁", 18.2], ["26-30岁", 40.1], ["31-35岁", 25.3], ["36-40岁", 10.8], ["41岁+", 5.6]],
      tenure: [["0-1年", 43.0], ["1-3年", 29.1], ["3-5年", 14.6], ["5-10年", 9.3], ["10年以上", 4.0]],
      cities: [["上海", 36.7], ["北京", 18.9], ["深圳", 16.3], ["广州", 8.6], ["杭州", 5.9], ["成都", 4.2], ["其他", 9.4]],
      risks: [
        ["新人占比（0-1年占比）", "43.0%", "偏高，高于公司平均 4.2pct"],
        ["管理跨度", "1:12.4", "偏大，高于公司平均 1.9"],
        ["P4+ 占比（高阶人才占比）", "32.6%", "偏低，低于公司平均 2.7pct"],
        ["一线城市集中度", "68.3%", "偏高，高于公司平均 3.5pct"]
      ],
      signals: [
        "新人占比高，团队扩张快",
        "管理跨度偏大，中层承接压力明显",
        "P4-P5 密度尚可，但高阶支撑不足",
        "一线城市集中度高，区域弹性较弱",
        "继续下钻查看岗位序列与城市切片"
      ]
    },
    "产品研发": {
      metrics: [
        ["人数", "4,258", "组织重心明显", "bad"],
        ["平均年龄", "30.8 岁", "略高于公司平均"],
        ["中位司龄", "3.1 年", "成熟度较高"],
        ["新人占比", "21.4%", "扩张相对平稳"],
        ["管理跨度", "1:7.8", "可控"],
        ["P4+ 占比", "39.2%", "骨干密度较好"]
      ],
      age: [["≤25岁", 12.2], ["26-30岁", 34.8], ["31-35岁", 31.5], ["36-40岁", 14.1], ["41岁+", 7.4]],
      tenure: [["0-1年", 21.4], ["1-3年", 35.0], ["3-5年", 22.6], ["5-10年", 14.0], ["10年以上", 7.0]],
      cities: [["上海", 32.2], ["深圳", 22.4], ["北京", 20.1], ["杭州", 9.5], ["广州", 6.8], ["成都", 5.0], ["其他", 4.0]],
      risks: [
        ["核心城市集中度", "74.7%", "偏高，区域备份不足"],
        ["中高阶密度", "39.2%", "健康，但需防止关键人依赖"],
        ["新人占比", "21.4%", "平稳，可继续补专项骨干"],
        ["管理跨度", "1:7.8", "可控"]
      ],
      signals: [
        "研发人员集中在一线城市",
        "高阶人才密度优于全公司",
        "区域备份仍然偏弱",
        "适合优先做关键岗位继任盘点"
      ]
    }
  },
  report: {
    metrics: [
      ["总人数", "12,842", "较上期 ▲ 8.7%"],
      ["部门数", "298", "较上期 ▲ 3"],
      ["管理幅度（平均）", "11.2", "较上期 ▲ 0.6", "bad"],
      ["25-34 岁占比", "47.6%", "较上期 ▲ 4.2pct"],
      ["一线城市人员占比", "68.3%", "较上期 ▲ 1.9pct"]
    ],
    findings: ["组织整体年轻化，25-34 岁占比较高", "销售和运营新人占比偏高", "研发中高阶人才储备偏薄", "核心城市人员集中度较高"],
    risks: ["管理跨度偏大", "部分序列中层断层", "局部团队非正式用工比例偏高", "部分城市人员密度高但骨干不足"],
    actions: ["先补关键骨干层", "给高扩张部门配置导师和带教机制", "把结构盘点接到招聘规划", "复盘核心城市的人才配置", "对高风险部门做二次下钻"]
  },
  rules: [
    ["P6+ 占比", 8, "%", "低于该阈值时提示高阶支撑不足"],
    ["P3-P5 占比", 25, "%", "低于该阈值时提示中层断层"],
    ["管理跨度", 12, "人", "高于该阈值时提示承接压力"],
    ["0-1年占比", 35, "%", "高于该阈值时提示扩张过快"],
    ["城市集中度", 65, "%", "高于该阈值时提示区域弹性不足"],
    ["小样本隐藏", 20, "人", "低于该人数时不展示明细"]
  ]
};

const $ = selector => document.querySelector(selector);

function metricCard([label, value, delta, tone]) {
  return `<article class="metric-card"><span>${label}</span><strong>${value}</strong><em class="${tone === "bad" ? "bad" : ""}">${delta}</em></article>`;
}

function renderMetrics(target, metrics) {
  $(target).innerHTML = metrics.map(metricCard).join("");
}

function renderBars(target, rows, warm = false) {
  const max = Math.max(...rows.map(row => Number(row[1])));
  $(target).classList.toggle("warm", warm);
  $(target).innerHTML = rows
    .map(([label, value]) => {
      const width = Math.max(8, (Number(value) / max) * 100).toFixed(1);
      const suffix = Number(value) > 100 ? value.toLocaleString() : `${value}%`;
      return `<div class="bar-item"><span>${label}</span><div class="bar-track"><b class="bar-fill" style="--w:${width}%"></b></div><em>${suffix}</em></div>`;
    })
    .join("");
}

function renderColumns(target, rows) {
  const max = Math.max(...rows.map(row => row[1]));
  $(target).innerHTML = rows
    .map(([label, value]) => `<div class="column"><span>${value}%</span><b style="--h:${Math.max(18, (value / max) * 100)}%"></b><small>${label}</small></div>`)
    .join("");
}

function renderStack(target, count = 8) {
  $(target).innerHTML = Array.from({ length: count }, (_, index) => {
    const h = 44 + index * 6 + (index % 3) * 8;
    return `<span class="stack-bar" style="--h:${h}%"></span>`;
  }).join("");
}

function renderPyramid(target, rows) {
  $(target).innerHTML = rows
    .map(([label, width]) => `<div class="pyramid-level" style="--w:${width}%">${label}</div>`)
    .join("");
}

function renderDonut(target, legendTarget, rows) {
  let cursor = 0;
  const stops = rows.map(([, value], index) => {
    const start = cursor;
    cursor += value;
    return `${colors[index % colors.length]} ${start}% ${cursor}%`;
  });
  $(target).style.setProperty("--donut", `conic-gradient(${stops.join(", ")})`);
  $(legendTarget).innerHTML = rows
    .map(([label, value], index) => `<div class="legend-item"><span class="legend-dot" style="--c:${colors[index % colors.length]}"></span><span>${label}</span><b>${value}%</b></div>`)
    .join("");
}

function renderSignals(target, signals) {
  $(target).innerHTML = signals
    .map((text, index) => `<article class="signal-item"><b>${String(index + 1).padStart(2, "0")}</b><p>${text}</p></article>`)
    .join("");
}

function renderFields() {
  $("#rawFields").innerHTML = appData.fields.map(([icon, raw]) => `<div class="field-row"><span>${icon}</span>${raw}</div>`).join("");
  $("#standardFields").innerHTML = appData.fields.map(([, , icon, standard]) => `<div class="field-row"><span>${icon}</span>${standard}</div>`).join("");
  $(".mapping-arrows").innerHTML = appData.fields.map(() => "<span>→</span>").join("");
  $("#qualityList").innerHTML = appData.quality
    .map(([label, status, tone]) => `<div class="quality-row"><span>${label}</span><b class="${tone}">${status}</b></div>`)
    .join("");
}

function renderTreemap() {
  $("#departmentTreemap").innerHTML = appData.departments
    .map(item => `<article class="treemap-cell" style="--span:${item.span}; --h:${item.h}; --c1:${item.colors[0]}; --c2:${item.colors[1]}"><span>${item.name}</span><strong>${item.people.toLocaleString()} 人</strong><small>${item.share}%</small></article>`)
    .join("");
}

function renderMatrix() {
  const rows = [
    ["", "P1", "P2", "P3", "P4", "P5", "P6", "P7"],
    ["销售", 0, 8, 68, 142, 128, 54, 16],
    ["售前/解决方案", 0, 5, 32, 67, 49, 18, 6],
    ["客户成功", 0, 3, 22, 41, 31, 9, 3],
    ["运营支持", 2, 6, 28, 33, 19, 6, 2],
    ["职能", 4, 9, 24, 37, 21, 7, 2]
  ];
  $("#densityMatrix").innerHTML = rows
    .map((row, rowIndex) => `<div class="matrix-row ${rowIndex === 0 ? "header" : ""}">${row.map((cell, index) => index === 0 || rowIndex === 0 ? `<span>${cell}</span>` : `<b class="${Number(cell) > 60 ? "hot" : ""}">${cell}</b>`).join("")}</div>`)
    .join("");
}

function renderDepartment(name) {
  const data = appData.departmentsDeep[name];
  renderMetrics("#departmentMetrics", data.metrics);
  renderDonut("#deptAgeDonut", "#deptAgeLegend", data.age);
  renderDonut("#deptTenureDonut", "#deptTenureLegend", data.tenure);
  renderBars("#deptCityBars", data.cities);
  renderStack("#levelStack", 7);
  renderPyramid("#levelPyramid", [["部门负责人", 28], ["总监 / 高级总监", 42], ["经理", 60], ["主管", 78], ["专员 / 员工", 100]]);
  $("#departmentRisks").innerHTML = data.risks.map(([label, value, note]) => `<article class="risk-card"><span>${label}</span><strong>${value}</strong><em>${note}</em></article>`).join("");
  renderSignals("#departmentSignals", data.signals);
}

function renderSettings() {
  $("#settingsGrid").innerHTML = appData.rules
    .map(([label, value, unit, help]) => `<article class="settings-card"><label>${label}<input type="range" min="1" max="80" value="${value}" data-rule="${label}" /></label><strong>${value}${unit}</strong><p>${help}</p></article>`)
    .join("");
}

function renderReportLists() {
  $("#findingsList").innerHTML = appData.report.findings.map(item => `<li>${item}</li>`).join("");
  $("#risksList").innerHTML = appData.report.risks.map(item => `<li>${item}</li>`).join("");
  $("#actionsList").innerHTML = appData.report.actions.map(item => `<li>${item}</li>`).join("");
}

function switchView(view) {
  document.querySelectorAll(".view").forEach(el => el.classList.toggle("active", el.id === view));
  document.querySelectorAll(".nav-item").forEach(el => el.classList.toggle("active", el.dataset.view === view));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function init() {
  renderMetrics("#commandMetrics", appData.commandMetrics);
  renderMetrics("#overviewMetrics", appData.overviewMetrics);
  renderMetrics("#reportMetrics", appData.report.metrics);
  renderBars("#commandBars", appData.departments.map(({ name, people }) => [name, people]));
  renderBars("#cityBars", appData.cities);
  renderBars("#reportCityBars", appData.cities.slice(0, 10), true);
  renderBars("#newHireBars", [["销售", 31.8], ["运营", 28.6], ["职能", 17.3], ["研发", 12.1], ["产品", 10.4]], true);
  renderColumns("#ageChart", appData.age);
  renderColumns("#tenureChart", appData.tenure);
  renderStack("#commandTrend", 8);
  renderPyramid("#commandPyramid", [["高层", 18], ["中层", 36], ["资深管理", 58], ["专业骨干", 78], ["基层员工", 100]]);
  renderPyramid("#reportPyramid", [["高层 2.8%", 35], ["中高层 15.1%", 52], ["中层 27.3%", 72], ["基层 54.8%", 100]]);
  renderDonut("#employmentDonut", "#employmentLegend", appData.employment);
  renderDonut("#contractDonut", "#contractLegend", appData.contract);
  renderDonut("#reportAgeDonut", "#reportAgeLegend", [["25岁以下", 15.2], ["25-34岁", 47.6], ["35-44岁", 24.8], ["45岁以上", 12.4]]);
  renderSignals("#overviewSignals", ["新人占比 28.4%，扩张仍在继续", "产品与销售人数集中，组织重心明显", "上海 / 北京 / 深圳仍是核心城市", "正式员工占比较高，外包比例可控", "个别部门管理跨度偏大，值得继续下钻"]);
  renderFields();
  renderTreemap();
  renderMatrix();
  renderReportLists();
  renderSettings();

  const departmentSelect = $("#departmentSelect");
  departmentSelect.innerHTML = Object.keys(appData.departmentsDeep).map(name => `<option>${name}</option>`).join("");
  renderDepartment(departmentSelect.value);

  $("#ruleStrip").innerHTML = ["P6+ < 8%", "P3-P5 < 25%", "管理跨度 > 12", "0-1年占比 > 35%", "城市集中度 > 65%"]
    .map(rule => `<span class="rule-chip">${rule}</span>`)
    .join("");
}

document.addEventListener("click", event => {
  const nav = event.target.closest("[data-view]");
  const jump = event.target.closest("[data-jump]");
  const action = event.target.closest("[data-action]");

  if (nav) switchView(nav.dataset.view);
  if (jump) switchView(jump.dataset.jump);
  if (action?.dataset.action === "sample-upload") {
    switchView("import");
    showToast("示例花名册已完成识别：字段映射、质量检查和组织层级已生成。");
  }
  if (action?.dataset.action === "generate-report") {
    switchView("insights");
    showToast("已生成老板版摘要：关键发现、结构风险和建议动作已刷新。");
  }
});

document.addEventListener("input", event => {
  if (event.target.matches(".settings-card input")) {
    const value = event.target.value;
    const strong = event.target.closest(".settings-card").querySelector("strong");
    const unit = strong.textContent.replace(/[0-9]/g, "");
    strong.textContent = `${value}${unit}`;
  }
});

document.addEventListener("change", event => {
  if (event.target.id === "departmentSelect") {
    renderDepartment(event.target.value);
    showToast(`已切换到${event.target.value}，下钻指标和结构信号已更新。`);
  }
});

init();
