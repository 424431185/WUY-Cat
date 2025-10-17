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
  const root = Root('质量 assurance 工程师');

  // Columns
  const basics = Yellow('测试基础');
  basics.children = [
    Item('软件测试原理'),
    Item('测试类型：功能/性能/安全'),
    Item('测试生命周期'),
    Item('缺陷管理与报告')
  ];

  const manual = Yellow('手动测试');
  manual.children = [
    Item('测试用例设计'),
    Item('边界值与等价类'),
    Item('探索性测试'),
    Item('用户场景测试')
  ];

  const automation = Yellow('自动化测试');
  automation.children = [
    Item('Selenium/Appium'),
    Item('API 测试：Postman/REST Assured'),
    Item('单元测试：JUnit/TestNG'),
    Item('持续集成与CI/CD')
  ];

  const perf = Yellow('性能测试');
  perf.children = [
    Item('负载测试与压力测试'),
    Item('工具：JMeter/Locust'),
    Item('性能指标与基准'),
    Item('瓶颈分析与优化')
  ];

  const security = Yellow('安全测试');
  security.children = [
    Item('渗透测试基础'),
    Item('OWASP Top 10'),
    Item('漏洞扫描工具'),
    Item('安全审计与合规')
  ];

  const tools = Yellow('工具与框架');
  tools.children = [
    Item('测试管理：Jira/TestRail'),
    Item('代码质量：SonarQube'),
    Item('虚拟化与容器测试'),
    Item('云测试平台')
  ];

  const process = Yellow('过程与方法');
  process.children = [
    Item('敏捷测试实践'),
    Item('测试驱动开发（TDD）'),
    Item('行为驱动开发（BDD）'),
    Item('风险评估与缓解')
  ];

  const team = Yellow('团队协作');
  team.children = [
    Item('跨职能团队合作'),
    Item('需求澄清与沟通'),
    Item('测试环境管理'),
    Item('知识共享与培训')
  ];

  const ethics = Yellow('伦理与职业');
  ethics.children = [
    Item('测试伦理与责任'),
    Item('数据隐私与保护'),
    Item('职业发展路径'),
    Item('认证与持续学习')
  ];

  const project = Yellow('项目实践');
  project.children = [
    Item('端到端测试项目'),
    Item('自动化框架搭建'),
    Item('性能调优案例'),
    Item('团队协作与交付')
  ];

  root.children = [
    basics, manual, automation, perf, security, tools, process, team, ethics, project
  ];

  window.TreeData = { chart, nodeStructure: root };
})();
