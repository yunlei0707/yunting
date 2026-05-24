const STORAGE_KEY = "ea-studio-cn-project-v2";

const pageMeta = {
  workspace: ["工作台", "黄金 MA 金叉/死叉策略正在接受新闻风控与风险检查。"],
  builder: ["可视化构建器", "用事件、模块和连线搭建 MT4/MT5 EA 逻辑。"],
  analysis: ["策略分析", "自动解释策略结构、检查交易风险和新闻过滤缺口。"],
  risk: ["风控中心", "统一管理账户、订单、点差、重大事件和紧急保护。"],
  events: ["重大事件", "配置非农、CPI、FOMC、利率决议、央行讲话等禁开仓窗口。"],
  templates: ["策略模板", "从黄金、趋势、突破、新闻避险模板快速创建 EA。"],
  backtest: ["回测报告", "解析回测指标，并复盘重大事件窗口内交易表现。"],
  export: ["代码/导出", "预览并导出 MQL4/MQL5、事件规则和策略说明。"],
};

const blockGroups = [
  {
    title: "重大事件过滤",
    color: "amber",
    items: [
      block("非农过滤", "news", "阻止 NFP 前后新开仓", { before: 60, after: 60, event: "NFP" }),
      block("CPI 过滤", "news", "阻止 CPI 前后新开仓", { before: 60, after: 90, event: "CPI" }),
      block("FOMC 过滤", "news", "阻止 FOMC 前后新开仓", { before: 120, after: 120, event: "FOMC" }),
      block("利率决议过滤", "news", "央行利率决议前后暂停", { before: 90, after: 120, event: "Rate Decision" }),
      block("事件后恢复确认", "recovery", "等待波动恢复后再开仓", { bars: 3, atrMultiplier: 1.8 }),
    ],
  },
  {
    title: "指标条件",
    color: "purple",
    items: [
      block("短期 MA", "indicator", "短期均线", { period: 20, method: "EMA", price: "Close" }),
      block("长期 MA", "indicator", "长期均线", { period: 60, method: "EMA", price: "Close" }),
      block("MA 金叉/死叉", "condition", "均线交叉条件", { operator: "cross", left: "短期 MA", right: "长期 MA" }),
      block("RSI 反转", "condition", "RSI 超买超卖", { period: 14, buyBelow: 30, sellAbove: 70 }),
      block("ATR 波动过滤", "condition", "过滤极端波动", { period: 14, maxAtr: 28 }),
    ],
  },
  {
    title: "交易执行",
    color: "green",
    items: [
      block("买入市价单", "trade", "执行 Buy", { direction: "Buy", stopLoss: 400, takeProfit: 1200 }),
      block("卖出市价单", "trade", "执行 Sell", { direction: "Sell", stopLoss: 400, takeProfit: 1200 }),
      block("撤销挂单", "trade", "重大事件前撤销挂单", { action: "CancelPendingOrders" }),
      block("只允许平仓", "trade", "事件期间只管理持仓", { action: "ManageOnly" }),
    ],
  },
  {
    title: "风控保护",
    color: "red",
    items: [
      block("单笔风险", "risk", "按账户百分比计算手数", { riskPercent: 1 }),
      block("最大日亏损", "risk", "达到日亏损停止开仓", { maxDailyLoss: 3 }),
      block("最大账户回撤", "risk", "超过回撤停止交易", { maxDrawdown: 10 }),
      block("点差异常过滤", "risk", "点差过大禁止下单", { maxSpread: 45 }),
      block("连续亏损停止", "risk", "连续亏损后暂停", { maxLossStreak: 4 }),
    ],
  },
  {
    title: "平仓管理",
    color: "cyan",
    items: [
      block("固定止损止盈", "exit", "为订单设置 SL/TP", { stopLoss: 400, takeProfit: 1200 }),
      block("保本", "exit", "盈利后移动到开仓价", { trigger: 300, lock: 20 }),
      block("追踪止损", "exit", "跟随价格移动止损", { start: 450, distance: 280 }),
      block("反向信号平仓", "exit", "出现反向条件时平仓", { closeOnReverse: true }),
    ],
  },
];

