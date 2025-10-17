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
  const root = Root('机器学习工程师');

  // Columns
  const math = Yellow('数学基础');
  math.children = [
    Item('线性代数与矩阵运算'),
    Item('微积分与梯度'),
    Item('概率论与统计'),
    Item('优化理论')
  ];

  const python = Yellow('编程与工具');
  python.children = [
    Item('Python 编程基础'),
    Item('NumPy 与科学计算'),
    Item('Pandas 与数据处理'),
    Item('Jupyter 与可视化')
  ];

  const data = Yellow('数据处理');
  data.children = [
    Item('数据清洗与预处理'),
    Item('特征工程与选择'),
    Item('数据增强与采样'),
    Item('管道与工作流')
  ];

  const ml = Yellow('机器学习算法');
  ml.children = [
    Item('监督学习：回归与分类'),
    Item('无监督学习：聚类与降维'),
    Item('集成方法与 boosting'),
    Item('模型评估与调参')
  ];

  const dl = Yellow('深度学习');
  dl.children = [
    Item('神经网络基础'),
    Item('CNN/RNN/Transformer'),
    Item('框架：PyTorch/TensorFlow'),
    Item('训练技巧与正则化')
  ];

  const nlp = Yellow('自然语言处理');
  nlp.children = [
    Item('文本预处理与嵌入'),
    Item('序列模型与注意力'),
    Item('预训练模型与微调'),
    Item('应用：分类与生成')
  ];

  const cv = Yellow('计算机视觉');
  cv.children = [
    Item('图像处理基础'),
    Item('卷积网络与检测'),
    Item('生成模型：GAN/VAE'),
    Item('应用：分类与分割')
  ];

  const deploy = Yellow('部署与工程化');
  deploy.children = [
    Item('模型序列化与版本'),
    Item('API 部署与服务化'),
    Item('监控与性能优化'),
    Item('A/B 测试与迭代')
  ];

  const ethics = Yellow('伦理与实践');
  ethics.children = [
    Item('偏差与公平性'),
    Item('隐私与数据保护'),
    Item('可解释性与信任'),
    Item('行业应用与案例')
  ];

  const project = Yellow('项目实践');
  project.children = [
    Item('端到端项目构建'),
    Item('竞赛与开源贡献'),
    Item('论文阅读与复现'),
    Item('职业发展与技能')
  ];

  root.children = [
    math, python, data, ml, dl, nlp, cv, deploy, ethics, project
  ];

  window.TreeData = { chart, nodeStructure: root };
})();
