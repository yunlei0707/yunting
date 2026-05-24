const STORAGE_KEY = "ea-studio-fxdreema-cn-v2-templates";

const events = [
  { id: "init", label: "on Init", desc: "EA 加载时执行一次" },
  { id: "timer", label: "on Timer", desc: "按项目设置的定时周期执行" },
  { id: "tick", label: "on Tick", desc: "每个新 Tick 执行，EA 主交易逻辑通常放这里" },
  { id: "trade", label: "on Trade", desc: "交易事件发生时执行" },
  { id: "chart", label: "on Chart", desc: "图表鼠标、键盘和对象事件触发" },
  { id: "deinit", label: "on Deinit", desc: "EA 卸载时执行" },
];

const indicatorCatalog = [
  indicator("Accelerator Oscillator", "加速震荡指标 AC", { shift: 0, mode: "MAIN" }),
  indicator("Accumulation/Distribution", "累积/派发 A/D", { shift: 0, appliedVolume: "Tick volume" }),
  indicator("Alligator", "鳄鱼线 Alligator", { jawPeriod: 13, jawShift: 8, teethPeriod: 8, teethShift: 5, lipsPeriod: 5, lipsShift: 3, maMethod: "Smoothed", appliedPrice: "Median price" }),
  indicator("Average Directional Movement Index", "平均趋向指数 ADX", { period: 14, appliedPrice: "Close price", mode: "MAIN", shift: 0 }),
  indicator("Average True Range", "平均真实波幅 ATR", { period: 14, shift: 0 }),
  indicator("Awesome Oscillator", "动量震荡指标 AO", { shift: 0 }),
  indicator("Bears Power", "空头力量 Bears Power", { period: 13, appliedPrice: "Close price", shift: 0 }),
  indicator("Bollinger Bands", "布林带 Bollinger Bands", { period: 20, deviation: 2, bandsShift: 0, appliedPrice: "Close price", mode: "MAIN", shift: 0 }),
  indicator("Bulls Power", "多头力量 Bulls Power", { period: 13, appliedPrice: "Close price", shift: 0 }),
  indicator("Commodity Channel Index", "商品通道指数 CCI", { period: 14, appliedPrice: "Typical price", shift: 0 }),
  indicator("DeMarker", "DeMarker 指标", { period: 14, shift: 0 }),
  indicator("Envelopes", "包络线 Envelopes", { period: 14, maMethod: "Simple", maShift: 0, appliedPrice: "Close price", deviation: 0.1, mode: "MAIN", shift: 0 }),
  indicator("Force Index", "强力指数 Force Index", { period: 13, maMethod: "Simple", appliedPrice: "Close price", shift: 0 }),
  indicator("Fractals", "分形 Fractals", { mode: "UPPER", shift: 2 }),
  indicator("Gator indicator", "鳄鱼震荡 Gator", { jawPeriod: 13, jawShift: 8, teethPeriod: 8, teethShift: 5, lipsPeriod: 5, lipsShift: 3, maMethod: "Smoothed", appliedPrice: "Median price", mode: "UPPER", shift: 0 }),
  indicator("Heiken Ashi", "平均 K 线 Heiken Ashi", { mode: "Close", shift: 0 }),
  indicator("Ichimoku Kinko Hyo", "一目均衡表 Ichimoku", { tenkan: 9, kijun: 26, senkou: 52, mode: "Tenkan-sen", shift: 0 }),
  indicator("MACD", "MACD", { fastEMA: 12, slowEMA: 26, signalSMA: 9, appliedPrice: "Close price", mode: "MAIN", shift: 0 }),
  indicator("Market Facilitation Index by Bill Williams", "市场便利指数 BW MFI", { shift: 0 }),
  indicator("Momentum", "动量 Momentum", { period: 14, appliedPrice: "Close price", shift: 0 }),
  indicator("Money Flow Index", "资金流量指数 MFI", { period: 14, shift: 0 }),
  indicator("Moving Average", "移动平均线 MA", { period: 20, maShift: 0, maMethod: "Exponential", appliedPrice: "Close price", shift: 0 }),
  indicator("Moving Average of Oscillator", "OsMA", { fastEMA: 12, slowEMA: 26, signalSMA: 9, appliedPrice: "Close price", shift: 0 }),
  indicator("On Balance Volume", "能量潮 OBV", { appliedPrice: "Close price", shift: 0 }),
  indicator("Parabolic SAR", "抛物线 SAR", { step: 0.02, maximum: 0.2, shift: 0 }),
  indicator("Relative Strength Index", "相对强弱 RSI", { period: 14, appliedPrice: "Close price", shift: 0 }),
  indicator("Relative Vigor Index", "相对活力 RVI", { period: 10, mode: "MAIN", shift: 0 }),
  indicator("Standard Deviation", "标准差 StdDev", { period: 20, maShift: 0, maMethod: "Simple", appliedPrice: "Close price", shift: 0 }),
  indicator("Stochastic Oscillator", "随机指标 Stochastic", { kPeriod: 5, dPeriod: 3, slowing: 3, maMethod: "Simple", priceField: "Low/High", mode: "MAIN", shift: 0 }),
  indicator("Williams' Percent Range", "威廉指标 WPR", { period: 14, shift: 0 }),
  indicator("ZigZag", "之字转向 ZigZag", { depth: 12, deviation: 5, backstep: 3, shift: 0 }),
];