const templates = [
  {
    name: "XAUUSD MA 金叉/死叉",
    type: "趋势跟随",
    risk: "中等",
    tags: ["黄金", "均线", "新闻避险"],
    summary: "适合黄金 H1/H4 的均线趋势模板，内置非农/CPI/FOMC 禁开仓。",
    nodes: [
      node("n1", "OnTick", "每个 Tick 检查策略", "event", "blue", 60, 70, {}),
      node("n2", "重大事件过滤", "非农/CPI/FOMC 禁开仓", "news", "amber", 285, 70, { before: 60, after: 90 }),
      node("n3", "点差过滤", "点差 > 45 points 停止", "risk", "cyan", 510, 70, { maxSpread: 45 }),
      node("n4", "短期 MA", "周期 20，收盘价", "indicator", "purple", 230, 230, { period: 20, method: "EMA", price: "Close" }),
      node("n5", "长期 MA", "周期 60，收盘价", "indicator", "purple", 460, 230, { period: 60, method: "EMA", price: "Close" }),
      node("n6", "金叉做多", "短期 MA 上穿长期 MA", "trade", "green", 210, 390, { direction: "Buy", stopLoss: 400, takeProfit: 1200 }),
      node("n7", "死叉做空", "短期 MA 下穿长期 MA", "trade", "red", 485, 390, { direction: "Sell", stopLoss: 400, takeProfit: 1200 }),
      node("n8", "风控保护", "1% 风险 / 日亏损 3%", "risk", "red", 720, 245, { riskPercent: 1, maxDailyLoss: 3, maxDrawdown: 10 }),
    ],
    connections: [["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n3", "n5"], ["n4", "n6"], ["n5", "n6"], ["n4", "n7"], ["n5", "n7"], ["n6", "n8"], ["n7", "n8"]],
  },
  {
    name: "黄金 ORB 突破",
    type: "价格行为",
    risk: "较高",
    tags: ["XAUUSD", "突破", "高波动"],
    summary: "参考开盘区间突破思路，重视事件过滤、撤销挂单和最大回撤保护。",
    nodes: [
      node("n1", "OnTick", "每个 Tick 检查策略", "event", "blue", 70, 70, {}),
      node("n2", "重大事件过滤", "高影响 USD 新闻停开仓", "news", "amber", 290, 70, { before: 90, after: 120 }),
      node("n3", "ORB 区间突破", "突破亚洲盘区间", "condition", "purple", 270, 240, { session: "Asia", rangeMinutes: 180 }),
      node("n4", "挂单突破", "上下沿挂单", "trade", "green", 520, 240, { stopLoss: 550, takeProfit: 1500 }),
      node("n5", "撤销挂单", "事件前撤销未成交挂单", "trade", "red", 760, 240, { action: "CancelPendingOrders" }),
    ],
    connections: [["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n2", "n5"]],
  },
  {
    name: "非农避险保护层",
    type: "风控辅助",
    risk: "低",
    tags: ["NFP", "禁开仓", "撤挂单"],
    summary: "专门给现有 EA 增加非农、点差、事件期间只平仓保护。",
    nodes: [
      node("n1", "OnTick", "保护逻辑入口", "event", "blue", 80, 100, {}),
      node("n2", "非农过滤", "前 60 / 后 60 禁开仓", "news", "amber", 320, 100, { before: 60, after: 60 }),
      node("n3", "点差异常过滤", "点差过大禁止下单", "risk", "cyan", 560, 100, { maxSpread: 35 }),
      node("n4", "只允许平仓", "事件窗口只管理持仓", "trade", "red", 800, 100, { action: "ManageOnly" }),
    ],
    connections: [["n1", "n2"], ["n2", "n3"], ["n3", "n4"]],
  },
];

function block(title, type, desc, params) {
  return { title, type, desc, params };
}

function node(id, title, desc, type, color, x, y, params) {
  return { id, title, desc, type, color, x, y, params: params || {}, enabled: true };
}

function defaultProject() {
  const tpl = templates[0];
  return {
    name: "黄金 MA 新闻避险策略",
    symbol: "XAUUSD",
    timeframe: "H1",
    selectedNode: "n2",
    activeEvent: "OnTick",
    zoom: 100,
    nodes: structuredClone(tpl.nodes),
    connections: structuredClone(tpl.connections),
    events: [
      event("e1", "美国非农就业数据 NFP", "2026-06-05T20:30", "USD", "XAUUSD,EURUSD,GBPUSD", "极高", 60, 60),
      event("e2", "美国 CPI 通胀数据", "2026-06-10T20:30", "USD", "XAUUSD,EURUSD,GBPUSD,US500", "极高", 60, 90),
      event("e3", "FOMC 利率决议", "2026-06-18T02:00", "USD", "XAUUSD,EURUSD,GBPUSD,US500", "极高", 120, 120),
      event("e4", "美联储主席发布会", "2026-06-18T02:30", "USD", "XAUUSD,USDJPY,US500", "高", 30, 60),
      event("e5", "英国央行利率决议", "2026-06-20T19:00", "GBP", "GBPUSD,EURGBP", "高", 90, 120),
    ],
    riskRules: [
      risk("r1", "单笔风险", "账户", "1%", "每笔订单最多亏损账户 1%", true),
      risk("r2", "最大日亏损", "账户", "3%", "当日亏损达到 3% 后停止开仓", true),
      risk("r3", "最大账户回撤", "账户", "10%", "超过回撤阈值后停止交易", true),
      risk("r4", "点差过滤", "执行", "45 points", "点差超过阈值禁止下单", true),
      risk("r5", "事件后恢复确认", "新闻", "3 根 K 线", "事件结束后等待波动恢复再开仓", false),
    ],
    backtest: {
      source: "模拟报告",
      stats: { profit: 18.4, drawdown: 9.6, winRate: 54.8, profitFactor: 1.42, trades: 286, eventTrades: 12 },
      equity: [100, 102, 101, 105, 108, 106, 112, 117, 113, 119, 121, 126, 124, 130, 136, 132, 141, 145, 143, 151],
      trades: [],
    },
  };
}

function event(id, name, time, currency, symbols, impact, before, after) {
  return { id, name, time, currency, symbols, impact, before: Number(before), after: Number(after), blockOpen: true, cancelPending: impact === "极高", allowCloseOnly: true };
}

