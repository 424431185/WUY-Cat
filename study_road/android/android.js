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
  const kotlin = Yellow('Kotlin语言');
  kotlin.children = [
    Item('基础语法'),
    Item('变量与数据类型'),
    Item('控制流'),
    Item('函数与Lambda'),
    Item('面向对象'),
    Item('协程基础')
  ];

  const ide = Yellow('开发环境');
  ide.children = [
    Item('Android Studio'),
    Item('Gradle构建系统'),
    Item('AVD模拟器'),
    Item('调试工具'),
    Item('版本控制：Git')
  ];

  const fundamentals = Yellow('Android基础');
  fundamentals.children = [
    Item('Android架构'),
    Item('应用结构'),
    Item('Manifest文件'),
    Item('资源管理'),
    Item('应用生命周期')
  ];

  // ============ 阶段二：核心组件 ============
  const components = Yellow('应用组件');
  components.children = [
    Item('Activity'),
    Item('Fragment'),
    Item('Service'),
    Item('Broadcast Receiver'),
    Item('Content Provider'),
    Item('Intent')
  ];

  const layouts = Yellow('布局系统');
  layouts.children = [
    Item('LinearLayout'),
    Item('RelativeLayout'),
    Item('ConstraintLayout'),
    Item('FrameLayout'),
    Item('CoordinatorLayout'),
    Item('RecyclerView')
  ];

  const uiBasics = Yellow('UI基础');
  uiBasics.children = [
    Item('TextView / EditText'),
    Item('Button / ImageView'),
    Item('ListView / GridView'),
    Item('Toolbar / AppBar'),
    Item('Dialog / Toast'),
    Item('Menu')
  ];

  const lifecycle = Yellow('生命周期');
  lifecycle.children = [
    Item('Activity生命周期'),
    Item('Fragment生命周期'),
    Item('Lifecycle-Aware组件'),
    Item('ViewModel'),
    Item('LiveData')
  ];

  // ============ 阶段三：界面与导航 ============
  const compose = Yellow('Jetpack Compose');
  compose.children = [
    Item('Compose基础'),
    Item('组合函数'),
    Item('状态管理'),
    Item('Material Design 3'),
    Item('动画与手势'),
    Item('主题与样式')
  ];

  const navigation = Yellow('导航');
  navigation.children = [
    Item('Navigation Component'),
    Item('Fragment导航'),
    Item('底部导航'),
    Item('抽屉导航'),
    Item('Deep Links'),
    Item('Safe Args')
  ];

  const material = Yellow('Material Design');
  material.children = [
    Item('Material组件'),
    Item('主题与配色'),
    Item('动画与过渡'),
    Item('响应式布局'),
    Item('暗色模式')
  ];

  const advancedUI = Yellow('高级UI');
  advancedUI.children = [
    Item('自定义View'),
    Item('Canvas绘图'),
    Item('动画API'),
    Item('触摸事件'),
    Item('手势处理')
  ];

  // ============ 阶段四：架构与数据 ============
  const architecture = Yellow('架构模式');
  architecture.children = [
    Item('MVVM架构'),
    Item('MVI架构'),
    Item('Clean Architecture'),
    Item('Repository模式'),
    Item('依赖注入：Hilt/Koin')
  ];

  const storage = Yellow('数据存储');
  storage.children = [
    Item('SharedPreferences'),
    Item('Room数据库'),
    Item('DataStore'),
    Item('文件存储'),
    Item('SQLite')
  ];

  const network = Yellow('网络通信');
  network.children = [
    Item('Retrofit'),
    Item('OkHttp'),
    Item('RESTful API'),
    Item('JSON解析'),
    Item('图片加载：Glide/Coil')
  ];

  const async = Yellow('异步编程');
  async.children = [
    Item('Kotlin协程'),
    Item('Flow'),
    Item('挂起函数'),
    Item('并发处理'),
    Item('WorkManager')
  ];

  // ============ 阶段五：测试与发布 ============
  const testing = Yellow('测试');
  testing.children = [
    Item('单元测试：JUnit'),
    Item('UI测试：Espresso'),
    Item('集成测试'),
    Item('Mock测试：Mockk'),
    Item('测试覆盖率')
  ];

  const debugging = Yellow('调试与优化');
  debugging.children = [
    Item('Logcat日志'),
    Item('断点调试'),
    Item('内存分析'),
    Item('性能优化'),
    Item('电池优化'),
    Item('APK优化')
  ];

  const google = Yellow('Google服务');
  google.children = [
    Item('Firebase'),
    Item('Google Maps'),
    Item('Google Play服务'),
    Item('Analytics分析'),
    Item('Crashlytics')
  ];

  const distribution = Yellow('发布与分发');
  distribution.children = [
    Item('签名APK'),
    Item('Google Play Console'),
    Item('应用商店优化'),
    Item('版本管理'),
    Item('灰度发布')
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
    1: { title: '阶段一：基础入门', categories: [ kotlin, ide, fundamentals ] },
    2: { title: '阶段二：核心组件', categories: [ components, layouts, uiBasics, lifecycle ] },
    3: { title: '阶段三：界面与导航', categories: [ compose, navigation, material, advancedUI ] },
    4: { title: '阶段四：架构与数据', categories: [ architecture, storage, network, async ] },
    5: { title: '阶段五：测试与发布', categories: [ testing, debugging, google, distribution ] }
  };

  const renderedStages = new Set();

  window.RenderStage = function(stageNum){
    if (renderedStages.has(stageNum)) return;
    
    const data = stageData[stageNum];
    if (!data) return;
    
    buildStage(`#tree-${stageNum}`, data.title, data.categories, true);
    renderedStages.add(stageNum);
  };

  window.RenderAndroidRoadmap = function(){
    // 不再预先渲染所有树，改为按需渲染
  };

  // 页面增强：卡片导航滚动、FAQ 折叠、进场动画
  window.EnhanceAndroidPage = function(){
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
