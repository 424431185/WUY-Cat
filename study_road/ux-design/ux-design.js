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
  const Yellow = (text) => ({ text: { name: text }, HTMLclass: 'yellow', collapsable: true });
  const Item = (name) => ({ text: { name }, HTMLclass: 'brown small' });

  // Root
  const root = Root('用户体验设计师');

  // Columns
  const research = Yellow('用户研究');
  research.children = [
    Item('用户访谈与调查'),
    Item('用户画像与persona'),
    Item('用户旅程图'),
    Item('可用性测试与反馈')
  ];

  const basics = Yellow('设计基础');
  basics.children = [
    Item('设计原理与元素'),
    Item('色彩理论与心理学'),
    Item('字体与排版'),
    Item('网格系统与布局')
  ];

  const ia = Yellow('信息架构');
  ia.children = [
    Item('内容组织与分类'),
    Item('导航设计与菜单'),
    Item('搜索功能与过滤'),
    Item('信息层级与优先级')
  ];

  const interaction = Yellow('交互设计');
  interaction.children = [
    Item('交互模式与范式'),
    Item('用户流程与状态'),
    Item('微交互与反馈'),
    Item('手势与触摸设计')
  ];

  const visual = Yellow('视觉设计');
  visual.children = [
    Item('视觉风格与品牌'),
    Item('图标与插图'),
    Item('响应式设计'),
    Item('动画与过渡')
  ];

  const prototyping = Yellow('原型与测试');
  prototyping.children = [
    Item('低保真原型：纸笔/线框'),
    Item('高保真原型：Figma/Sketch'),
    Item('可用性测试'),
    Item('迭代与优化')
  ];

  const usability = Yellow('可用性评估');
  usability.children = [
    Item('启发式评估'),
    Item('认知走查'),
    Item('A/B 测试'),
    Item('分析工具：Hotjar/Google Analytics')
  ];

  const collab = Yellow('协作与沟通');
  collab.children = [
    Item('跨职能团队合作'),
    Item('设计评审与反馈'),
    Item('设计系统与组件库'),
    Item('文档与规范')
  ];

  const ethics = Yellow('伦理与职业');
  ethics.children = [
    Item('包容性设计'),
    Item('隐私与数据伦理'),
    Item('可持续设计'),
    Item('职业发展与行业趋势')
  ];

  const project = Yellow('项目实践');
  project.children = [
    Item('端到端设计项目'),
    Item('设计冲刺与工作坊'),
    Item('案例研究与作品集'),
    Item('演讲与社区贡献')
  ];

  root.children = [
    research, basics, ia, interaction, visual, prototyping, usability, collab, ethics, project
  ];

  window.TreeData = { chart, nodeStructure: root };
})();
