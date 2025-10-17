(function(){
  const chart = {
    container: "#tree",
    rootOrientation: "WEST",
    nodeAlign: "BOTTOM",
    siblingSeparation: 35,
    subTeeSeparation: 45,
    connectors: { type: 'step' },
    animation: { nodeAnimation: "easeOutQuart", nodeSpeed: 300, connectorsAnimation: "easeOutQuart", connectorsSpeed: 300 },
    node: { collapsable: true }
  };

  // Helpers
  const Root = (text) => ({ text: { name: text }, HTMLclass: 'root', collapsable: true });
  const Yellow = (text) => ({ text: { name: text }, HTMLclass: 'yellow', collapsable: true, collapsed: true });
  const Item = (name) => ({ text: { name }, HTMLclass: 'brown small' });

  // Root
  const root = Root('技术作家');

  // Columns
  const basics = Yellow('写作基础');
  basics.children = [
    Item('写作原理与结构'),
    Item('语言表达与修辞'),
    Item('逻辑思维与论证'),
    Item('编辑与校对技巧')
  ];

  const tech = Yellow('技术写作技能');
  tech.children = [
    Item('技术概念简化'),
    Item('代码注释与文档'),
    Item('API 文档写作'),
    Item('用户指南与教程')
  ];

  const tools = Yellow('工具与软件');
  tools.children = [
    Item('Markdown 与轻量标记'),
    Item('静态站点生成：Hugo/Jekyll'),
    Item('协作平台：GitHub/Confluence'),
    Item('图像与多媒体编辑')
  ];

  const docs = Yellow('文档类型');
  docs.children = [
    Item('产品说明书'),
    Item('技术规范与标准'),
    Item('故障排除指南'),
    Item('最佳实践手册')
  ];

  const collab = Yellow('协作与审阅');
  collab.children = [
    Item('团队协作与沟通'),
    Item('审阅流程与反馈'),
    Item('版本控制与文档管理'),
    Item('跨文化沟通')
  ];

  const visual = Yellow('视觉与多媒体');
  visual.children = [
    Item('图表与流程图'),
    Item('截图与录屏'),
    Item('信息可视化'),
    Item('多媒体内容整合')
  ];

  const intl = Yellow('国际化与本地化');
  intl.children = [
    Item('全球化内容策略'),
    Item('翻译与本地化'),
    Item('文化适应与敏感性'),
    Item('多语言文档管理')
  ];

  const ethics = Yellow('伦理与职业');
  ethics.children = [
    Item('知识产权与版权'),
    Item('隐私与数据保护'),
    Item('职业道德与诚信'),
    Item('持续学习与行业趋势')
  ];

  const project = Yellow('项目实践');
  project.children = [
    Item('大型文档项目管理'),
    Item('开源贡献与社区'),
    Item('内容策略与SEO'),
    Item('演讲与培训')
  ];

  root.children = [
    basics, tech, tools, docs, collab, visual, intl, ethics, project
  ];

  window.TreeData = { chart, nodeStructure: root };
})();