function risk(id, name, category, value, description, enabled) {
  return { id, name, category, value, description, enabled };
}

let state = loadProject();
let history = [];
let future = [];

function loadProject() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultProject();
  } catch {
    return defaultProject();
  }
}

function snapshot() {
  history.push(JSON.stringify(state));
  if (history.length > 40) history.shift();
  future = [];
}

function commit(message) {
  renderAll();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (message) showToast(message);
}

function analysis() {
  const enabledNodes = state.nodes.filter((n) => n.enabled);
  const hasNews = enabledNodes.some((n) => n.type === "news");
  const hasRisk = enabledNodes.some((n) => n.type === "risk") || state.riskRules.some((r) => r.enabled && r.category === "账户");
  const hasSpread = enabledNodes.some((n) => JSON.stringify(n.params).includes("maxSpread")) || state.riskRules.some((r) => r.enabled && r.name.includes("点差"));
  const hasStops = enabledNodes.some((n) => Number(n.params.stopLoss) > 0) || enabledNodes.some((n) => n.type === "exit");
  const hasRecovery = enabledNodes.some((n) => n.type === "recovery") || state.riskRules.some((r) => r.enabled && r.name.includes("恢复"));
  const disconnected = enabledNodes.filter((n) => n.type !== "event" && !state.connections.some(([a, b]) => a === n.id || b === n.id));
  const eventCount = state.events.filter((e) => ["高", "极高"].includes(e.impact)).length;
  let score = 45;
  if (hasNews) score += 16;
  if (hasRisk) score += 14;
  if (hasSpread) score += 10;
  if (hasStops) score += 12;
  if (hasRecovery) score += 8;
  score -= Math.min(disconnected.length * 6, 18);
  score = Math.max(0, Math.min(100, score));
  const checks = [
    [hasNews ? "ok" : "warn", hasNews ? "已启用重大事件过滤，新闻窗口会阻止新开仓。" : "缺少重大事件过滤，非农/CPI/FOMC 期间可能继续开仓。"],
    [hasRisk ? "ok" : "warn", hasRisk ? "已配置账户级风控。" : "缺少账户级风控，如单笔风险、最大日亏损或最大回撤。"],
    [hasSpread ? "ok" : "warn", hasSpread ? "已配置点差异常过滤。" : "缺少点差过滤，重大新闻期间可能在高点差下成交。"],
    [hasStops ? "ok" : "warn", hasStops ? "开仓逻辑包含止损/止盈或平仓管理。" : "交易执行缺少止损止盈或明确平仓管理。"],
    [hasRecovery ? "ok" : "warn", hasRecovery ? "已配置事件后波动恢复确认。" : "建议加入事件后 N 根 K 线波动恢复确认，避免新闻后立即进场。"],
    [disconnected.length === 0 ? "ok" : "warn", disconnected.length === 0 ? "画布没有孤立模块。" : `发现 ${disconnected.length} 个孤立模块，可能不会被执行。`],
  ];
  const riskLevel = score >= 85 ? "低" : score >= 70 ? "中" : "高";
  return { score, checks, hasNews, hasRisk, hasSpread, hasStops, hasRecovery, disconnected, eventCount, riskLevel };
}

function switchView(viewId) {
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === viewId));
  const [title, subtitle] = pageMeta[viewId];
  document.getElementById("pageTitle").textContent = title;
  document.getElementById("pageSubtitle").textContent = subtitle;
  if (viewId === "builder") requestAnimationFrame(drawConnections);
  if (viewId === "backtest") requestAnimationFrame(drawEquityChart);
}

function renderAll() {
  renderSidebar();
  renderWorkspace();
  renderBlocks();
  renderEventTabs();
  renderCanvasNodes();
  renderProperties();
  renderAnalysis();
  renderRiskRules();
  renderEvents();
  renderTemplates();
  renderBacktest();
  renderExport();
  requestAnimationFrame(drawConnections);
}

function renderSidebar() {
  const next = [...state.events].sort((a, b) => new Date(a.time) - new Date(b.time))[0];
  document.getElementById("nextEventCard").innerHTML = `
    <div class="status-label">下一次高影响事件</div>
    <div class="status-title">${next?.name || "暂无事件"}</div>
    <div class="status-time">${next ? formatDateTime(next.time) : "请添加经济事件"}</div>
    <div class="status-chip danger">${state.symbol} 禁开仓窗口：前 ${next?.before || 0} / 后 ${next?.after || 0} 分钟</div>
  `;
}

