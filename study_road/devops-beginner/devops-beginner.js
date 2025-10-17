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
  const root = Root('DevOps 初学者');

  // Columns
  const basics = Yellow('基础与系统');
  basics.children = [
    Item('Linux 命令与脚本'),
    Item('网络与防火墙'),
    Item('版本控制：Git / SVN'),
    Item('操作系统：进程/内存/磁盘')
  ];

  const code = Yellow('代码与构建');
  code.children = [
    Item('编程基础：Python / Bash'),
    Item('Makefile 与构建工具'),
    Item('单元测试与集成测试'),
    Item('代码质量：Linting / SonarQube')
  ];

  const ci = Yellow('持续集成 (CI)');
  ci.children = [
    Item('GitHub Actions / Jenkins'),
    Item('自动化测试与报告'),
    Item('构建镜像与缓存'),
    Item('分支策略与合并请求')
  ];

  const container = Yellow('容器化与编排');
  container.children = [
    Item('Docker 基础：镜像/容器'),
    Item('Docker Compose'),
    Item('Kubernetes 基础：Pod/Service'),
    Item('Helm 与包管理')
  ];

  const cd = Yellow('持续交付 (CD)');
  cd.children = [
    Item('部署策略：蓝绿/金丝雀'),
    Item('配置管理：Ansible / Puppet'),
    Item('基础设施即代码：Terraform'),
    Item('回滚与健康检查')
  ];

  const cloud = Yellow('云与基础设施');
  cloud.children = [
    Item('AWS / Azure / GCP 基础'),
    Item('虚拟机与负载均衡'),
    Item('存储：S3 / EBS / Blob'),
    Item('网络：VPC / Subnet')
  ];

  const monitor = Yellow('监控与日志');
  monitor.children = [
    Item('日志收集：ELK Stack'),
    Item('监控：Prometheus / Grafana'),
    Item('告警与通知：PagerDuty'),
    Item('分布式追踪：Jaeger')
  ];

  const security = Yellow('安全与合规');
  security.children = [
    Item('容器安全扫描'),
    Item('密钥管理：Vault'),
    Item('合规：CIS Benchmarks'),
    Item('访问控制：IAM / RBAC')
  ];

  const automation = Yellow('自动化与脚本');
  automation.children = [
    Item('脚本编写：Shell / Python'),
    Item('配置自动化：Chef / SaltStack'),
    Item('事件驱动：Webhook'),
    Item('故障恢复自动化')
  ];

  const project = Yellow('项目实践');
  project.children = [
    Item('搭建 CI/CD 流水线'),
    Item('部署微服务应用'),
    Item('性能监控与调优'),
    Item('团队协作与文档')
  ];

  root.children = [
    basics, code, ci, container, cd, cloud, monitor, security, automation, project
  ];

  window.TreeData = { chart, nodeStructure: root };
})();
