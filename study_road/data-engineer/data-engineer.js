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
  const root = Root('数据工程师');

  // Columns
  const basics = Yellow('数据基础与编程');
  basics.children = [
    Item('SQL 与数据库基础'),
    Item('Python / Scala / Java'),
    Item('数据结构与算法'),
    Item('Linux 与命令行')
  ];

  const ingestion = Yellow('数据采集与摄取');
  ingestion.children = [
    Item('日志收集：Flume / Logstash'),
    Item('实时流：Kafka / Pulsar'),
    Item('批处理：Sqoop / DataX'),
    Item('API 与爬虫')
  ];

  const etl = Yellow('ETL 与数据清洗');
  etl.children = [
    Item('数据清洗与校验'),
    Item('Airflow / Luigi / Prefect'),
    Item('增量同步与去重'),
    Item('质量监控与报警')
  ];

  const storage = Yellow('存储与数据湖');
  storage.children = [
    Item('分布式文件系统：HDFS'),
    Item('数据湖：Delta Lake / Iceberg'),
    Item('对象存储：S3 / OSS'),
    Item('分区与压缩')
  ];

  const warehouse = Yellow('数据仓库与建模');
  warehouse.children = [
    Item('维度建模：星型/雪花'),
    Item('事实表与维度表'),
    Item('数据分层：ODS/DWD/DWS/ADS'),
    Item('指标体系与一致性')
  ];

  const compute = Yellow('计算引擎与查询');
  compute.children = [
    Item('Spark / Flink'),
    Item('Hive / Presto / Trino'),
    Item('性能调优与资源管理'),
    Item('SQL 优化与执行计划')
  ];

  const viz = Yellow('可视化与监控');
  viz.children = [
    Item('Superset / Tableau'),
    Item('监控工具：Grafana / Prometheus'),
    Item('日志分析：ELK'),
    Item('告警与自动化响应')
  ];

  const pipeline = Yellow('管道与编排');
  pipeline.children = [
    Item('工作流编排：Airflow'),
    Item('依赖管理与重试'),
    Item('版本控制与回滚'),
    Item('CI/CD for 数据管道')
  ];

  const security = Yellow('安全与治理');
  security.children = [
    Item('数据脱敏与加密'),
    Item('权限管理：RBAC'),
    Item('合规：GDPR / CCPA'),
    Item('审计与血缘追踪')
  ];

  const project = Yellow('项目实践');
  project.children = [
    Item('端到端数据管道构建'),
    Item('性能瓶颈分析与优化'),
    Item('故障排查与应急'),
    Item('团队协作与文档')
  ];

  root.children = [
    basics, ingestion, etl, storage, warehouse, compute, viz, pipeline, security, project
  ];

  window.TreeData = { chart, nodeStructure: root };
})();
