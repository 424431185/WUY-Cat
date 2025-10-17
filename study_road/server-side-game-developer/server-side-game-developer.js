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
  const root = Root('服务器端游戏开发者');

  // Columns
  const basics = Yellow('游戏服务器基础');
  basics.children = [
    Item('网络编程基础'),
    Item('多线程与并发'),
    Item('游戏循环与事件驱动'),
    Item('状态同步与预测')
  ];

  const networking = Yellow('网络与通信');
  networking.children = [
    Item('TCP/UDP 协议'),
    Item('WebSocket 与实时通信'),
    Item('负载均衡与分布式'),
    Item('防火墙与安全')
  ];

  const db = Yellow('数据库与存储');
  db.children = [
    Item('关系型数据库：MySQL/PostgreSQL'),
    Item('NoSQL：Redis/MongoDB'),
    Item('游戏数据持久化'),
    Item('缓存策略与优化')
  ];

  const logic = Yellow('游戏逻辑与状态');
  logic.children = [
    Item('游戏规则与机制'),
    Item('玩家状态管理'),
    Item('物品与经济系统'),
    Item('排行榜与成就')
  ];

  const realtime = Yellow('实时系统');
  realtime.children = [
    Item('多人同步与锁步'),
    Item('延迟补偿与回滚'),
    Item('反作弊机制'),
    Item('服务器权威与客户端预测')
  ];

  const perf = Yellow('性能与优化');
  perf.children = [
    Item('内存管理与垃圾回收'),
    Item('CPU 与网络优化'),
    Item('负载测试与压力测试'),
    Item('监控与警报')
  ];

  const deploy = Yellow('部署与运维');
  deploy.children = [
    Item('服务器部署与配置'),
    Item('容器化：Docker/Kubernetes'),
    Item('CI/CD 与自动化'),
    Item('备份与灾难恢复')
  ];

  const security = Yellow('安全与作弊防护');
  security.children = [
    Item('加密与认证'),
    Item('反作弊检测'),
    Item('DDoS 防护'),
    Item('日志审计与监控')
  ];

  const tools = Yellow('工具与框架');
  tools.children = [
    Item('游戏引擎集成：Unity/Unreal'),
    Item('消息队列：Kafka/RabbitMQ'),
    Item('监控工具：Prometheus/Grafana'),
    Item('协作工具：Git/Jira')
  ];

  const project = Yellow('项目实践');
  project.children = [
    Item('多人游戏服务器构建'),
    Item('实时游戏逻辑实现'),
    Item('性能调优与调试'),
    Item('团队协作与交付')
  ];

  root.children = [
    basics, networking, db, logic, realtime, perf, deploy, security, tools, project
  ];

  window.TreeData = { chart, nodeStructure: root };
})();
