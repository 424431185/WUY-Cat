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
  const root = Root('产品经理');

  // Columns
  const strategy = Yellow('产品战略');
  strategy.children = [
    Item('市场分析与趋势研究'),
    Item('竞争对手分析'),
    Item('产品愿景与定位'),
    Item('战略规划与路线图')
  ];

  const user = Yellow('用户研究');
  user.children = [
    Item('用户访谈与调查'),
    Item('用户画像与persona'),
    Item('用户旅程图'),
    Item('可用性测试与反馈')
  ];

  const requirements = Yellow('需求管理');
  requirements.children = [
    Item('需求收集与优先级排序'),
    Item('用户故事与用例'),
    Item('需求验证与迭代'),
    Item('产品规格文档')
  ];

  const design = Yellow('产品设计');
  design.children = [
    Item('原型设计与线框图'),
    Item('信息架构与导航'),
    Item('交互设计与用户体验'),
    Item('视觉设计与品牌')
  ];

  const dev = Yellow('开发协作');
  dev.children = [
    Item('敏捷开发流程'),
    Item('冲刺规划与回顾'),
    Item('跨职能团队协作'),
    Item('技术债务管理')
  ];

  const testing = Yellow('测试与发布');
  testing.children = [
    Item('测试策略与计划'),
    Item('质量 assurance 与验收'),
    Item('发布计划与上线'),
    Item('版本管理与回滚')
  ];

  const data = Yellow('数据分析');
  data.children = [
    Item('指标定义与监控'),
    Item('A/B 测试与实验'),
    Item('用户行为分析'),
    Item('数据驱动决策')
  ];

  const leadership = Yellow('团队领导');
  leadership.children = [
    Item('绩效评估与反馈'),
    Item('导师制与技能发展'),
    Item('冲突解决与谈判'),
    Item('文化建设与激励')
  ];

  const business = Yellow('商业理解');
  business.children = [
    Item('商业模式与盈利'),
    Item('定价策略与市场定位'),
    Item('ROI 与投资回报'),
    Item('法律与合规考量')
  ];

  const project = Yellow('项目实践');
  project.children = [
    Item('端到端产品生命周期'),
    Item('跨部门项目管理'),
    Item('风险管理与应急'),
    Item('知识分享与文档')
  ];

  root.children = [
    strategy, user, requirements, design, dev, testing, data, leadership, business, project
  ];

  window.TreeData = { chart, nodeStructure: root };
})();