const categories = [
  group("Variables", "变量", "var", [
    block("Variable", "变量", "创建或读取变量", "variable", { name: "myVar", value: 0 }),
    block("Formula", "公式", "计算表达式", "formula", { expression: "Bid > Ask" }),
  ]),
  group("Condition & Formula", "条件与公式", "condition", [
    block("Condition", "条件", "比较两个值", "condition", { left: "Bid", operator: ">", right: "MA" }),
    block("AND / OR", "逻辑组合", "组合多个条件", "logic", { mode: "AND" }),
  ]),
  group("Conditions for Indicators", "MT4 指标条件", "indicator", indicatorCatalog.map((item) =>
    block(item.name, item.cn, "MT4 内置指标，可配置完整参数", "indicator", { indicator: item.name, ...item.params })
  )),
  group("Time Filters", "时间过滤", "time", [
    block("Once a day", "每天一次", "每天只允许通过一次", "time", { hour: 9, minute: 0 }),
    block("Time filter", "交易时段过滤", "限制交易时段", "time", { from: "09:00", to: "23:00" }),
    block("News filter", "重大事件过滤", "非农、CPI、FOMC 等事件禁开仓", "news", { before: 60, after: 90, impact: "高/极高" }),
  ]),
  group("Check Trades & Orders Count", "订单数量检查", "check", [
    block("No trade", "无持仓", "没有持仓时通过", "check", { group: "Any", symbol: "Current" }),
    block("No trade/order", "无持仓/挂单", "没有持仓和挂单时通过", "check", { symbol: "Current" }),
    block("Check trades count", "检查持仓数量", "按方向/品种检查订单数量", "check", { type: "Any", count: 0 }),
  ]),
  group("Check Trading Conditions", "交易条件检查", "check", [
    block("Check spread", "点差过滤", "点差超过阈值禁止下单", "risk", { maxSpread: 35 }),
    block("Check consecutive losses", "连续亏损检查", "连续亏损达到阈值暂停", "risk", { maxLosses: 4 }),
  ]),
  group("Buy / Sell", "买入/卖出", "trade", [
    block("Buy now", "立即买入", "发送 Buy 市价单", "trade", { direction: "BUY", lots: "Auto", stopLoss: 400, takeProfit: 1200 }),
    block("Sell now", "立即卖出", "发送 Sell 市价单", "trade", { direction: "SELL", lots: "Auto", stopLoss: 400, takeProfit: 1200 }),
    block("Buy pending order", "买入挂单", "创建 Buy Stop/Limit", "trade", { direction: "BUY_PENDING", distance: 200 }),
    block("Sell pending order", "卖出挂单", "创建 Sell Stop/Limit", "trade", { direction: "SELL_PENDING", distance: 200 }),
  ]),
  group("Bucket of Trades & Orders", "订单桶", "bucket", [
    block("Bucket of Trades", "持仓桶", "选择一组持仓", "bucket", { symbol: "Current", group: "Any" }),
    block("Bucket of Pending Orders", "挂单桶", "选择一组挂单", "bucket", { symbol: "Current" }),
  ]),
  group("Loop for Trades & Orders", "订单循环", "loop", [
    block("For each Trade", "遍历持仓", "逐个处理持仓", "loop", { target: "Trades" }),
    block("For each Pending Order", "遍历挂单", "逐个处理挂单", "loop", { target: "Pending Orders" }),
  ]),
  group("Trailing Stop / Break Even", "追踪止损/保本", "exit", [
    block("Break even", "保本", "盈利后移动止损到开仓价", "exit", { trigger: 300, lock: 20 }),
    block("Trailing stop", "追踪止损", "跟随价格移动止损", "exit", { start: 450, distance: 280 }),
  ]),
  group("Trading Actions", "交易动作", "action", [
    block("Close trades", "平仓", "关闭符合条件的持仓", "action", { target: "Selected trades" }),
    block("Delete pending orders", "删除挂单", "删除符合条件的挂单", "action", { target: "Selected orders" }),
    block("Modify stops", "修改止损止盈", "修改 SL/TP", "action", { stopLoss: 400, takeProfit: 1200 }),
  ]),
  group("Chart & Objects", "图表与对象", "chart", [
    block("Draw arrow", "绘制箭头", "在图表绘制买卖箭头", "chart", { color: "Lime", code: 233 }),
    block("Comment", "图表注释", "输出图表注释", "output", { text: "EA running" }),
  ]),
  group("Loop for Chart Objects", "图表对象循环", "loop", [
    block("For each Object", "遍历图表对象", "按名称/类型遍历对象", "loop", { objectType: "Any" }),
  ]),
  group("Output & Communication", "输出与通信", "output", [
    block("Alert message", "弹窗提醒", "MT4 Alert 输出", "output", { message: "Signal" }),
    block("Print log", "日志输出", "Print 到专家日志", "output", { message: "Debug" }),
    block("Phone notification", "手机推送", "SendNotification", "output", { message: "Signal" }),
  ]),
  group("Various Signals", "各种信号", "signal", [
    block("Candle pattern", "K线形态", "识别基础 K 线形态", "signal", { pattern: "Engulfing" }),
    block("Price breakout", "价格突破", "突破高低点", "signal", { bars: 20 }),
  ]),
  group("Controlling Blocks", "控制模块", "control", [
    block("Pass", "通过", "无条件通过", "control", {}),
    block("Stop", "停止", "停止当前路径", "control", {}),
    block("Delay", "延迟", "等待指定秒数", "control", { seconds: 10 }),
  ]),
  group("Flags", "标记", "flag", [
    block("Set flag", "设置标记", "设置布尔标记", "flag", { name: "flag1", value: true }),
    block("Check flag", "检查标记", "读取布尔标记", "flag", { name: "flag1" }),
  ]),
  group("Counters", "计数器", "counter", [
    block("Counter add", "计数增加", "计数器 +1", "counter", { name: "counter1" }),
    block("Counter check", "检查计数", "比较计数器", "counter", { name: "counter1", operator: ">=", value: 3 }),
  ]),
  group("More...", "更多", "more", [
    block("Terminate", "终止 EA", "停止本次执行", "control", {}),
    block("If Demo account", "模拟账户判断", "检测模拟账户", "check", {}),
    block("If Real account", "真实账户判断", "检测真实账户", "check", {}),
  ]),
];

function indicator(name, cn, params) {
  return { name, cn, params };
}

function group(title, cn, color, items) {
  return { title, cn, color, items };
}

function block(title, cn, desc, type, params) {
  return { title, cn, desc, type, params };
}

