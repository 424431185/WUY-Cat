(function(){
  const chart = {
    container: "#tree",
    rootOrientation: "WEST",
    nodeAlign: "BOTTOM",
    siblingSeparation: 60,
    subTeeSeparation: 80,
    connectors: { type: 'curve' },
    animation: { nodeAnimation: "easeOutQuart", nodeSpeed: 300, connectorsAnimation: "easeOutQuart", connectorsSpeed: 300 },
    node: { collapsable: true }
  };

  // Helpers
  const Root = (text) => ({ text: { name: text }, HTMLclass: 'root', collapsable: true });
  const Yellow = (text) => ({ text: { name: text }, HTMLclass: 'yellow', collapsable: true, collapsed: true });
  const Item = (name) => ({ text: { name }, HTMLclass: 'brown small' });

  // 中置插入，控制同级节点分布
  const insertNextAtMiddle = (node, next) => {
    const list = node.children || (node.children = []);
    const mid = Math.floor(list.length / 2);
    list.splice(mid, 0, next);
  };

  // 阶段一｜数学与编程基础
  const mathProb = Yellow('数学与概率');
  mathProb.children = [
    Item('线代（向量/矩阵/特征值）'),
    Item('微积分'),
    Item('概率与统计'),
    Item('分布与估计'),
    Item('信息论')
  ];

  const optimization = Yellow('优化基础');
  optimization.children = [
    Item('梯度下降'),
    Item('学习率'),
    Item('凸优化'),
    Item('正则化（L1/L2）')
  ];

  const programming = Yellow('编程与工具');
  programming.children = [
    Item('Python'),
    Item('NumPy/Pandas'),
    Item('Matplotlib/Seaborn'),
    Item('Jupyter'),
    Item('Git/GitHub')
  ];

  const dataIntro = Yellow('数据入门');
  dataIntro.children = [
    Item('数据获取/清洗'),
    Item('缺失值/异常值处理'),
    Item('特征缩放与编码')
  ];

  const stage1Checkpoint = Yellow('检查点：一次 EDA');
  stage1Checkpoint.children = [
    Item('用 Pandas+Matplotlib 完成一次数据探索（EDA）')
  ];

  // 阶段二｜数据工程与传统机器学习
  const dataIngest = Yellow('数据获取与存储');
  dataIngest.children = [
    Item('CSV/Parquet'),
    Item('SQL/NoSQL'),
    Item('API/爬虫'),
    Item('数据权限与合规')
  ];

  const dataPrep = Yellow('数据清洗与预处理');
  dataPrep.children = [
    Item('缺失/异常处理'),
    Item('重复值与去噪'),
    Item('时间/文本基础处理'),
    Item('数据切分')
  ];

  const featureEng = Yellow('特征工程');
  featureEng.children = [
    Item('数值/类别/文本/时间类特征'),
    Item('分箱与编码（OneHot/Target/Hash）'),
    Item('归一化与标准化'),
    Item('特征交叉')
  ];

  const classicSL = Yellow('传统监督学习');
  classicSL.children = [
    Item('线/逻辑回归'),
    Item('SVM'),
    Item('KNN'),
    Item('决策树/随机森林'),
    Item('XGBoost/LightGBM')
  ];

  const unsupervised = Yellow('无监督学习');
  unsupervised.children = [
    Item('KMeans/层次/DBSCAN'),
    Item('PCA/t-SNE/UMAP'),
    Item('聚类评估')
  ];

  const modelSelect = Yellow('模型选择与验证');
  modelSelect.children = [
    Item('训练/验证/测试'),
    Item('交叉验证'),
    Item('Pipeline'),
    Item('Grid/Random Search'),
    Item('数据泄漏防护')
  ];

  const stage2Checkpoint = Yellow('检查点：结构化数据 Baseline');
  stage2Checkpoint.children = [
    Item('在公开数据集完成端到端建模与报告')
  ];

  // 阶段三｜模型评估与效果提升
  const metrics = Yellow('评估指标');
  metrics.children = [
    Item('回归：MSE/MAE/R2'),
    Item('分类：精确率/召回/F1/AUC/PR'),
    Item('排序：NDCG/Map'),
    Item('聚类：轮廓系数')
  ];

  const imbalance = Yellow('不平衡学习');
  imbalance.children = [
    Item('欠/过采样'),
    Item('阈值移动'),
    Item('代价敏感学习')
  ];

  const featSelect = Yellow('正则化与特征选择');
  featSelect.children = [
    Item('L1/L2/ElasticNet'),
    Item('递归特征消除'),
    Item('互信息/IV'),
    Item('降维对比')
  ];

  const ensemble = Yellow('集成学习');
  ensemble.children = [
    Item('Bagging'),
    Item('Boosting（XGBoost/LightGBM/CatBoost）'),
    Item('Stacking/Blending')
  ];

  const hpo = Yellow('超参优化');
  hpo.children = [
    Item('Bayesian/Optuna/Hyperopt'),
    Item('早停与重现性')
  ];

  const explainability = Yellow('误差分析与可解释性');
  explainability.children = [
    Item('偏差-方差拆解'),
    Item('学习曲线'),
    Item('SHAP/LIME'),
    Item('切片评估')
  ];

  const robustness = Yellow('鲁棒性与数据增强');
  robustness.children = [
    Item('噪声鲁棒'),
    Item('时序滑窗'),
    Item('文本/图像增强思路')
  ];

  const stage3Checkpoint = Yellow('检查点：A/B 实验设计');
  stage3Checkpoint.children = [
    Item('离线→线上指标映射、样本量与显著性、实验报告')
  ];

  // 阶段四｜深度学习与 MLOps 上线
  const dlBasics = Yellow('深度学习基础');
  dlBasics.children = [
    Item('计算图与自动微分'),
    Item('反向传播'),
    Item('初始化/归一化/正则化')
  ];

  const nnBlocks = Yellow('网络结构');
  nnBlocks.children = [
    Item('MLP'),
    Item('CNN'),
    Item('RNN/LSTM/GRU'),
    Item('Transformer 基础'),
    Item('注意力机制')
  ];

  const trainingTricks = Yellow('训练策略');
  trainingTricks.children = [
    Item('优化器（SGD/Adam/AdamW）'),
    Item('学习率调度'),
    Item('BatchNorm/Dropout'),
    Item('早停/Checkpoint'),
    Item('混合精度')
  ];

  const tasks = Yellow('典型任务实战');
  tasks.children = [
    Item('图像分类/检测入门'),
    Item('文本分类/序列标注'),
    Item('时间序列预测')
  ];

  const modelServing = Yellow('模型导出与推理优化');
  modelServing.children = [
    Item('ONNX/TorchScript'),
    Item('量化/裁剪/蒸馏'),
    Item('批量/实时推理')
  ];

  const mlops = Yellow('服务化与 MLOps');
  mlops.children = [
    Item('服务化与部署：REST/gRPC、Docker、K8s'),
    Item('发布：灰度/A-B、回滚与版本管理'),
    Item('数据与模型版本：DVC/MLflow'),
    Item('特征存储'),
    Item('训练/评估/部署流水线（Airflow/Kedro/Prefect）'),
    Item('监控：漂移/数据质量/性能')
  ];

  const stage4Checkpoint = Yellow('检查点：上线 Demo');
  stage4Checkpoint.children = [
    Item('一个深度学习模型的端到端上线与监控看板')
  ];

  // 阶段五｜职业化与研究进阶
  const tracks = Yellow('方向深化');
  tracks.children = [
    Item('推荐系统'),
    Item('NLP'),
    Item('CV'),
    Item('时间序列'),
    Item('因果推断'),
    Item('强化学习')
  ];

  const sysDesign = Yellow('系统设计与架构');
  sysDesign.children = [
    Item('召回-排序多级架构'),
    Item('特征平台与数据血缘'),
    Item('近线/实时特征'),
    Item('延迟与吞吐权衡')
  ];

  const advancedTopics = Yellow('前沿方法');
  advancedTopics.children = [
    Item('自监督/对比学习'),
    Item('预训练与微调'),
    Item('指令微调与参数高效微调')
  ];

  const dataGovern = Yellow('数据与实验治理');
  dataGovern.children = [
    Item('数据质量度量'),
    Item('可重复实验'),
    Item('配置与参数管理'),
    Item('实验平台化')
  ];

  const fairPrivacy = Yellow('公平性与隐私');
  fairPrivacy.children = [
    Item('可解释性'),
    Item('偏见检测与缓解'),
    Item('联邦学习'),
    Item('差分隐私')
  ];

  const engineering = Yellow('工程与协作');
  engineering.children = [
    Item('代码规范/测试/监控'),
    Item('文档与复盘'),
    Item('需求沟通与影响力')
  ];

  const careerShowcase = Yellow('作品集与求职');
  careerShowcase.children = [
    Item('指标对比与复盘'),
    Item('可复现仓库'),
    Item('技术博客与演讲'),
    Item('STAR 法则')
  ];

  const lifelong = Yellow('持续学习');
  lifelong.children = [
    Item('阅读论文'),
    Item('开源参与'),
    Item('社区与比赛')
  ];

  const stage5Checkpoint = Yellow('检查点：职业化盘点');
  stage5Checkpoint.children = [
    Item('领域作品集 + 技术品牌材料')
  ];

  const makeChart = (container) => ({
    ...chart,
    container
  });

  // 按层级展开（避免一次性展开导致拥挤）
  const expandDepth = (node, depth) => {
    node.collapsed = false;
    if (depth <= 0) return;
    if (node.children && node.children.length) {
      for (const child of node.children) expandDepth(child, depth - 1);
    }
  };

  const buildStage = (container, title, categories, expandLevel = 0) => {
    const stageRoot = Root(title);
    for (let i = 0; i < categories.length - 1; i++) {
      insertNextAtMiddle(categories[i], categories[i + 1]);
    }
    stageRoot.children = [ categories[0] ];
    if (expandLevel > 0) expandDepth(stageRoot, expandLevel);
    new Treant({ chart: makeChart(container), nodeStructure: stageRoot });
  };

  // 存储各阶段数据，延迟渲染
  const stageData = {
    // 阶段一：数学与编程基础
    1: { title: '阶段一：数学与编程基础', categories: [ mathProb, optimization, programming, dataIntro, stage1Checkpoint ], expandLevel: 1 },
    // 阶段二：数据工程与传统机器学习
    2: { title: '阶段二：数据工程与传统机器学习', categories: [ dataIngest, dataPrep, featureEng, classicSL, unsupervised, modelSelect, stage2Checkpoint ], expandLevel: 1 },
    // 阶段三：模型评估与效果提升
    3: { title: '阶段三：模型评估与效果提升', categories: [ metrics, imbalance, featSelect, ensemble, hpo, explainability, robustness, stage3Checkpoint ], expandLevel: 1 },
    // 阶段四：深度学习与 MLOps 上线
    4: { title: '阶段四：深度学习与 MLOps 上线', categories: [ dlBasics, nnBlocks, trainingTricks, tasks, modelServing, mlops, stage4Checkpoint ], expandLevel: 1 },
    // 阶段五：职业化与研究进阶
    5: { title: '阶段五：职业化与研究进阶', categories: [ tracks, sysDesign, advancedTopics, dataGovern, fairPrivacy, engineering, careerShowcase, lifelong, stage5Checkpoint ], expandLevel: 1 }
  };

  const renderedStages = new Set();

  window.RenderStage = function(stageNum){
    if (renderedStages.has(stageNum)) return;
    
    const data = stageData[stageNum];
    if (!data) return;
    // Ensure container and tree have measurable layout
    const section = document.querySelector(`#stage-${stageNum}`);
    const treeSel = `#tree-${stageNum}`;
    const treeEl = document.querySelector(treeSel);
    const cleanups = [];

    if (section) {
      const s = getComputedStyle(section);
      if (s.display === 'none' || s.visibility === 'hidden') {
        const prev = { display: section.style.display, visibility: section.style.visibility, position: section.style.position, left: section.style.left };
        section.style.visibility = 'hidden';
        section.style.display = 'block';
        section.style.position = section.style.position || 'relative';
        section.style.left = section.style.left || '0';
        cleanups.push(() => { section.style.display = prev.display; section.style.visibility = prev.visibility; section.style.position = prev.position; section.style.left = prev.left; });
      }
    }
    if (treeEl) {
      const cs = getComputedStyle(treeEl);
      if (parseInt(cs.width, 10) === 0) {
        const prev = { visibility: treeEl.style.visibility, display: treeEl.style.display, position: treeEl.style.position, left: treeEl.style.left, width: treeEl.style.width };
        treeEl.style.visibility = 'hidden';
        treeEl.style.display = 'block';
        treeEl.style.position = 'absolute';
        treeEl.style.left = '-9999px';
        treeEl.style.width = '100%';
        cleanups.push(() => { treeEl.style.visibility = prev.visibility; treeEl.style.display = prev.display; treeEl.style.position = prev.position; treeEl.style.left = prev.left; treeEl.style.width = prev.width; });
      }
    }

    buildStage(treeSel, data.title, data.categories, data.expandLevel || 0);

    while (cleanups.length) { const fn = cleanups.pop(); try { fn(); } catch(e){} }
    renderedStages.add(stageNum);
  };

  window.RenderFrontendRoadmap = function(){
    // 不再预先渲染所有树，改为按需渲染
  };

  // 页面增强：卡片导航滚动、FAQ 折叠、进场动画
  window.EnhanceFrontendPage = function(){
    // 阶段卡片点击显示对应路线图
    const showStage = (stageNum) => {
      const targetStage = document.querySelector(`#stage-${stageNum}`);
      
      // 移除所有卡片的激活状态
      document.querySelectorAll('.card-btn').forEach(b => b.classList.remove('active'));
      // 激活当前卡片
      const currentBtn = document.querySelector(`.card-btn[data-stage="${stageNum}"]`);
      if (currentBtn) currentBtn.classList.add('active');
      
      // 隐藏所有阶段
      document.querySelectorAll('.stage').forEach(s => s.style.display = 'none');
      
      // 显示目标阶段
      if (targetStage) {
        targetStage.style.display = 'block';
        
        // 渲染该阶段的树（如果还未渲染）
        if (window.RenderStage) {
          window.RenderStage(parseInt(stageNum));
        }
      }
    };

    document.querySelectorAll('.card-btn[data-stage]').forEach(btn => {
      btn.addEventListener('click', () => {
        const stageNum = btn.getAttribute('data-stage');
        showStage(stageNum);
      });
    });

    // 默认显示第一个阶段
    setTimeout(() => {
      showStage('1');
    }, 500);

    // FAQ 手风琴
    document.querySelectorAll('.faq-item').forEach(item => {
      const q = item.querySelector('.faq-q');
      const a = item.querySelector('.faq-a');
      if (!q || !a) return;
      q.addEventListener('click', () => {
        const open = item.classList.toggle('open');
        q.setAttribute('aria-expanded', String(open));
      });
    });

    // reveal 进场动画（含 hero、faq、每个阶段）
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in');
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  };
})();
