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
  const root = Root('工程经理');

  // Columns
  const tech = Yellow('技术领导力');
  tech.children = [
    Item('架构设计与技术选型'),
    Item('代码审查与质量把控'),
    Item('技术债务管理'),
    Item('创新与技术趋势跟踪')
  ];

  const project = Yellow('项目管理');
  project.children = [
    Item('敏捷/Scrum 方法论'),
    Item('需求分析与优先级排序'),
    Item('进度跟踪与风险管理'),
    Item('跨团队协作与沟通')
  ];

  const team = Yellow('团队建设');
  team.children = [
    Item('招聘与人才评估'),
    Item('绩效评估与反馈'),
    Item('导师制与技能发展'),
    Item('团队文化与激励')
  ];

  const process = Yellow('流程与工具');
  process.children = [
    Item('CI/CD 与自动化'),
    Item('监控与告警体系'),
    Item('文档与知识共享'),
    Item('代码规范与审查流程')
  ];

  const biz = Yellow('业务理解');
  biz.children = [
    Item('产品需求分析'),
    Item('用户体验与反馈'),
    Item('市场与竞争分析'),
    Item('ROI 与业务价值评估')
  ];

  const stakeholder = Yellow('利益相关者管理');
  stakeholder.children = [
    Item('向上沟通与汇报'),
    Item('跨部门协调'),
    Item('客户互动与期望管理'),
    Item('冲突解决与谈判')
  ];

  const personal = Yellow('个人成长');
  personal.children = [
    Item('领导力技能提升'),
    Item('行业会议与网络'),
    Item('持续学习与技能更新'),
    Item('工作生活平衡')
  ];

  root.children = [
    tech, project, team, process, biz, stakeholder, personal
  ];

  window.TreeData = { chart, nodeStructure: root };
})();
