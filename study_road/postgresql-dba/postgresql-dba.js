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
  const root = Root('PostgreSQL 数据库管理员');

  // Columns
  const basics = Yellow('数据库基础');
  basics.children = [
    Item('SQL 语言与查询'),
    Item('数据库设计与范式'),
    Item('事务与隔离级别'),
    Item('索引与约束')
  ];

  const install = Yellow('安装与配置');
  install.children = [
    Item('PostgreSQL 安装与初始化'),
    Item('配置文件调优'),
    Item('用户与角色管理'),
    Item('版本升级与迁移')
  ];

  const backup = Yellow('备份与恢复');
  backup.children = [
    Item('物理与逻辑备份'),
    Item('PITR 与归档日志'),
    Item('自动化备份策略'),
    Item('灾难恢复计划')
  ];

  const perf = Yellow('性能调优');
  perf.children = [
    Item('查询优化与EXPLAIN'),
    Item('索引策略与维护'),
    Item('内存与缓冲区管理'),
    Item('并发与锁机制')
  ];

  const security = Yellow('安全与权限');
  security.children = [
    Item('认证与授权'),
    Item('加密与SSL配置'),
    Item('审计日志与监控'),
    Item('防火墙与网络安全')
  ];

  const ha = Yellow('高可用与复制');
  ha.children = [
    Item('主从复制配置'),
    Item('流复制与同步'),
    Item('故障转移与负载均衡'),
    Item('集群管理与Patroni')
  ];

  const monitor = Yellow('监控与日志');
  monitor.children = [
    Item('系统监控工具'),
    Item('日志配置与分析'),
    Item('性能指标收集'),
    Item('警报与自动化响应')
  ];

  const troubleshoot = Yellow('故障排除');
  troubleshoot.children = [
    Item('常见错误诊断'),
    Item('死锁与性能问题'),
    Item('空间管理与清理'),
    Item('工具与调试技巧')
  ];

  const compliance = Yellow('合规与审计');
  compliance.children = [
    Item('GDPR 与数据隐私'),
    Item('审计要求与日志'),
    Item('备份验证与测试'),
    Item('文档与合规报告')
  ];

  const project = Yellow('项目实践');
  project.children = [
    Item('数据库设计与实施'),
    Item('迁移与升级项目'),
    Item('性能优化案例'),
    Item('团队协作与知识分享')
  ];

  root.children = [
    basics, install, backup, perf, security, ha, monitor, troubleshoot, compliance, project
  ];

  window.TreeData = { chart, nodeStructure: root };
})();