function createNode(source, x, y) {
  return {
    id: `b${Date.now()}${Math.floor(Math.random() * 999)}`,
    title: source.cn || source.title,
    englishTitle: source.title,
    desc: source.desc,
    type: source.type,
    color: colorFor(source.type),
    x,
    y,
    enabled: true,
    params: structuredClone(source.params || {}),
  };
}

const starterNodes = [
  createNode(block("No trade", "无持仓", "没有持仓时通过", "check", { symbol: "Current" }), 120, 70),
  createNode(block("News filter", "重大事件过滤", "非农/CPI/FOMC 前后禁止开仓", "news", { before: 60, after: 90, impact: "高/极高" }), 340, 70),
  createNode(block("Moving Average", "短期 MA", "移动平均线", "indicator", { indicator: "Moving Average", period: 20, maShift: 0, maMethod: "Exponential", appliedPrice: "Close price", shift: 0 }), 220, 230),
  createNode(block("Moving Average", "长期 MA", "移动平均线", "indicator", { indicator: "Moving Average", period: 60, maShift: 0, maMethod: "Exponential", appliedPrice: "Close price", shift: 0 }), 460, 230),
  createNode(block("Buy now", "MA 金叉多单", "发送 Buy 市价单", "trade", { direction: "BUY", lots: "Auto", stopLoss: 400, takeProfit: 1200 }), 225, 390),
  createNode(block("Sell now", "MA 死叉空单", "发送 Sell 市价单", "trade", { direction: "SELL", lots: "Auto", stopLoss: 400, takeProfit: 1200 }), 500, 390),
];

const defaultState = {
  projectName: "未命名 EA",
  activeEvent: "tick",
  mode: "System",
  selectedId: starterNodes[1].id,
  nodes: starterNodes,
  connections: [
    [starterNodes[0].id, starterNodes[1].id],
    [starterNodes[1].id, starterNodes[2].id],
    [starterNodes[1].id, starterNodes[3].id],
    [starterNodes[2].id, starterNodes[4].id],
    [starterNodes[3].id, starterNodes[4].id],
    [starterNodes[2].id, starterNodes[5].id],
    [starterNodes[3].id, starterNodes[5].id],
  ],
  constants: [],
  variables: [],
  history: ["创建默认项目", "加入重大事件过滤", "加入 MA 金叉/死叉模板"],
  projectOptions: {
    magicNumber: 6971,
    timerSeconds: 60,
    maxSpread: 35,
    riskPercent: 1,
  },
};

