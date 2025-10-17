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
  const root = Root('商业智能分析师');

  // Columns
  const excel = Yellow('数据基础与 Excel');
  excel.children = [
    Item('数据清洗与透视表'),
    Item('函数：VLOOKUP/INDEX-MATCH'),
    Item('数据透视图与图表'),
    Item('宏与简单自动化')
  ];

  const sql = Yellow('SQL 与数据库');
  sql.children = [
    Item('SQL 基础：SELECT/WHERE/JOIN'),
    Item('聚合与窗口函数'),
    Item('表设计与范式'),
    Item('性能：索引/执行计划')
  ];

  const etl = Yellow('ETL 与数据集成');
  etl.children = [
    Item('数据抽取与清洗'),
    Item('调度与依赖（Airflow 等）'),
    Item('批处理与增量同步'),
    Item('数据质量校验')
  ];

  const model = Yellow('数据建模与仓库');
  model.children = [
    Item('维度建模：星型/雪花'),
    Item('事实表/维度表/快照表'),
    Item('数据仓库分层（ODS/DWD/DWS/ADS）'),
    Item('指标口径与一致性')
  ];

  const viz = Yellow('可视化与看板');
  viz.children = [
    Item('Tableau / Power BI / Superset'),
    Item('图表选择与配色'),
    Item('交互筛选与钻取'),
    Item('性能与权限控制')
  ];

  const stats = Yellow('统计分析');
  stats.children = [
    Item('描述统计与假设检验'),
    Item('相关性与回归'),
    Item('时间序列与季节性'),
    Item('聚类与分群（可选）')
  ];

  const ab = Yellow('实验设计与 A/B');
  ab.children = [
    Item('实验分流与随机化'),
    Item('样本量与检验力'),
    Item('指标选择与显著性'),
    Item('多重检验与陷阱')
  ];

  const metric = Yellow('指标体系与报表');
  metric.children = [
    Item('北极星指标与层级分解'),
    Item('漏斗与转化分析'),
    Item('留存与生命周期'),
    Item('周报/月报与运营分析')
  ];

  const python = Yellow('Python 与自动化');
  python.children = [
    Item('Pandas / 数据清洗'),
    Item('可视化：Matplotlib/Seaborn'),
    Item('脚本化报表与任务'),
    Item('API/SDK 获取数据')
  ];

  const biz = Yellow('业务理解与沟通');
  biz.children = [
    Item('电商/内容/金融等领域知识'),
    Item('需求澄清与数据口径对齐'),
    Item('结论表达与数据故事'),
    Item('与产品/工程/运营协作')
  ];

  const govern = Yellow('数据治理');
  govern.children = [
    Item('数据字典与血缘'),
    Item('权限与分级管理'),
    Item('质量监控与告警'),
    Item('合规与隐私')
  ];

  const project = Yellow('项目与案例');
  project.children = [
    Item('构建业务看板'),
    Item('指标体系搭建'),
    Item('A/B 分析复盘'),
    Item('数据产品化')
  ];

  root.children = [
    excel, sql, etl, model, viz, stats,
    ab, metric, python, biz, govern, project
  ];

  window.TreeData = { chart, nodeStructure: root };
})();