function renderWorkspace() {
  const a = analysis();
  const bt = state.backtest.stats;
  document.getElementById("metricGrid").innerHTML = [
    ["策略健康评分", a.score, a.hasNews ? "已启用重大事件禁开仓" : "缺少新闻风控", ""],
    ["当前风险等级", a.riskLevel, a.hasRecovery ? "新闻后恢复确认已启用" : "缺少事件后恢复确认", "warning-text"],
    ["高影响事件", a.eventCount, `${state.symbol} 相关事件会进入禁开仓判断`, ""],
    ["最近回测收益", `${bt.profit}%`, `最大回撤 ${bt.drawdown}%`, "success-text"],
  ].map(([label, value, note, cls]) => `<article class="metric-card"><span>${label}</span><strong class="${cls}">${value}</strong><small>${note}</small></article>`).join("");
  document.getElementById("workspaceSummary").textContent = `${state.name}：${state.symbol} / ${state.timeframe}，当前有 ${state.nodes.length} 个模块、${state.connections.length} 条连线、${state.events.length} 条事件规则。`;
  document.getElementById("miniFlow").innerHTML = state.nodes.slice(0, 5).map((n, i) => `
    <div class="mini-node ${n.color}">${n.title}</div>${i < Math.min(state.nodes.length, 5) - 1 ? '<div class="mini-arrow"></div>' : ""}
  `).join("");
  document.getElementById("workspaceInsights").innerHTML = a.checks.slice(0, 4).map(([kind, text]) => `<div class="insight ${kind === "ok" ? "good" : "warn"}">${text}</div>`).join("");
  document.getElementById("todayEvents").innerHTML = state.events.slice(0, 4).map((e) => eventCard(e)).join("");
}

function renderBlocks(filter = document.getElementById("blockSearch")?.value || "") {
  const keyword = filter.trim().toLowerCase();
  document.getElementById("blockGroups").innerHTML = blockGroups.map((group) => {
    const items = group.items.filter((item) => `${item.title}${item.desc}${group.title}`.toLowerCase().includes(keyword));
    if (!items.length) return "";
    return `<section class="block-group">
      <div class="block-group-title">${group.title}</div>
      ${items.map((item) => `<button class="block-item" data-block='${escapeAttr(JSON.stringify({ ...item, color: group.color }))}'>${item.title}<span>${item.desc}</span></button>`).join("")}
    </section>`;
  }).join("");
  document.querySelectorAll(".block-item").forEach((button) => {
    button.addEventListener("click", () => addNodeFromBlock(JSON.parse(button.dataset.block)));
  });
}

function renderEventTabs() {
  const counts = { OnTick: state.nodes.length, OnInit: 2, OnTimer: 4, OnTrade: 3, OnDeinit: 1 };
  document.getElementById("eventTabs").innerHTML = Object.keys(counts).map((name) => `<button class="event-tab ${name === state.activeEvent ? "active" : ""}" data-event="${name}">${name} <span>${counts[name]}</span></button>`).join("");
  document.querySelectorAll(".event-tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeEvent = button.dataset.event;
      commit(`已切换到 ${state.activeEvent}`);
    });
  });
}

function renderCanvasNodes() {
  const canvas = document.getElementById("strategyCanvas");
  canvas.querySelectorAll(".node").forEach((nodeEl) => nodeEl.remove());
  state.nodes.forEach((n) => {
    const el = document.createElement("button");
    el.className = `node ${n.color} ${n.id === state.selectedNode ? "active" : ""} ${n.enabled ? "" : "disabled"}`;
    el.style.left = `${n.x}px`;
    el.style.top = `${n.y}px`;
    el.dataset.nodeId = n.id;
    el.innerHTML = `<div class="node-title">${n.title}</div><div class="node-desc">${n.desc}</div>`;
    el.addEventListener("click", () => {
      state.selectedNode = n.id;
      commit();
    });
    makeDraggable(el, n.id);
    canvas.appendChild(el);
  });
}

function renderProperties() {
  const n = currentNode();
  const panel = document.getElementById("nodeProperties");
  document.getElementById("selectedTag").textContent = n ? n.type : "未选中";
  if (!n) {
    panel.innerHTML = `<div class="property-card"><h3>请选择画布模块</h3><p class="node-desc">点击左侧块库可以新增模块，点击画布节点可以编辑参数。</p></div>`;
    return;
  }
  const params = Object.entries(n.params || {});
  panel.innerHTML = `
    <div class="property-section">
      <div class="property-card">
        <h3>${n.title}</h3>
        <div class="field"><label>模块名称</label><input id="propTitle" type="text" value="${escapeAttr(n.title)}" /></div>
        <div class="field"><label>说明</label><input id="propDesc" type="text" value="${escapeAttr(n.desc)}" /></div>
        <label class="inline-check"><input id="propEnabled" type="checkbox" ${n.enabled ? "checked" : ""} /> 启用该模块</label>
      </div>
      <div class="property-card">
        <h3>参数配置</h3>
        ${params.map(([key, value]) => `<div class="field"><label>${key}</label><input class="param-input" data-key="${key}" type="text" value="${escapeAttr(String(value))}" /></div>`).join("") || '<p class="node-desc">该模块没有额外参数。</p>'}
      </div>
      <div class="property-card action-grid">
        <button class="secondary-button" id="connectFromSelected">从当前模块连到新模块</button>
        <button class="secondary-button" id="duplicateNode">复制模块</button>
        <button class="secondary-button" id="deleteNode">删除模块</button>
      </div>
    </div>
  `;
  document.getElementById("propTitle").addEventListener("change", (e) => updateNode(n.id, { title: e.target.value }));
  document.getElementById("propDesc").addEventListener("change", (e) => updateNode(n.id, { desc: e.target.value }));
  document.getElementById("propEnabled").addEventListener("change", (e) => updateNode(n.id, { enabled: e.target.checked }));
  document.querySelectorAll(".param-input").forEach((input) => input.addEventListener("change", (e) => {
    snapshot();
    n.params[e.target.dataset.key] = parseValue(e.target.value);
    commit("参数已更新");
  }));
  document.getElementById("duplicateNode").addEventListener("click", () => duplicateNode(n.id));
  document.getElementById("deleteNode").addEventListener("click", () => deleteNode(n.id));
  document.getElementById("connectFromSelected").addEventListener("click", () => showToast("先点击左侧块库新增模块，系统会自动从当前模块连接过去。"));
}