const strategyTemplates = [
  {
    id: "single-ma",
    name: "经典单均线",
    desc: "价格上穿 MA → 开多；价格下穿 MA → 平多。",
    projectName: "经典单均线 EA",
    nodes: [
      nodeSpec("No trade", "无持仓检查", "没有持仓时才允许开新仓", "check", { symbol: "Current" }, 100, 80),
      nodeSpec("Moving Average", "MA14", "单均线，周期 14", "indicator", { indicator: "Moving Average", period: 14, maShift: 0, maMethod: "Exponential", appliedPrice: "Close price", shift: 0 }, 310, 80),
      nodeSpec("Condition", "价格上穿 MA", "Close cross above MA14", "condition", { left: "Close", operator: "cross above", right: "MA14" }, 215, 230),
      nodeSpec("Buy now", "开多", "价格上穿 MA 后开多", "trade", { direction: "BUY", lots: "Auto", stopLoss: 300, takeProfit: 900 }, 215, 380),
      nodeSpec("Condition", "价格下穿 MA", "Close cross below MA14", "condition", { left: "Close", operator: "cross below", right: "MA14" }, 505, 230),
      nodeSpec("Close trades", "平多", "价格下穿 MA 后平多仓", "action", { target: "BUY trades" }, 505, 380),
    ],
    connections: [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5]],
  },
  {
    id: "double-ma",
    name: "双均线金死叉",
    desc: "快MA上穿慢MA → 开多；快MA下穿慢MA → 开空。",
    projectName: "双均线金死叉 EA",
    nodes: [
      nodeSpec("No trade", "无持仓检查", "避免重复开仓", "check", { symbol: "Current" }, 90, 80),
      nodeSpec("Moving Average", "快 MA14", "快均线，周期 14", "indicator", { indicator: "Moving Average", period: 14, maShift: 0, maMethod: "Exponential", appliedPrice: "Close price", shift: 0 }, 290, 80),
      nodeSpec("Moving Average", "慢 MA50", "慢均线，周期 50", "indicator", { indicator: "Moving Average", period: 50, maShift: 0, maMethod: "Exponential", appliedPrice: "Close price", shift: 0 }, 500, 80),
      nodeSpec("Condition", "快线上穿慢线", "MA14 cross above MA50", "condition", { left: "MA14", operator: "cross above", right: "MA50" }, 240, 250),
      nodeSpec("Buy now", "开多", "金叉开多", "trade", { direction: "BUY", lots: "Auto", stopLoss: 350, takeProfit: 1050 }, 240, 405),
      nodeSpec("Condition", "快线下穿慢线", "MA14 cross below MA50", "condition", { left: "MA14", operator: "cross below", right: "MA50" }, 550, 250),
      nodeSpec("Sell now", "开空", "死叉开空", "trade", { direction: "SELL", lots: "Auto", stopLoss: 350, takeProfit: 1050 }, 550, 405),
    ],
    connections: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [1, 5], [2, 5], [5, 6]],
  },
  {
    id: "rsi-overbought-oversold",
    name: "RSI 超买超卖",
    desc: "RSI < 30 → 开多；RSI > 70 → 开空；RSI 回到50 → 平仓。",
    projectName: "RSI 超买超卖 EA",
    nodes: [
      nodeSpec("Relative Strength Index", "RSI14", "RSI 周期 14", "indicator", { indicator: "Relative Strength Index", period: 14, appliedPrice: "Close price", shift: 0 }, 120, 80),
      nodeSpec("Condition", "RSI < 30", "超卖开多", "condition", { left: "RSI14", operator: "<", right: 30 }, 95, 230),
      nodeSpec("Buy now", "开多", "RSI 低于 30 开多", "trade", { direction: "BUY", lots: "Auto", stopLoss: 300, takeProfit: 800 }, 95, 380),
      nodeSpec("Condition", "RSI > 70", "超买开空", "condition", { left: "RSI14", operator: ">", right: 70 }, 365, 230),
      nodeSpec("Sell now", "开空", "RSI 高于 70 开空", "trade", { direction: "SELL", lots: "Auto", stopLoss: 300, takeProfit: 800 }, 365, 380),
      nodeSpec("Condition", "RSI 回到 50", "RSI cross 50", "condition", { left: "RSI14", operator: "cross", right: 50 }, 635, 230),
      nodeSpec("Close trades", "平仓", "RSI 回到 50 后平仓", "action", { target: "All trades" }, 635, 380),
    ],
    connections: [[0, 1], [1, 2], [0, 3], [3, 4], [0, 5], [5, 6]],
  },
  {
    id: "bollinger-breakout",
    name: "布林带突破",
    desc: "收盘价突破上轨 → 开多；突破下轨 → 开空；回穿中轨 → 平仓。",
    projectName: "布林带突破 EA",
    nodes: [
      nodeSpec("Bollinger Bands", "布林带 20,2", "周期 20，偏差 2", "indicator", { indicator: "Bollinger Bands", period: 20, deviation: 2, bandsShift: 0, appliedPrice: "Close price", mode: "MAIN", shift: 0 }, 130, 80),
      nodeSpec("Condition", "突破上轨", "Close > Upper Band", "condition", { left: "Close", operator: ">", right: "Bollinger Upper" }, 95, 230),
      nodeSpec("Buy now", "开多", "收盘价突破上轨开多", "trade", { direction: "BUY", lots: "Auto", stopLoss: 400, takeProfit: 1200 }, 95, 380),
      nodeSpec("Condition", "突破下轨", "Close < Lower Band", "condition", { left: "Close", operator: "<", right: "Bollinger Lower" }, 365, 230),
      nodeSpec("Sell now", "开空", "收盘价突破下轨开空", "trade", { direction: "SELL", lots: "Auto", stopLoss: 400, takeProfit: 1200 }, 365, 380),
      nodeSpec("Condition", "回穿中轨", "Close cross middle band", "condition", { left: "Close", operator: "cross", right: "Bollinger Middle" }, 635, 230),
      nodeSpec("Close trades", "平仓", "价格回穿中轨后平仓", "action", { target: "All trades" }, 635, 380),
    ],
    connections: [[0, 1], [1, 2], [0, 3], [3, 4], [0, 5], [5, 6]],
  },
  {
    id: "macd-zero-cross",
    name: "MACD 零轴金叉",
    desc: "MACD金叉且主线>0 → 开多；死叉且主线<0 → 开空。",
    projectName: "MACD 零轴金叉 EA",
    nodes: [
      nodeSpec("MACD", "MACD 12,26,9", "标准 MACD 参数", "indicator", { indicator: "MACD", fastEMA: 12, slowEMA: 26, signalSMA: 9, appliedPrice: "Close price", mode: "MAIN", shift: 0 }, 170, 80),
      nodeSpec("Condition", "MACD 金叉且主线>0", "MACD main cross above signal and main > 0", "condition", { left: "MACD main", operator: "cross above", right: "Signal; main > 0" }, 140, 250),
      nodeSpec("Buy now", "开多", "零轴上方金叉开多", "trade", { direction: "BUY", lots: "Auto", stopLoss: 350, takeProfit: 1000 }, 140, 405),
      nodeSpec("Condition", "MACD 死叉且主线<0", "MACD main cross below signal and main < 0", "condition", { left: "MACD main", operator: "cross below", right: "Signal; main < 0" }, 500, 250),
      nodeSpec("Sell now", "开空", "零轴下方死叉开空", "trade", { direction: "SELL", lots: "Auto", stopLoss: 350, takeProfit: 1000 }, 500, 405),
    ],
    connections: [[0, 1], [1, 2], [0, 3], [3, 4]],
  },
  {
    id: "triple-screen-simple",
    name: "三重滤网（简化版）",
    desc: "H1趋势过滤（MA方向）→ M5入场（RSI<30做多或>70做空）。",
    projectName: "三重滤网简化 EA",
    nodes: [
      nodeSpec("Moving Average", "H1 MA50", "H1 趋势快线", "indicator", { indicator: "Moving Average", period: 50, timeframe: "H1", maShift: 0, maMethod: "Exponential", appliedPrice: "Close price", shift: 0 }, 90, 80),
      nodeSpec("Moving Average", "H1 MA200", "H1 趋势慢线", "indicator", { indicator: "Moving Average", period: 200, timeframe: "H1", maShift: 0, maMethod: "Exponential", appliedPrice: "Close price", shift: 0 }, 315, 80),
      nodeSpec("Relative Strength Index", "M5 RSI14", "M5 入场 RSI", "indicator", { indicator: "Relative Strength Index", period: 14, timeframe: "M5", appliedPrice: "Close price", shift: 0 }, 540, 80),
      nodeSpec("Condition", "H1 多头 + M5 RSI<30", "H1 MA50 > MA200 and M5 RSI < 30", "condition", { left: "H1 MA50 > H1 MA200", operator: "AND", right: "M5 RSI14 < 30" }, 200, 265),
      nodeSpec("Buy now", "开多", "大周期多头，小周期回调做多", "trade", { direction: "BUY", lots: "Auto", stopLoss: 400, takeProfit: 1200 }, 200, 420),
      nodeSpec("Condition", "H1 空头 + M5 RSI>70", "H1 MA50 < MA200 and M5 RSI > 70", "condition", { left: "H1 MA50 < H1 MA200", operator: "AND", right: "M5 RSI14 > 70" }, 550, 265),
      nodeSpec("Sell now", "开空", "大周期空头，小周期反弹做空", "trade", { direction: "SELL", lots: "Auto", stopLoss: 400, takeProfit: 1200 }, 550, 420),
    ],
    connections: [[0, 3], [1, 3], [2, 3], [3, 4], [0, 5], [1, 5], [2, 5], [5, 6]],
  },
  {
    id: "rsi-bbands-adx-reversal",
    name: "RSI+布林带+ADX 反转",
    desc: "RSI<30，价格低于下轨，ADX>20 → 开多；反向对称。",
    projectName: "RSI 布林带 ADX 反转 EA",
    nodes: [
      nodeSpec("Relative Strength Index", "RSI14", "RSI 周期 14", "indicator", { indicator: "Relative Strength Index", period: 14, appliedPrice: "Close price", shift: 0 }, 80, 80),
      nodeSpec("Bollinger Bands", "布林带 20,2", "周期 20，偏差 2", "indicator", { indicator: "Bollinger Bands", period: 20, deviation: 2, bandsShift: 0, appliedPrice: "Close price", mode: "MAIN", shift: 0 }, 310, 80),
      nodeSpec("Average Directional Movement Index", "ADX14", "ADX 周期 14，阈值 20", "indicator", { indicator: "Average Directional Movement Index", period: 14, appliedPrice: "Close price", mode: "MAIN", shift: 0 }, 540, 80),
      nodeSpec("Condition", "低位反转做多", "RSI<30 AND Close<Lower Band AND ADX>20", "condition", { left: "RSI14 < 30; Close < Lower Band", operator: "AND", right: "ADX14 > 20" }, 210, 270),
      nodeSpec("Buy now", "开多", "超卖且跌破下轨后做反转多", "trade", { direction: "BUY", lots: "Auto", stopLoss: 350, takeProfit: 900 }, 210, 425),
      nodeSpec("Condition", "高位反转做空", "RSI>70 AND Close>Upper Band AND ADX>20", "condition", { left: "RSI14 > 70; Close > Upper Band", operator: "AND", right: "ADX14 > 20" }, 560, 270),
      nodeSpec("Sell now", "开空", "超买且突破上轨后做反转空", "trade", { direction: "SELL", lots: "Auto", stopLoss: 350, takeProfit: 900 }, 560, 425),
    ],
    connections: [[0, 3], [1, 3], [2, 3], [3, 4], [0, 5], [1, 5], [2, 5], [5, 6]],
  },
];

