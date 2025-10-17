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
  const root = Root('AI 工程师');

  // Columns
  const cs = Yellow('计算机基础');
  cs.children = [
    Item('操作系统基础'),
    Item('计算机网络'),
    Item('数据结构与算法'),
    Item('设计模式与工程实践')
  ];

  const python = Yellow('编程与 Python');
  python.children = [
    Item('Python 语法与标准库'),
    Item('面向对象与类型标注'),
    Item('虚拟环境与包管理'),
    Item('高性能 Python（NumPy/Numba）')
  ];

  const data = Yellow('数据处理与分析');
  data.children = [
    Item('NumPy / Pandas'),
    Item('数据清洗与特征工程'),
    Item('可视化：Matplotlib / Seaborn / Altair')
  ];

  const math = Yellow('数学与统计');
  math.children = [
    Item('线性代数'),
    Item('概率统计'),
    Item('优化基础'),
    Item('信息论')
  ];

  const ml = Yellow('机器学习');
  ml.children = [
    Item('监督学习：回归/分类'),
    Item('模型评估与调参'),
    Item('集成学习与特征选择'),
    Item('无监督：聚类/降维')
  ];

  const dl = Yellow('深度学习');
  dl.children = [
    Item('神经网络基础与正则化'),
    Item('CNN / RNN / Transformer'),
    Item('预训练与微调'),
    Item('计算加速：GPU / 混合精度')
  ];

  const frameworks = Yellow('框架与工具');
  frameworks.children = [
    Item('PyTorch / TensorFlow'),
    Item('Lightning / Accelerate'),
    Item('ONNX / XLA')
  ];

  const dataEng = Yellow('数据工程与特征平台');
  dataEng.children = [
    Item('数据采集与 ETL'),
    Item('数据湖/仓：Hive / Delta'),
    Item('特征存储：Feast 等')
  ];

  const mlops = Yellow('MLOps 与工程化');
  mlops.children = [
    Item('版本管理：DVC / Git-LFS'),
    Item('实验追踪：MLflow / W&B'),
    Item('镜像与打包：Docker'),
    Item('持续集成/交付：CI/CD')
  ];

  const deploy = Yellow('服务化与部署');
  deploy.children = [
    Item('REST/gRPC：FastAPI'),
    Item('批/流推理：Kafka 等'),
    Item('推理优化：ONNX Runtime / TensorRT'),
    Item('A/B 与灰度发布')
  ];

  const cloud = Yellow('云与平台');
  cloud.children = [
    Item('Kubernetes 与 Helm'),
    Item('云服务：AWS / GCP / Azure'),
    Item('托管推理：SageMaker / Vertex AI')
  ];

  const monitor = Yellow('监控与可靠性');
  monitor.children = [
    Item('性能/延迟/吞吐监控'),
    Item('模型漂移与数据漂移'),
    Item('观测性：Logs / Metrics / Traces')
  ];

  const security = Yellow('安全与合规');
  security.children = [
    Item('数据隐私与脱敏'),
    Item('模型安全与对抗样本'),
    Item('法规与伦理')
  ];

  const genai = Yellow('LLM 与生成式 AI（可选）');
  genai.children = [
    Item('提示工程'),
    Item('向量数据库与 RAG'),
    Item('微调与参数高效微调（PEFT）')
  ];

  const projects = Yellow('项目实践与作品集');
  projects.children = [
    Item('端到端项目实战'),
    Item('代码质量与文档'),
    Item('面试准备与刷题')
  ];

  root.children = [
    cs, python, data, math, ml, dl, frameworks,
    dataEng, mlops, deploy, cloud, monitor, security,
    genai, projects
  ];

  window.TreeData = { chart, nodeStructure: root };
})();