function renderAnalysis() {
  const a = analysis();
  document.getElementById("analysisScore").textContent = `${a.score} / 100`;
  document.getElementById("analysisCards").innerHTML = [
    ["策略类型", `${state.symbol} ${state.timeframe} 趋势跟随/事件避险组合。系统检测到 ${state.nodes.filter((n) => n.type === "indicator").length} 个指标模块、${state.nodes.filter((n) => n.type === "trade").length} 个交易执行模块。`],
    ["入场逻辑", "当事件窗口、点差过滤和指标条件通过后，策略才允许开仓。若处于非农、CPI、FOMC 或利率决议窗口，只允许管理已有持仓。"],
    ["风险控制", `当前启用 ${state.riskRules.filter((r) => r.enabled).length} 条风控规则，覆盖账户、执行、新闻和订单层。`],
    ["主要缺口", a.checks.filter(([kind]) => kind === "warn").map(([, text]) => text).join(" ") || "当前没有发现高优先级缺口。"],
  ].map(([title, text], index) => `<article class="report-card ${index === 3 && a.score < 90 ? "warning" : ""}"><h3>${title}</h3><p>${text}</p></article>`).join("");
  document.getElementById("analysisChecks").innerHTML = a.checks.map(([kind, text]) => `<div class="check-item"><span class="check-icon ${kind}">${kind === "ok" ? "✓" : "!"}</span><span>${text}</span></div>`).join("");
}

function renderRiskRules() {
  document.getElementById("riskRules").innerHTML = state.riskRules.map((r) => `
    <div class="risk-row">
      <strong>${r.name}</strong>
      <span>${r.description}</span>
      <span>${r.value}</span>
      <label class="switch"><input type="checkbox" data-risk="${r.id}" ${r.enabled ? "checked" : ""} /><span>${r.enabled ? "启用" : "停用"}</span></label>
    </div>
  `).join("");
  document.querySelectorAll("[data-risk]").forEach((input) => input.addEventListener("change", (e) => {
    snapshot();
    state.riskRules.find((r) => r.id === e.target.dataset.risk).enabled = e.target.checked;
    commit("风控规则状态已更新");
  }));
  const enabled = state.riskRules.filter((r) => r.enabled);
  document.getElementById("coverageList").innerHTML = [`已启用 ${enabled.length} 条规则`, ...enabled.map((r) => `${r.name}: ${r.value}`)].map((text) => `<span>${text}</span>`).join("");
}

function renderEvents() {
  document.getElementById("eventTimeline").innerHTML = state.events.map((e) => `
    <div class="timeline-row">
      <strong>${formatDateTime(e.time)}</strong>
      <div>
        <div>${e.name}</div>
        <span class="impact-pill ${["高", "极高"].includes(e.impact) ? "high" : "medium"}">${e.impact}影响</span>
      </div>
      <span>${e.currency} / ${e.symbols}</span>
      <span>前 ${e.before} / 后 ${e.after} 分钟</span>
      <button class="ghost-button small" data-delete-event="${e.id}">删除</button>
    </div>
  `).join("");
  document.querySelectorAll("[data-delete-event]").forEach((button) => button.addEventListener("click", () => {
    snapshot();
    state.events = state.events.filter((e) => e.id !== button.dataset.deleteEvent);
    commit("事件已删除");
  }));
}

function renderTemplates(filter = document.getElementById("templateSearch")?.value || "") {
  const keyword = filter.trim().toLowerCase();
  document.getElementById("templateGrid").innerHTML = templates.filter((tpl) => `${tpl.name}${tpl.type}${tpl.tags.join("")}`.toLowerCase().includes(keyword)).map((tpl, index) => `
    <article class="template-card">
      <h3>${tpl.name}</h3>
      <p class="node-desc">${tpl.summary}</p>
      <div class="template-tags">${tpl.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      <button class="ghost-button" data-template="${index}">使用模板</button>
    </article>
  `).join("");
  document.querySelectorAll("[data-template]").forEach((button) => button.addEventListener("click", () => applyTemplate(Number(button.dataset.template))));
}

function renderBacktest() {
  const stats = state.backtest.stats;
  document.getElementById("backtestStats").innerHTML = [
    ["报告来源", state.backtest.source],
    ["净利润", `${stats.profit}%`],
    ["最大回撤", `${stats.drawdown}%`],
    ["胜率", `${stats.winRate}%`],
    ["盈亏比", stats.profitFactor],
    ["交易次数", stats.trades],
    ["事件窗口交易", stats.eventTrades],
  ].map(([k, v]) => `<div><span>${k}</span><strong>${v}</strong></div>`).join("");
  document.getElementById("tradeTable").innerHTML = state.backtest.trades.length ? `
    <h3>交易样本</h3>
    ${state.backtest.trades.slice(0, 8).map((t) => `<div class="trade-row"><span>${t.time || "-"}</span><span>${t.type || "-"}</span><span>${t.symbol || "-"}</span><strong>${t.profit}</strong></div>`).join("")}
  ` : `<p class="node-desc">上传 CSV/HTML 回测报告后，这里会显示解析到的交易样本。</p>`;
  requestAnimationFrame(drawEquityChart);
}