function nodeSpec(title, cn, desc, type, params, x, y) {
  return { title, cn, desc, type, params, x, y };
}

let state = loadState();
let contextTarget = null;

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return structuredClone(defaultState);
    const parsed = JSON.parse(saved);
    if (!parsed.nodes || !parsed.connections) return structuredClone(defaultState);
    return parsed;
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState(message) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (message) addHistory(message);
  render();
}

function addHistory(message) {
  state.history.unshift(`${new Date().toLocaleTimeString()} ${message}`);
  state.history = state.history.slice(0, 30);
}

function render() {
  document.getElementById("app").innerHTML = `
    <div class="fx-shell">
      <header class="fx-top">
        <nav class="fx-menu">
          ${menu("项目", ["载入项目", "新建项目", "导入项目 (.xml .mq4 .mq5)", "创建共享副本"])}
          ${menu("我的指标", ["管理自定义指标", "添加 Custom Indicator"])}
          ${menu("个人", ["个人设置", "购买", "退出"])}
          ${menu("选项", ["当前项目选项", "项目说明", "模块 ID 规范化", "全局选项"])}
          ${menu("帮助", ["使用说明", "社区论坛", "更新历史"])}
        </nav>
        <div class="fx-links">Instructions&nbsp;&nbsp; How To&nbsp;&nbsp; Forum</div>
        <div class="fx-plan">Free Limited</div>
      </header>

      <section class="fx-export">
        <button id="exportMq4">.mq4</button>
        <button id="exportEx4">.ex4</button>
      </section>

      <section class="fx-events">
        <span>Events</span>
        ${events.map((evt) => `<button class="fx-event ${evt.id === state.activeEvent ? "active" : ""}" title="${evt.desc}" data-event="${evt.id}">${evt.label}${evt.id === "tick" ? `<em>${state.nodes.length}</em>` : ""}</button>`).join("")}
      </section>

      <aside class="fx-history">
        <strong>History</strong>
        <div>${state.history.map((item) => `<p>${item}</p>`).join("")}</div>
      </aside>

      <main class="fx-main">
        <aside class="fx-library">
          <h1>${state.projectName}</h1>
          <button class="cv-row" id="editConstants">${state.constants.length} Constants (Inputs)</button>
          <button class="cv-row variables" id="editVariables">${state.variables.length} Variables</button>
          <section class="template-panel">
            <strong>预设策略模板</strong>
            <div class="template-list">
              ${strategyTemplates.map((template) => `
                <button type="button" class="template-item" data-template="${template.id}">
                  ${template.name}
                  <small>${template.desc}</small>
                </button>
              `).join("")}
            </div>
          </section>
          <div class="mode-row">
            <button class="${state.mode === "System" ? "on" : ""}" data-mode="System">System</button>
            <button class="${state.mode === "Custom" ? "on" : ""}" data-mode="Custom">Custom</button>
          </div>
          <label class="search-row">Search:<input id="blockSearch" placeholder="搜索指标/模块" /></label>
          <div class="category-list" id="categoryList"></div>
        </aside>

        <section class="fx-canvas" id="canvas">
          <canvas id="lineCanvas"></canvas>
          ${state.nodes.map(renderNode).join("")}
          <div id="contextMenu" class="context-menu hidden">
            <button data-action="rename">Edit Title</button>
            <button data-action="toggle">On/Off</button>
            <button data-action="copy">Copy</button>
            <button data-action="delete">Delete</button>
            <button data-action="info">Information</button>
            <button data-action="cancel">Cancel</button>
          </div>
        </section>

        <aside class="fx-properties" id="properties"></aside>
      </main>
    </div>
    <div id="modalHost"></div>
    <div id="toast" class="fx-toast"></div>
  `;
  renderCategories();
  renderProperties();
  bind();
  requestAnimationFrame(drawLines);
}

