(function(){
  const chart = {
    container: "#tree",
    rootOrientation: "WEST", // left -> right
    nodeAlign: "BOTTOM",
    siblingSeparation: 35,
    subTeeSeparation: 45,
    connectors: { type: 'step' },
    animation: { nodeAnimation: "easeOutQuart", nodeSpeed: 300, connectorsAnimation: "easeOutQuart", connectorsSpeed: 300 },
    node: { collapsable: true }
  };

  // Helper factories
  const Root = (text) => ({ text: { name: text }, HTMLclass: 'root', collapsable: true });
  const Yellow = (text) => ({ text: { name: text }, HTMLclass: 'yellow', collapsable: true });
  const Item = (name, link, type) => ({ text: { name }, link, HTMLclass: `brown ${type === 'small' ? 'small' : ''}`.trim() });

  // Tree skeleton based on the provided image
  const root = Root('Ai Data Scientist');

  // Second level (yellow) columns
  const math = Yellow('数学');
  math.children = [
    Item('线性代数与微积分', null, 'small'),
    Item('机器学习数学基础', null, 'small'),
    Item('常微分方程', null, 'small'),
    Item('离散数学', null, 'small')
  ];

  const stats = Yellow('统计学');
  stats.children = [
    Item('中心极限定理与假设检验', null, 'small'),
    Item('描述统计与推断统计', null, 'small'),
    Item('概率论：贝叶斯与分布', null, 'small'),
  ];

  const econ = Yellow('计量经济学');
  econ.children = [
    Item('先修与基础', null, 'small'),
    Item('回归与时间序列', null, 'small'),
    Item('面板数据与工具变量', null, 'small'),
    Item('因果推断（DID/RDD/IV）', null, 'small')
  ];

  const coding = Yellow('编码');
  coding.children = [
    Item('学习 Python 编程', null, 'small'),
    Item('面向数据的 Python', null, 'small'),
    Item('数据结构与算法（基础）', null, 'small'),
    Item('学习 SQL', null, 'small')
  ];

  const eda = Yellow('探索性数据分析');
  eda.children = [
    Item('数据清洗与校验', null, 'small'),
    Item('使用 Pandas/Polars 的 EDA', null, 'small'),
    Item('使用 Seaborn/Altair 可视化', null, 'small')
  ];

  const ml = Yellow('机器学习');
  ml.children = [
    Item('监督学习：线性/逻辑回归、树模型', null, 'small'),
    Item('模型评估与交叉验证', null, 'small'),
    Item('正则化与集成方法', null, 'small'),
    Item('无监督：聚类、PCA', null, 'small')
  ];

  const dl = Yellow('深度学习');
  dl.children = [
    Item('基础：MLP/CNN/RNN/Transformer', null, 'small'),
    Item('框架：PyTorch / TensorFlow', null, 'small'),
    Item('训练技巧与优化', null, 'small')
  ];

  const mlops = Yellow('机器学习工程化（MLOps）');
  mlops.children = [
    Item('部署：API 与 CI/CD', null, 'small'),
    Item('实验追踪与可复现', null, 'small'),
    Item('监控与数据/模型漂移', null, 'small')
  ];

  root.children = [math, stats, econ, coding, eda, ml, dl, mlops];

  window.TreeData = {
    chart,
    nodeStructure: root
  };
})();