function renderExport() {
  document.getElementById("codePreview").textContent = generateMql();
  document.getElementById("exportOptions").innerHTML = [
    "MQL5 源码",
    "项目 JSON",
    "重大事件规则表",
    "策略分析报告",
    "回测指标摘要",
  ].map((label) => `<label><input type="checkbox" checked /> ${label}</label>`).join("");
}

function addNodeFromBlock(item) {
  snapshot();
  const id = `n${Date.now()}`;
  const base = currentNode();
  const x = base ? Math.min(base.x + 220, 820) : 160;
  const y = base ? Math.min(base.y + 90, 460) : 140;
  const newNode = node(id, item.title, item.desc, item.type, item.color || "blue", x, y, structuredClone(item.params));
  state.nodes.push(newNode);
  if (base) state.connections.push([base.id, id]);
  state.selectedNode = id;
  commit(`${item.title} 已添加到画布`);
}

function updateNode(id, patch) {
  snapshot();
  Object.assign(state.nodes.find((n) => n.id === id), patch);
  commit("模块已更新");
}

function duplicateNode(id) {
  snapshot();
  const source = state.nodes.find((n) => n.id === id);
  const copy = structuredClone(source);
  copy.id = `n${Date.now()}`;
  copy.title = `${copy.title} 副本`;
  copy.x += 40;
  copy.y += 40;
  state.nodes.push(copy);
  state.connections.push([source.id, copy.id]);
  state.selectedNode = copy.id;
  commit("模块已复制");
}

function deleteNode(id) {
  if (state.nodes.length <= 1) {
    showToast("至少保留一个模块");
    return;
  }
  snapshot();
  state.nodes = state.nodes.filter((n) => n.id !== id);
  state.connections = state.connections.filter(([a, b]) => a !== id && b !== id);
  state.selectedNode = state.nodes[0]?.id;
  commit("模块已删除");
}

function applyTemplate(index) {
  snapshot();
  const tpl = templates[index];
  state.name = tpl.name;
  state.nodes = structuredClone(tpl.nodes);
  state.connections = structuredClone(tpl.connections);
  state.selectedNode = state.nodes[0]?.id;
  commit(`已应用模板：${tpl.name}`);
  switchView("builder");
}

function autoLayout() {
  snapshot();
  const cols = [80, 315, 550, 785];
  state.nodes.forEach((n, i) => {
    n.x = cols[i % cols.length];
    n.y = 70 + Math.floor(i / cols.length) * 155;
  });
  commit("已自动整理画布");
}

function makeDraggable(el, nodeId) {
  let start = null;
  el.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    const n = state.nodes.find((item) => item.id === nodeId);
    start = { px: event.clientX, py: event.clientY, x: n.x, y: n.y };
    el.setPointerCapture(event.pointerId);
  });
  el.addEventListener("pointermove", (event) => {
    if (!start) return;
    const n = state.nodes.find((item) => item.id === nodeId);
    n.x = Math.max(0, Math.min(920, start.x + event.clientX - start.px));
    n.y = Math.max(0, Math.min(520, start.y + event.clientY - start.py));
    el.style.left = `${n.x}px`;
    el.style.top = `${n.y}px`;
    drawConnections();
  });
  el.addEventListener("pointerup", (event) => {
    if (!start) return;
    start = null;
    el.releasePointerCapture(event.pointerId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  });
}

function drawConnections() {
  const canvas = document.getElementById("connectionCanvas");
  const panel = document.getElementById("strategyCanvas");
  if (!canvas || !panel) return;
  const rect = panel.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(232, 177, 61, 0.72)";
  ctx.fillStyle = "rgba(232, 177, 61, 0.88)";
  const lookup = Object.fromEntries(state.nodes.map((n) => [n.id, n]));
  state.connections.forEach(([from, to]) => {
    const a = lookup[from];
    const b = lookup[to];
    if (!a || !b) return;
    const x1 = a.x + 156;
    const y1 = a.y + 31;
    const x2 = b.x;
    const y2 = b.y + 31;
    const mid = x1 + (x2 - x1) / 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(mid, y1, mid, y2, x2, y2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 8, y2 - 5);
    ctx.lineTo(x2 - 8, y2 + 5);
    ctx.closePath();
    ctx.fill();
  });
}