function menu(title, items) {
  return `<div class="fx-menu-item"><button>${title}</button><div class="fx-dropdown">${items.map((item) => `<button data-menu="${item}">${item}</button>`).join("")}</div></div>`;
}

function renderNode(node) {
  return `<button class="fx-node ${node.color} ${node.id === state.selectedId ? "selected" : ""} ${node.enabled ? "" : "off"}" data-node="${node.id}" style="left:${node.x}px;top:${node.y}px">
    <span class="node-id">${node.id.replace(/\D/g, "").slice(-2)}</span>
    <strong>${node.title}</strong>
    <small>${node.type === "indicator" ? node.params.indicator || node.englishTitle : node.desc}</small>
  </button>`;
}

function renderCategories(filter = "") {
  const keyword = filter.trim().toLowerCase();
  const html = categories.map((cat) => {
    const items = cat.items.filter((item) => `${item.title} ${item.cn} ${item.desc}`.toLowerCase().includes(keyword));
    if (!items.length) return "";
    return `<section class="fx-cat ${cat.color}">
      <button class="cat-title">${cat.cn}</button>
      <div class="cat-items">
        ${items.map((item, index) => `<button class="lib-block" draggable="true" data-cat="${cat.title}" data-index="${cat.items.indexOf(item)}">
          ${item.cn}<small>${item.title}</small>
        </button>`).join("")}
      </div>
    </section>`;
  }).join("");
  document.getElementById("categoryList").innerHTML = html;
  document.querySelectorAll(".lib-block").forEach((el) => {
    el.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("application/json", JSON.stringify(getBlock(el)));
    });
    el.addEventListener("click", () => addBlock(getBlock(el), 160 + state.nodes.length * 18, 110 + state.nodes.length * 12));
  });
}

function getBlock(el) {
  const cat = categories.find((item) => item.title === el.dataset.cat);
  return cat.items[Number(el.dataset.index)];
}

function renderProperties() {
  const node = currentNode();
  const panel = document.getElementById("properties");
  if (!node) {
    panel.innerHTML = `<h2>属性</h2><p>请选择一个模块，或从左侧拖拽模块到画布。</p>`;
    return;
  }
  const indicatorInfo = node.type === "indicator" ? indicatorCatalog.find((item) => item.name === node.params.indicator) : null;
  panel.innerHTML = `
    <h2>${node.title}</h2>
    <p>${node.desc}</p>
    <label>标题<input id="propTitle" value="${escapeAttr(node.title)}"></label>
    ${node.type === "indicator" ? indicatorSelector(node) : ""}
    <div class="param-list">
      ${Object.entries(node.params).map(([key, value]) => paramField(key, value)).join("")}
    </div>
    <div class="prop-actions">
      <button id="saveParams">Update</button>
      <button id="deleteNode">Delete</button>
      <button id="copyNode">Copy</button>
    </div>
    ${indicatorInfo ? `<div class="help-box">MT4 指标：${indicatorInfo.cn}<br>英文名称：${indicatorInfo.name}<br>拖拽到画布后可在这里修改所有参数。</div>` : ""}
  `;
  document.getElementById("saveParams").addEventListener("click", saveParams);
  document.getElementById("deleteNode").addEventListener("click", () => deleteNode(node.id));
  document.getElementById("copyNode").addEventListener("click", () => copyNode(node.id));
  const selector = document.getElementById("indicatorSelect");
  if (selector) selector.addEventListener("change", () => changeIndicator(selector.value));
}

function indicatorSelector(node) {
  return `<label>MT4 指标<select id="indicatorSelect">${indicatorCatalog.map((item) => `<option value="${item.name}" ${item.name === node.params.indicator ? "selected" : ""}>${item.cn} / ${item.name}</option>`).join("")}</select></label>`;
}

function paramField(key, value) {
  if (key === "indicator") return "";
  const options = optionList(key);
  if (options) {
    return `<label>${labelFor(key)}<select data-param="${key}">${options.map((item) => `<option value="${item}" ${String(value) === item ? "selected" : ""}>${item}</option>`).join("")}</select></label>`;
  }
  const type = typeof value === "number" ? "number" : "text";
  return `<label>${labelFor(key)}<input type="${type}" data-param="${key}" value="${escapeAttr(value)}"></label>`;
}

function bind() {
  document.querySelectorAll("[data-event]").forEach((btn) => btn.addEventListener("click", () => {
    state.activeEvent = btn.dataset.event;
    saveState(`切换事件：${btn.textContent.trim()}`);
  }));
  document.querySelectorAll("[data-mode]").forEach((btn) => btn.addEventListener("click", () => {
    state.mode = btn.dataset.mode;
    saveState(`切换块库：${state.mode}`);
  }));
  document.querySelectorAll("[data-template]").forEach((btn) => btn.addEventListener("click", () => applyStrategyTemplate(btn.dataset.template)));
  document.getElementById("blockSearch").addEventListener("input", (event) => renderCategories(event.target.value));
  const canvas = document.getElementById("canvas");
  canvas.addEventListener("dragover", (event) => event.preventDefault());
  canvas.addEventListener("drop", (event) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("application/json"));
    const rect = canvas.getBoundingClientRect();
    addBlock(data, event.clientX - rect.left, event.clientY - rect.top);
  });
  document.querySelectorAll(".fx-node").forEach((el) => {
    el.addEventListener("click", () => {
      state.selectedId = el.dataset.node;
      saveState();
    });
    el.addEventListener("dblclick", () => openBlockDialog(el.dataset.node));
    el.addEventListener("contextmenu", (event) => showContext(event, el.dataset.node));
    makeNodeDraggable(el);
  });
  document.querySelectorAll("[data-menu]").forEach((btn) => btn.addEventListener("click", () => handleMenu(btn.dataset.menu)));
  document.getElementById("exportMq4").addEventListener("click", () => download(`${state.projectName}.mq4`, generateMq4(), "text/plain"));
  document.getElementById("exportEx4").addEventListener("click", () => toast(".ex4 需要 MetaTrader 编译环境，已为你生成 .mq4 源码。"));
  document.getElementById("editConstants").addEventListener("click", () => openListDialog("constants", "Constants (Inputs)"));
  document.getElementById("editVariables").addEventListener("click", () => openListDialog("variables", "Variables"));
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".context-menu")) document.getElementById("contextMenu")?.classList.add("hidden");
  }, { once: true });
}

