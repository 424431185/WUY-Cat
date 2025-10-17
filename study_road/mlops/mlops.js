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
  const root = Root('MLOps 工程师');

  // Columns
  const mlBasics = Yellow('机器学习基础');
  mlBasics.children = [
    Item('监督/无监督学习算法'),
    Item('模型评估与调参'),
    Item('特征工程与数据预处理'),
    Item('常见框架：Scikit-learn/TensorFlow')
  ];

  const dataEng = Yellow('数据工程');
  dataEng.children = [
    Item('数据管道与ETL'),
    Item('数据湖与仓库'),
    Item('流处理与批处理'),
    Item('数据质量与监控')
  ];

  const modelDev = Yellow('模型开发');
  modelDev.children = [
    Item('实验追踪与版本控制'),
    Item('模型训练与优化'),
    Item('超参数调优与自动化'),
    Item('模型解释与可视化')
  ];

  const deploy = Yellow('部署与服务化');
  deploy.children = [
    Item('模型打包与容器化'),
    Item('API 部署：REST/GraphQL'),
    Item('边缘部署与云服务'),
    Item('多环境管理')
  ];

  const ops = Yellow('运维与监控');
  ops.children = [
    Item('性能监控与警报'),
    Item('模型漂移检测'),
    Item('日志与可观测性'),
    Item('故障恢复与回滚')
  ];

  const ciCd = Yellow('CI/CD 与自动化');
  ciCd.children = [
    Item('自动化测试与验证'),
    Item('构建与部署流水线'),
    Item('蓝绿部署与金丝雀发布'),
    Item('基础设施即代码')
  ];

  const security = Yellow('安全与合规');
  security.children = [
    Item('模型安全与隐私'),
    Item('数据加密与访问控制'),
    Item('合规检查与审计'),
    Item('伦理与公平性')
  ];

  const collab = Yellow('协作与文档');
  collab.children = [
    Item('团队协作工具'),
    Item('文档与知识共享'),
    Item('代码审查与最佳实践'),
    Item('开源贡献与社区')
  ];

  const project = Yellow('项目实践');
  project.children = [
    Item('端到端 MLOps 项目'),
    Item('性能优化与成本控制'),
    Item('跨团队协作案例'),
    Item('职业发展与技能提升')
  ];

  root.children = [
    mlBasics, dataEng, modelDev, deploy, ops, ciCd, security, collab, project
  ];

  window.TreeData = { chart, nodeStructure: root };
})();
