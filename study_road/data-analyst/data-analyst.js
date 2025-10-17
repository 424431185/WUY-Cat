(function(){
  const chart = {
    container: "#tree",
    rootOrientation: "WEST",
    nodeAlign: "BOTTOM",
    siblingSeparation: 35,
    subTeeSeparation: 45,
    connectors: { type: 'curve' },
    animation: { nodeAnimation: "easeOutQuart", nodeSpeed: 300, connectorsAnimation: "easeOutQuart", connectorsSpeed: 300 },
    node: { collapsable: true }
  };

  // Helpers
  const Root = (text) => ({ text: { name: text }, HTMLclass: 'root', collapsable: true });
  const Yellow = (text) => ({ text: { name: text }, HTMLclass: 'yellow', collapsable: true, collapsed: true });
  const Item = (name) => ({ text: { name }, HTMLclass: 'brown small' });

  // ============ 阶段一：基础入门 ============
  const math = Yellow('数学与统计基础');
  math.children = [
    Item('描述性统计'),
    Item('概率论基础'),
    Item('线性代数入门'),
    Item('微积分基础')
  ];

  const excel = Yellow('Excel数据分析');
  excel.children = [
    Item('数据清洗与透视表'),
    Item('VLOOKUP/INDEX/MATCH'),
    Item('数据可视化'),
    Item('Excel公式与函数'),
    Item('Power Query入门')
  ];

  const sqlBasic = Yellow('SQL基础');
  sqlBasic.children = [
    Item('SELECT/WHERE/ORDER BY'),
    Item('JOIN多表查询'),
    Item('GROUP BY聚合'),
    Item('子查询与CTE'),
    Item('数据库设计基础')
  ];

  // ============ 阶段二：编程与工具 ============
  const python = Yellow('Python基础');
  python.children = [
    Item('Python语法基础'),
    Item('数据类型与控制流'),
    Item('函数与模块'),
    Item('文件操作'),
    Item('面向对象编程')
  ];

  const pandas = Yellow('Pandas数据处理');
  pandas.children = [
    Item('DataFrame操作'),
    Item('数据筛选与切片'),
    Item('数据合并与连接'),
    Item('数据透视与聚合'),
    Item('时间序列处理')
  ];

  const git = Yellow('版本控制');
  git.children = [
    Item('Git基础命令'),
    Item('分支与合并'),
    Item('GitHub/GitLab'),
    Item('协作工作流')
  ];

  const jupyter = Yellow('Jupyter环境');
  jupyter.children = [
    Item('Jupyter Notebook'),
    Item('代码组织与文档'),
    Item('虚拟环境管理'),
    Item('包管理：pip/conda')
  ];

  // ============ 阶段三：数据处理 ============
  const cleaning = Yellow('数据清洗');
  cleaning.children = [
    Item('缺失值处理'),
    Item('异常值检测'),
    Item('数据类型转换'),
    Item('重复数据处理'),
    Item('数据标准化')
  ];

  const transform = Yellow('数据转换');
  transform.children = [
    Item('特征提取'),
    Item('数据编码'),
    Item('数据分箱'),
    Item('数据归一化'),
    Item('数据聚合')
  ];

  const eda = Yellow('探索性数据分析');
  eda.children = [
    Item('数据分布分析'),
    Item('相关性分析'),
    Item('异常模式识别'),
    Item('数据可视化探索'),
    Item('假设验证')
  ];

  const sqlAdvanced = Yellow('SQL进阶');
  sqlAdvanced.children = [
    Item('窗口函数'),
    Item('复杂查询优化'),
    Item('存储过程'),
    Item('触发器与视图'),
    Item('索引优化')
  ];

  // ============ 阶段四：分析与可视化 ============
  const stats = Yellow('统计分析');
  stats.children = [
    Item('假设检验'),
    Item('方差分析'),
    Item('相关与回归分析'),
    Item('时间序列分析'),
    Item('A/B测试')
  ];

  const visualization = Yellow('数据可视化');
  visualization.children = [
    Item('Matplotlib基础'),
    Item('Seaborn高级图表'),
    Item('Plotly交互可视化'),
    Item('图表设计原则'),
    Item('配色与排版')
  ];

  const biTools = Yellow('BI工具');
  biTools.children = [
    Item('Tableau Desktop'),
    Item('Power BI'),
    Item('Looker/Superset'),
    Item('仪表板设计'),
    Item('数据讲故事')
  ];

  const metrics = Yellow('指标体系');
  metrics.children = [
    Item('北极星指标'),
    Item('漏斗分析'),
    Item('留存分析'),
    Item('RFM模型'),
    Item('用户生命周期价值')
  ];

  // ============ 阶段五：高级应用 ============
  const mlBasic = Yellow('机器学习基础');
  mlBasic.children = [
    Item('监督学习'),
    Item('无监督学习'),
    Item('模型评估'),
    Item('特征工程'),
    Item('scikit-learn')
  ];

  const bigData = Yellow('大数据技术');
  bigData.children = [
    Item('Hadoop/Spark基础'),
    Item('Hive数据仓库'),
    Item('数据湖概念'),
    Item('分布式计算'),
    Item('云平台：AWS/Azure/GCP')
  ];

  const automation = Yellow('自动化与工程化');
  automation.children = [
    Item('ETL流程自动化'),
    Item('定时任务调度'),
    Item('Airflow/Luigi'),
    Item('数据管道构建'),
    Item('报表自动化')
  ];

  const business = Yellow('业务分析');
  business.children = [
    Item('业务理解与建模'),
    Item('竞品分析'),
    Item('用户行为分析'),
    Item('运营数据分析'),
    Item('商业智能报告')
  ];

  const project = Yellow('项目实战');
  project.children = [
    Item('客户流失预测'),
    Item('销售预测分析'),
    Item('用户画像构建'),
    Item('推荐系统分析'),
    Item('营销效果评估')
  ];

  // 插入辅助函数
  const insertNextAtMiddle = (node, next) => {
    const list = node.children || (node.children = []);
    const mid = Math.floor(list.length / 2);
    list.splice(mid, 0, next);
  };

  const makeChart = (container) => ({
    ...chart,
    container
  });

  // 递归展开整棵子树
  const expandAll = (node) => {
    node.collapsed = false;
    if (node.children && node.children.length) {
      for (const child of node.children) expandAll(child);
    }
  };

  const buildStage = (container, title, categories, expandFlag = false) => {
    const stageRoot = Root(title);
    for (let i = 0; i < categories.length - 1; i++) {
      insertNextAtMiddle(categories[i], categories[i + 1]);
    }
    stageRoot.children = [ categories[0] ];
    if (expandFlag) expandAll(stageRoot);
    new Treant({ chart: makeChart(container), nodeStructure: stageRoot });
  };

  // 存储各阶段数据，延迟渲染
  const stageData = {
    1: { title: '阶段一：基础入门', categories: [ math, excel, sqlBasic ] },
    2: { title: '阶段二：编程与工具', categories: [ python, pandas, git, jupyter ] },
    3: { title: '阶段三：数据处理', categories: [ cleaning, transform, eda, sqlAdvanced ] },
    4: { title: '阶段四：分析与可视化', categories: [ stats, visualization, biTools, metrics ] },
    5: { title: '阶段五：高级应用', categories: [ mlBasic, bigData, automation, business, project ] }
  };

  const renderedStages = new Set();

  window.RenderStage = function(stageNum){
    if (renderedStages.has(stageNum)) return;
    
    const data = stageData[stageNum];
    if (!data) return;
    
    buildStage(`#tree-${stageNum}`, data.title, data.categories, true);
    renderedStages.add(stageNum);
  };

  window.RenderDataAnalystRoadmap = function(){
    // 不再预先渲染所有树，改为按需渲染
  };

  // 页面增强：卡片导航滚动、FAQ 折叠、进场动画
  window.EnhanceDataAnalystPage = function(){
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