function addBlock(source, x, y) {
  const node = createNode(source, Math.max(20, x), Math.max(20, y));
  const selected = currentNode();
  state.nodes.push(node);
  if (selected) state.connections.push([selected.id, node.id]);
  state.selectedId = node.id;
  saveState(`添加模块：${node.title}`);
}

function currentNode() {
  return state.nodes.find((node) => node.id === state.selectedId);
}

function saveParams() {
  const node = currentNode();
  if (!node) return;
  node.title = document.getElementById("propTitle").value || node.title;
  document.querySelectorAll("[data-param]").forEach((input) => {
    node.params[input.dataset.param] = parseValue(input.value);
  });
  saveState(`更新参数：${node.title}`);
}

function changeIndicator(name) {
  const node = currentNode();
  const indicatorInfo = indicatorCatalog.find((item) => item.name === name);
  node.params = { indicator: indicatorInfo.name, ...structuredClone(indicatorInfo.params) };
  node.englishTitle = indicatorInfo.name;
  node.title = indicatorInfo.cn;
  saveState(`切换指标：${indicatorInfo.cn}`);
}

function copyNode(id) {
  const original = state.nodes.find((node) => node.id === id);
  const copy = structuredClone(original);
  copy.id = `b${Date.now()}`;
  copy.x += 35;
  copy.y += 35;
  copy.title = `${copy.title} 副本`;
  state.nodes.push(copy);
  state.connections.push([original.id, copy.id]);
  state.selectedId = copy.id;
  saveState(`复制模块：${original.title}`);
}

function deleteNode(id) {
  state.nodes = state.nodes.filter((node) => node.id !== id);
  state.connections = state.connections.filter(([from, to]) => from !== id && to !== id);
  state.selectedId = state.nodes[0]?.id || null;
  saveState("删除模块");
}

function makeNodeDraggable(el) {
  let start = null;
  el.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    const node = state.nodes.find((item) => item.id === el.dataset.node);
    start = { x: node.x, y: node.y, px: event.clientX, py: event.clientY };
    el.setPointerCapture(event.pointerId);
  });
  el.addEventListener("pointermove", (event) => {
    if (!start) return;
    const node = state.nodes.find((item) => item.id === el.dataset.node);
    node.x = Math.max(0, start.x + event.clientX - start.px);
    node.y = Math.max(0, start.y + event.clientY - start.py);
    el.style.left = `${node.x}px`;
    el.style.top = `${node.y}px`;
    drawLines();
  });
  el.addEventListener("pointerup", () => {
    if (!start) return;
    start = null;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  });
}

