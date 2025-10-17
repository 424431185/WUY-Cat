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

  // Root factory per stage will be used later

  // Columns
  const html = Yellow('HTML 与语义化');
  html.children = [
    Item('语义标签与可访问性'),
    Item('表单与校验'),
    Item('多媒体与画布 (Audio/Video/Canvas)')
  ];

  const css = Yellow('CSS 与布局');
  css.children = [
    Item('选择器与层叠'),
    Item('盒模型与BFC'),
    Item('Flex 与 Grid 布局'),
    Item('响应式与媒体查询')
  ];

  const js = Yellow('JavaScript 基础');
  js.children = [
    Item('ES6+ 语法'),
    Item('作用域与闭包'),
    Item('原型与面向对象'),
    Item('异步：Promise/Async/Await')
  ];

  const browser = Yellow('浏览器与运行时');
  browser.children = [
    Item('DOM/BOM 与事件模型'),
    Item('存储：Cookie/LocalStorage/IndexedDB'),
    Item('网络：Fetch/XHR/CORS/缓存'),
    Item('渲染与回流重绘')
  ];

  const vcs = Yellow('版本控制与协作');
  vcs.children = [
    Item('Git 基础与分支策略'),
    Item('提交规范与变更日志 (Conventional Commits)'),
    Item('代码评审与拉取请求')
  ];

  const pkg = Yellow('包管理与模块化');
  pkg.children = [
    Item('npm/yarn/pnpm'),
    Item('ES Modules / CommonJS'),
    Item('依赖与语义化版本')
  ];

  const build = Yellow('构建与工程化');
  build.children = [
    Item('构建工具：Vite/Webpack/Rollup/ESBuild'),
    Item('转译与兼容：Babel/PostCSS'),
    Item('代码分割与懒加载'),
    Item('环境变量与多环境配置')
  ];

  const framework = Yellow('框架与生态');
  framework.children = [
    Item('React / Vue / Angular'),
    Item('路由：React Router / Vue Router'),
    Item('表单与校验'),
    Item('组件库与设计系统')
  ];

  const state = Yellow('状态管理');
  state.children = [
    Item('React Hooks/Context'),
    Item('Redux/MobX/Zustand/Pinia/Vuex'),
    Item('服务器状态：React Query / SWR')
  ];

  const ts = Yellow('类型系统');
  ts.children = [
    Item('TypeScript 基础类型'),
    Item('类型推断与泛型'),
    Item('声明文件与编译配置')
  ];

  const style = Yellow('样式工程');
  style.children = [
    Item('Sass/Less/PostCSS'),
    Item('CSS Modules/Tailwind CSS'),
    Item('CSS-in-JS 与主题化')
  ];

  const test = Yellow('测试与质量');
  test.children = [
    Item('单元测试：Jest/Vitest'),
    Item('组件测试：Testing Library'),
    Item('端到端：Cypress/Playwright'),
    Item('代码质量：ESLint/Prettier/Stylelint')
  ];

  const perf = Yellow('性能优化');
  perf.children = [
    Item('关键指标：LCP/CLS/TTI/TBT'),
    Item('资源与图片优化'),
    Item('缓存与CDN策略'),
    Item('监控与分析：Lighthouse')
  ];

  const security = Yellow('安全');
  security.children = [
    Item('XSS/CSRF 防护'),
    Item('内容安全策略 CSP'),
    Item('HTTPS/证书与加密')
  ];

  const ssr = Yellow('SSR / SSG 与同构');
  ssr.children = [
    Item('Next.js / Nuxt.js'),
    Item('静态导出与增量静态再生'),
    Item('数据获取与缓存策略')
  ];

  const mobile = Yellow('移动端与跨端');
  mobile.children = [
    Item('响应式与视口适配'),
    Item('React Native / Flutter 基础'),
    Item('小程序与WebView')
  ];

  const viz = Yellow('数据可视化');
  viz.children = [
    Item('SVG/Canvas 基础'),
    Item('ECharts / D3.js'),
    Item('可视化交互与性能')
  ];

  const micro = Yellow('微前端');
  micro.children = [
    Item('模块联邦 Module Federation'),
    Item('qiankun 等运行时方案'),
    Item('应用拆分与集成')
  ];

  const deploy = Yellow('部署与运维');
  deploy.children = [
    Item('静态托管：Vercel/Netlify'),
    Item('Nginx 基础与缓存'),
    Item('容器化：Docker'),
    Item('CI/CD：GitHub Actions/Jenkins')
  ];

  const observe = Yellow('监控与可观测性');
  observe.children = [
    Item('错误上报：Sentry'),
    Item('性能采集：RUM/Perf API'),
    Item('日志与埋点')
  ];

  const soft = Yellow('职业与软技能');
  soft.children = [
    Item('需求分析与沟通协作'),
    Item('文档与知识沉淀'),
    Item('持续学习与领域拓展')
  ];

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
    1: { title: '阶段一：基础入门', categories: [ html, css, js, browser ] },
    2: { title: '阶段二：工程与框架', categories: [ vcs, pkg, build, framework, state, ts, style ] },
    3: { title: '阶段三：质量与进阶', categories: [ test, perf, security, ssr, mobile, viz, micro ] },
    4: { title: '阶段四：上线与运维', categories: [ deploy, observe ] },
    5: { title: '阶段五：职业与软技能', categories: [ soft ] }
  };

  const renderedStages = new Set();

  window.RenderStage = function(stageNum){
    if (renderedStages.has(stageNum)) return;
    
    const data = stageData[stageNum];
    if (!data) return;
    
    buildStage(`#tree-${stageNum}`, data.title, data.categories, true);
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