function drawEquityChart() {
  const canvas = document.getElementById("equityChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const data = state.backtest.equity.length ? state.backtest.equity : [100, 101, 100.5, 102];
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#101722";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(148, 163, 184, 0.16)";
  for (let i = 1; i < 5; i += 1) {
    const y = (h / 5) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  const min = Math.min(...data);
  const max = Math.max(...data);
  ctx.strokeStyle = "#21c7b7";
  ctx.lineWidth = 3;
  ctx.beginPath();
  data.forEach((value, index) => {
    const x = 24 + (index / Math.max(data.length - 1, 1)) * (w - 48);
    const y = h - 24 - ((value - min) / Math.max(max - min, 1)) * (h - 52);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.fillStyle = "rgba(240, 82, 82, 0.18)";
  ctx.fillRect(w * 0.54, 20, 74, h - 40);
  ctx.fillStyle = "#ffb4b4";
  ctx.font = "14px Microsoft YaHei";
  ctx.fillText("事件窗口", w * 0.54 + 8, 42);
}

function parseBacktest(text, fileName) {
  const plain = text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
  const numberAfter = (labels, fallback) => {
    for (const label of labels) {
      const re = new RegExp(`${label}[^\\d\\-\\.]{0,40}(-?\\d+(?:\\.\\d+)?)`, "i");
      const match = plain.match(re);
      if (match) return Number(match[1]);
    }
    return fallback;
  };
  const profits = [];
  const trades = [];
  text.split(/\r?\n/).forEach((line) => {
    const parts = line.split(/,|\t|;/).map((p) => p.trim()).filter(Boolean);
    const profit = Number(parts[parts.length - 1]);
    if (Number.isFinite(profit) && parts.length >= 4) {
      profits.push(profit);
      trades.push({ time: parts[0], type: parts[1], symbol: parts[2], profit });
    }
  });
  let equity = [100];
  profits.forEach((p) => equity.push(Number((equity[equity.length - 1] + p / 100).toFixed(2))));
  if (equity.length < 4) equity = state.backtest.equity;
  const stats = {
    profit: numberAfter(["Net Profit", "Total Net Profit", "净利润"], state.backtest.stats.profit),
    drawdown: numberAfter(["Maximal Drawdown", "最大回撤"], state.backtest.stats.drawdown),
    winRate: numberAfter(["Win Rate", "胜率"], state.backtest.stats.winRate),
    profitFactor: numberAfter(["Profit Factor", "盈利因子", "盈亏比"], state.backtest.stats.profitFactor),
    trades: numberAfter(["Total Trades", "交易次数"], trades.length || state.backtest.stats.trades),
    eventTrades: estimateEventTrades(trades),
  };
  state.backtest = { source: fileName, stats, equity, trades };
}

function estimateEventTrades(trades) {
  if (!trades.length) return state.backtest.stats.eventTrades;
  return trades.filter((t) => state.events.some((e) => {
    const tradeTime = new Date(t.time).getTime();
    const eventTime = new Date(e.time).getTime();
    if (!Number.isFinite(tradeTime) || !Number.isFinite(eventTime)) return false;
    return tradeTime >= eventTime - e.before * 60000 && tradeTime <= eventTime + e.after * 60000;
  })).length;
}

function generateMql() {
  const newsEvents = state.events.map((e) => `  AddNewsEvent("${e.name}", "${e.time}", "${e.currency}", "${e.symbols}", ${e.before}, ${e.after});`).join("\n");
  const maxSpread = findParam("maxSpread", 45);
  const riskPercent = findParam("riskPercent", 1);
  const buyNode = state.nodes.find((n) => n.params.direction === "Buy");
  const sellNode = state.nodes.find((n) => n.params.direction === "Sell");
  return `// ${state.name}
// Generated by 外汇策略工坊
#property strict

input double RiskPercent = ${riskPercent};
input int MaxSpreadPoints = ${maxSpread};
input bool AllowCloseOnlyDuringNews = true;

void LoadNewsCalendar() {
${newsEvents || "  // No news events configured."}
}

bool IsNewsBlocked(datetime now) {
  for (int i = 0; i < NewsEventsTotal(); i++) {
    if (IsInsideNewsWindow(i, now)) return true;
  }
  return false;
}

bool CanOpenNewTrade() {
  if (SymbolInfoInteger(_Symbol, SYMBOL_SPREAD) > MaxSpreadPoints) return false;
  if (IsNewsBlocked(TimeCurrent())) return false;
  if (IsDailyLossExceeded()) return false;
  if (IsDrawdownExceeded()) return false;
  return true;
}

void OnTick() {
  if (!CanOpenNewTrade()) {
    ManageOpenPositionsOnly();
    return;
  }

  double fastMA = iMA(_Symbol, PERIOD_CURRENT, ${findNodeParam("短期 MA", "period", 20)}, 0, MODE_EMA, PRICE_CLOSE, 0);
  double slowMA = iMA(_Symbol, PERIOD_CURRENT, ${findNodeParam("长期 MA", "period", 60)}, 0, MODE_EMA, PRICE_CLOSE, 0);

  if (fastMA > slowMA) OpenTrade(ORDER_TYPE_BUY, ${buyNode?.params.stopLoss || 400}, ${buyNode?.params.takeProfit || 1200});
  if (fastMA < slowMA) OpenTrade(ORDER_TYPE_SELL, ${sellNode?.params.stopLoss || 400}, ${sellNode?.params.takeProfit || 1200});
}`;
}

function bindEvents() {
  document.querySelectorAll(".nav-item").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
  document.querySelectorAll("[data-jump]").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.jump)));
  document.getElementById("blockSearch").addEventListener("input", (event) => renderBlocks(event.target.value));
  document.getElementById("templateSearch").addEventListener("input", (event) => renderTemplates(event.target.value));
  document.getElementById("runCheck").addEventListener("click", () => {
    const a = analysis();
    showToast(`检查完成：评分 ${a.score}，发现 ${a.checks.filter(([k]) => k === "warn").length} 个建议项。`);
    switchView("analysis");
  });
  document.getElementById("newsCheckButton").addEventListener("click", () => showToast(analysis().hasNews ? "新闻风控已启用。" : "缺少重大事件过滤，请从左侧添加。"));
  document.getElementById("saveProject").addEventListener("click", () => commit("项目已保存到浏览器本地存储"));
  document.getElementById("undoButton").addEventListener("click", undo);
  document.getElementById("redoButton").addEventListener("click", redo);
  document.getElementById("autoLayoutButton").addEventListener("click", autoLayout);
  document.getElementById("zoomButton").addEventListener("click", () => {
    state.zoom = state.zoom === 100 ? 85 : state.zoom === 85 ? 115 : 100;
    document.getElementById("zoomButton").textContent = `缩放 ${state.zoom}%`;
    document.getElementById("strategyCanvas").style.transform = `scale(${state.zoom / 100})`;
    document.getElementById("strategyCanvas").style.transformOrigin = "top left";
  });
  document.getElementById("eventForm").addEventListener("submit", addEventFromForm);
  document.getElementById("riskForm").addEventListener("submit", addRiskFromForm);
  document.getElementById("eventImport").addEventListener("change", importEvents);
  document.getElementById("backtestImport").addEventListener("change", importBacktest);
  document.getElementById("exportEvents").addEventListener("click", () => download("重大事件规则.json", JSON.stringify(state.events, null, 2), "application/json"));
  document.getElementById("downloadProject").addEventListener("click", () => download(`${state.name}.json`, JSON.stringify(state, null, 2), "application/json"));
  document.getElementById("downloadMql").addEventListener("click", () => download(`${state.name}.mq5`, generateMql(), "text/plain"));
  window.addEventListener("resize", drawConnections);
}

function addEventFromForm(eventObj) {
  eventObj.preventDefault();
  const data = Object.fromEntries(new FormData(eventObj.currentTarget));
  snapshot();
  state.events.push(event(`e${Date.now()}`, data.name, data.time, data.currency, data.symbols, data.impact, data.before, data.after));
  eventObj.currentTarget.reset();
  commit("重大事件已添加");
}

function addRiskFromForm(eventObj) {
  eventObj.preventDefault();
  const data = Object.fromEntries(new FormData(eventObj.currentTarget));
  snapshot();
  state.riskRules.push(risk(`r${Date.now()}`, data.name, data.category, data.value, data.description, true));
  eventObj.currentTarget.reset();
  commit("风控规则已添加");
}

async function importEvents(eventObj) {
  const file = eventObj.target.files[0];
  if (!file) return;
  const text = await file.text();
  snapshot();
  try {
    const parsed = JSON.parse(text);
    state.events = Array.isArray(parsed) ? parsed : parsed.events;
  } catch {
    state.events = text.split(/\r?\n/).map((line, index) => {
      const [name, time, currency, symbols, impact = "高", before = 60, after = 60] = line.split(",").map((part) => part?.trim());
      if (!name || !time) return null;
      return event(`imp${index}${Date.now()}`, name, time, currency || "USD", symbols || state.symbol, impact, before, after);
    }).filter(Boolean);
  }
  commit("事件规则已导入");
}

async function importBacktest(eventObj) {
  const file = eventObj.target.files[0];
  if (!file) return;
  const text = await file.text();
  snapshot();
  parseBacktest(text, file.name);
  commit("回测报告已解析");
}

function undo() {
  if (!history.length) return showToast("没有可撤销的操作");
  future.push(JSON.stringify(state));
  state = JSON.parse(history.pop());
  commit("已撤销");
}

function redo() {
  if (!future.length) return showToast("没有可重做的操作");
  history.push(JSON.stringify(state));
  state = JSON.parse(future.pop());
  commit("已重做");
}

function currentNode() {
  return state.nodes.find((n) => n.id === state.selectedNode);
}

function findParam(key, fallback) {
  for (const n of state.nodes) if (n.params && n.params[key] !== undefined) return n.params[key];
  return fallback;
}

function findNodeParam(title, key, fallback) {
  const n = state.nodes.find((item) => item.title.includes(title));
  return n?.params?.[key] ?? fallback;
}

function parseValue(value) {
  if (value === "true") return true;
  if (value === "false") return false;
  const number = Number(value);
  return Number.isFinite(number) && value.trim() !== "" ? number : value;
}

function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${String(date.getMonth() + 1).padStart(2, "0")}月${String(date.getDate()).padStart(2, "0")}日 ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function eventCard(e) {
  return `<article class="event-card"><strong>${e.name}</strong><div class="event-meta"><span>${formatDateTime(e.time)}</span><span class="${["高", "极高"].includes(e.impact) ? "impact-high" : "impact-mid"}">${e.impact}影响</span><span>${e.symbols}</span></div></article>`;
}

function escapeAttr(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2400);
}

renderAll();
bindEvents();