function drawLines() {
  const canvas = document.getElementById("lineCanvas");
  const area = document.getElementById("canvas");
  if (!canvas || !area) return;
  canvas.width = area.clientWidth;
  canvas.height = area.clientHeight;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#f28c5c";
  ctx.fillStyle = "#f28c5c";
  const lookup = Object.fromEntries(state.nodes.map((node) => [node.id, node]));
  state.connections.forEach(([from, to]) => {
    const a = lookup[from];
    const b = lookup[to];
    if (!a || !b) return;
    const x1 = a.x + 150;
    const y1 = a.y + 32;
    const x2 = b.x;
    const y2 = b.y + 32;
    const mid = x1 + (x2 - x1) / 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(mid, y1, mid, y2, x2, y2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x2, y2, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function showContext(event, id) {
  event.preventDefault();
  contextTarget = id;
  const menu = document.getElementById("contextMenu");
  menu.style.left = `${event.offsetX}px`;
  menu.style.top = `${event.offsetY}px`;
  menu.classList.remove("hidden");
  menu.querySelectorAll("button").forEach((btn) => btn.onclick = () => handleContext(btn.dataset.action));
}

function handleContext(action) {
  const node = state.nodes.find((item) => item.id === contextTarget);
  if (!node) return;
  if (action === "rename") {
    const title = prompt("输入新的模块标题", node.title);
    if (title) node.title = title;
  }
  if (action === "toggle") node.enabled = !node.enabled;
  if (action === "copy") return copyNode(node.id);
  if (action === "delete") return deleteNode(node.id);
  if (action === "info") toast(`${node.title}: ${node.desc}`);
  saveState(`右键操作：${action}`);
}

function openBlockDialog(id) {
  state.selectedId = id;
  render();
  document.getElementById("modalHost").innerHTML = `<div class="fx-modal"><div class="modal-card"><button class="modal-close">×</button><h2>编辑模块参数</h2><div id="modalProps"></div></div></div>`;
  document.getElementById("modalProps").appendChild(document.getElementById("properties").cloneNode(true));
  document.querySelector(".modal-close").onclick = () => document.getElementById("modalHost").innerHTML = "";
}

function openListDialog(key, title) {
  const list = state[key];
  document.getElementById("modalHost").innerHTML = `<div class="fx-modal"><div class="modal-card"><button class="modal-close">×</button><h2>${title}</h2><div class="list-editor">${list.map((item, index) => `<label>名称<input data-list="${index}" value="${escapeAttr(item.name || "")}"></label><label>值<input data-value="${index}" value="${escapeAttr(item.value || "")}"></label>`).join("")}<button id="addListItem">新增</button></div></div></div>`;
  document.querySelector(".modal-close").onclick = () => document.getElementById("modalHost").innerHTML = "";
  document.getElementById("addListItem").onclick = () => {
    state[key].push({ name: `${key}${list.length + 1}`, value: 0 });
    saveState(`新增 ${title}`);
    openListDialog(key, title);
  };
}

function applyStrategyTemplate(templateId) {
  const template = strategyTemplates.find((item) => item.id === templateId);
  if (!template) return;
  const nodes = template.nodes.map((item) => createNode(block(item.title, item.cn, item.desc, item.type, item.params), item.x, item.y));
  state.projectName = template.projectName;
  state.nodes = nodes;
  state.connections = template.connections
    .map(([from, to]) => [nodes[from]?.id, nodes[to]?.id])
    .filter(([from, to]) => from && to);
  state.selectedId = nodes[0]?.id || null;
  saveState(`套用模板：${template.name}`);
  toast(`已生成模板：${template.name}`);
}

function handleMenu(item) {
  if (item.includes("新建项目")) {
    if (confirm("新建项目会清空当前画布，是否继续？")) {
      state = structuredClone(defaultState);
      saveState("新建项目");
    }
  } else if (item.includes("当前项目选项")) {
    openOptions();
  } else if (item.includes("项目说明")) {
    toast("项目说明：中文版 MT4 EA 可视化构建器，兼容 fxDreema 工作流。");
  } else {
    toast(`${item}：演示版已保留入口。`);
  }
}

function openOptions() {
  const o = state.projectOptions;
  document.getElementById("modalHost").innerHTML = `<div class="fx-modal"><div class="modal-card"><button class="modal-close">×</button><h2>当前项目选项</h2>
    <label>Magic Number<input id="optMagic" type="number" value="${o.magicNumber}"></label>
    <label>Timer 周期（秒）<input id="optTimer" type="number" value="${o.timerSeconds}"></label>
    <label>最大点差 points<input id="optSpread" type="number" value="${o.maxSpread}"></label>
    <label>单笔风险 %<input id="optRisk" type="number" value="${o.riskPercent}"></label>
    <button id="saveOptions">Update</button>
  </div></div>`;
  document.querySelector(".modal-close").onclick = () => document.getElementById("modalHost").innerHTML = "";
  document.getElementById("saveOptions").onclick = () => {
    state.projectOptions = {
      magicNumber: Number(document.getElementById("optMagic").value),
      timerSeconds: Number(document.getElementById("optTimer").value),
      maxSpread: Number(document.getElementById("optSpread").value),
      riskPercent: Number(document.getElementById("optRisk").value),
    };
    document.getElementById("modalHost").innerHTML = "";
    saveState("更新项目选项");
  };
}

function generateMq4() {
  const indicatorLines = state.nodes.filter((node) => node.type === "indicator").map((node) => indicatorCode(node)).join("\n");
  return `// ${state.projectName}
// 外汇策略工坊 - MT4 EA 可视化构建器生成
#property strict

input int MagicNumber = ${state.projectOptions.magicNumber};
input double RiskPercent = ${state.projectOptions.riskPercent};
input int MaxSpreadPoints = ${state.projectOptions.maxSpread};

bool NewsBlocked() {
  // 非农、CPI、FOMC 等重大事件窗口可在平台中维护
  return false;
}

void OnTick() {
  if (MarketInfo(Symbol(), MODE_SPREAD) > MaxSpreadPoints) return;
  if (NewsBlocked()) return;

${indicatorLines || "  // 从左侧拖拽 MT4 指标到画布后，这里会生成指标调用。"}
}`;
}

function indicatorCode(node) {
  const p = node.params;
  if (p.indicator === "Moving Average") return `  double ${safeName(node.title)} = iMA(Symbol(), 0, ${p.period}, ${p.maShift}, MODE_EMA, PRICE_CLOSE, ${p.shift});`;
  if (p.indicator === "Relative Strength Index") return `  double ${safeName(node.title)} = iRSI(Symbol(), 0, ${p.period}, PRICE_CLOSE, ${p.shift});`;
  if (p.indicator === "MACD") return `  double ${safeName(node.title)} = iMACD(Symbol(), 0, ${p.fastEMA}, ${p.slowEMA}, ${p.signalSMA}, PRICE_CLOSE, MODE_MAIN, ${p.shift});`;
  if (p.indicator === "Bollinger Bands") return `  double ${safeName(node.title)} = iBands(Symbol(), 0, ${p.period}, ${p.deviation}, ${p.bandsShift}, PRICE_CLOSE, MODE_MAIN, ${p.shift});`;
  return `  // ${node.title}: ${p.indicator} 参数 ${JSON.stringify(p)}`;
}

function colorFor(type) {
  return {
    indicator: "purple",
    trade: "green",
    action: "blue",
    condition: "amber",
    news: "amber",
    risk: "red",
    exit: "blue",
    check: "blue",
    time: "lime",
  }[type] || "gray";
}

function optionList(key) {
  const lists = {
    maMethod: ["Simple", "Exponential", "Smoothed", "Weighted"],
    appliedPrice: ["Close price", "Open price", "High price", "Low price", "Median price", "Typical price", "Weighted price"],
    mode: ["MAIN", "SIGNAL", "UPPER", "LOWER", "Tenkan-sen", "Kijun-sen", "Senkou Span A", "Senkou Span B", "Chikou Span"],
    direction: ["BUY", "SELL", "BUY_PENDING", "SELL_PENDING"],
    operator: [">", "<", ">=", "<=", "==", "!=", "cross above", "cross below"],
    priceField: ["Low/High", "Close/Close"],
    appliedVolume: ["Tick volume", "Real volume"],
  };
  return lists[key];
}

function labelFor(key) {
  return {
    period: "周期",
    maShift: "MA 位移",
    maMethod: "MA 方法",
    appliedPrice: "应用价格",
    shift: "K线位移",
    fastEMA: "快线 EMA",
    slowEMA: "慢线 EMA",
    signalSMA: "信号 SMA",
    stopLoss: "止损 points",
    takeProfit: "止盈 points",
    before: "事件前禁开仓分钟",
    after: "事件后禁开仓分钟",
    maxSpread: "最大点差 points",
  }[key] || key;
}

function parseValue(value) {
  const n = Number(value);
  return value !== "" && Number.isFinite(n) ? n : value;
}

function safeName(name) {
  return name.replace(/[^\w]/g, "_");
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

function toast(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2200);
}

render();
