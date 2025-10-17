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
  const root = Root('软件架构师');

  // Columns
  const basics = Yellow('架构基础');
  basics.children = [
    Item('软件架构原理'),
    Item('系统设计基础'),
    Item('架构风格与模式'),
    Item('需求分析与建模')
  ];

  const design = Yellow('设计模式与原则');
  design.children = [
    Item('SOLID 原则'),
    Item('设计模式：Creational/Structural/Behavioral'),
    Item('重构技巧与最佳实践'),
    Item('代码质量与可维护性')
  ];

  const system = Yellow('系统设计');
  system.children = [
    Item('分布式系统基础'),
    Item('微服务与单体架构'),
    Item('事件驱动与消息队列'),
    Item('API 设计与版本化')
  ];

  const scalability = Yellow('可扩展性与性能');
  scalability.children = [
    Item('负载均衡与水平扩展'),
    Item('缓存策略与CDN'),
    Item('数据库扩展与分区'),
    Item('性能监控与调优')
  ];

  const micro = Yellow('微服务与分布式');
  micro.children = [
    Item('微服务拆分策略'),
    Item('服务间通信：REST/gRPC'),
    Item('服务发现与注册中心'),
    Item('容器化与编排：Docker/K8s')
  ];

  const security = Yellow('安全与可靠性');
  security.children = [
    Item('安全架构与威胁建模'),
    Item('加密与认证机制'),
    Item('高可用与容灾设计'),
    Item('故障恢复与弹性')
  ];

  const tools = Yellow('工具与实践');
  tools.children = [
    Item('架构文档与图表'),
    Item('代码审查与静态分析'),
    Item('持续集成与部署'),
    Item('自动化测试与质量门禁')
  ];

  const team = Yellow('团队领导');
  team.children = [
    Item('技术决策与指导'),
    Item('跨团队协作'),
    Item('导师制与技能传承'),
    Item('创新文化与激励')
  ];

  const business = Yellow('商业理解');
  business.children = [
    Item('业务需求映射'),
    Item('成本效益分析'),
    Item('技术债务管理'),
    Item('ROI 与投资回报')
  ];

  const project = Yellow('项目实践');
  project.children = [
    Item('架构设计与评审'),
    Item('系统重构与迁移'),
    Item('性能优化案例'),
    Item('知识分享与演讲')
  ];

  root.children = [
    basics, design, system, scalability, micro, security, tools, team, business, project
  ];

  window.TreeData = { chart, nodeStructure: root };
})();
