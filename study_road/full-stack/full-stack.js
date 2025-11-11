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
  const Checkpoint = (name) => ({ text: { name }, HTMLclass: 'checkpoint' });

  // ============ 阶段一：前端基础 ============
  const html = Yellow('HTML');
  html.children = [
    Item('语义化标签'),
    Item('表单与输入'),
    Item('多媒体元素'),
    Item('可访问性基础')
  ];

  const css = Yellow('CSS');
  css.children = [
    Item('选择器与层叠'),
    Item('盒模型与布局'),
    Item('Flexbox / Grid'),
    Item('响应式设计'),
    Item('动画与过渡')
  ];

  const javascript = Yellow('JavaScript');
  javascript.children = [
    Item('ES6+ 语法'),
    Item('DOM 操作'),
    Item('事件处理'),
    Item('异步编程：Promise/Async'),
    Item('Fetch API / AJAX')
  ];

  const checkpoint1 = Checkpoint('检查点：静态网页');
  checkpoint1.children = [
    Item('创建静态个人页面'),
    Item('实现响应式布局')
  ];

  const checkpoint2 = Checkpoint('检查点：交互性');
  checkpoint2.children = [
    Item('添加动态交互功能'),
    Item('表单验证与处理')
  ];

  // ============ 阶段二：前端进阶 ============
  const git = Yellow('Git 与协作');
  git.children = [
    Item('Git 基础与分支'),
    Item('GitHub / GitLab'),
    Item('Pull Request 与 Code Review'),
    Item('协作工作流')
  ];

  const packageManager = Yellow('包管理');
  packageManager.children = [
    Item('npm / yarn / pnpm'),
    Item('package.json 配置'),
    Item('依赖管理'),
    Item('私有包与 Monorepo')
  ];

  const frameworks = Yellow('前端框架');
  frameworks.children = [
    Item('React：组件/Hooks/Context'),
    Item('Vue：响应式/组合式API'),
    Item('Angular：依赖注入/RxJS'),
    Item('路由：React Router / Vue Router'),
    Item('状态管理：Redux/Vuex/Pinia')
  ];

  const styling = Yellow('样式方案');
  styling.children = [
    Item('Tailwind CSS'),
    Item('CSS Modules'),
    Item('Styled Components'),
    Item('Sass / Less')
  ];

  const build = Yellow('构建工具');
  build.children = [
    Item('Webpack / Vite / Rollup'),
    Item('Babel 与转译'),
    Item('代码分割与懒加载'),
    Item('ESLint / Prettier')
  ];

  const checkpoint3 = Checkpoint('检查点：前端应用');
  checkpoint3.children = [
    Item('构建 SPA 应用'),
    Item('组件化开发')
  ];

  // ============ 阶段三：后端开发 ============
  const nodejs = Yellow('Node.js');
  nodejs.children = [
    Item('事件循环与异步'),
    Item('模块系统'),
    Item('fs / path / http 模块'),
    Item('Express / Koa / Fastify'),
    Item('中间件与路由')
  ];

  const database = Yellow('数据库');
  database.children = [
    Item('PostgreSQL / MySQL'),
    Item('SQL 基础与高级查询'),
    Item('MongoDB / NoSQL'),
    Item('Redis 缓存'),
    Item('ORM：Prisma/TypeORM/Sequelize')
  ];

  const api = Yellow('API 开发');
  api.children = [
    Item('RESTful API 设计'),
    Item('GraphQL 基础'),
    Item('API 文档：Swagger'),
    Item('认证：JWT / OAuth2'),
    Item('请求验证与错误处理')
  ];

  const checkpoint4 = Checkpoint('检查点：CLI 应用');
  checkpoint4.children = [
    Item('创建命令行工具'),
    Item('参数解析与配置')
  ];

  const checkpoint5 = Checkpoint('检查点：简单 CRUD 应用');
  checkpoint5.children = [
    Item('实现增删改查接口'),
    Item('数据验证与持久化')
  ];

  // ============ 阶段四：全栈集成 ============
  const fullstackIntegration = Yellow('前后端整合');
  fullstackIntegration.children = [
    Item('API 调用与状态管理'),
    Item('React Query / SWR'),
    Item('错误处理与加载状态'),
    Item('表单提交与文件上传'),
    Item('认证流程实现')
  ];

  const realtime = Yellow('实时通信');
  realtime.children = [
    Item('WebSocket'),
    Item('Socket.io'),
    Item('Server-Sent Events'),
    Item('实时聊天/通知')
  ];

  const testing = Yellow('测试');
  testing.children = [
    Item('单元测试：Jest/Vitest'),
    Item('前端测试：Testing Library'),
    Item('API 测试：Supertest'),
    Item('E2E 测试：Playwright/Cypress')
  ];

  const security = Yellow('安全');
  security.children = [
    Item('XSS / CSRF 防护'),
    Item('SQL 注入防护'),
    Item('密码加密：bcrypt'),
    Item('HTTPS / CORS 配置'),
    Item('敏感数据处理')
  ];

  const checkpoint6 = Checkpoint('检查点：完整应用');
  checkpoint6.children = [
    Item('开发全栈项目'),
    Item('实现认证与授权'),
    Item('性能优化')
  ];

  // ============ 阶段五：DevOps与运维 ============
  const docker = Yellow('容器化');
  docker.children = [
    Item('Docker 基础'),
    Item('Dockerfile 编写'),
    Item('Docker Compose'),
    Item('多容器编排')
  ];

  const deployment = Yellow('部署');
  deployment.children = [
    Item('Vercel / Netlify (前端)'),
    Item('Heroku / Railway (后端)'),
    Item('AWS：EC2/RDS/S3'),
    Item('Nginx 反向代理'),
    Item('域名与 SSL 证书')
  ];

  const cicd = Yellow('CI/CD');
  cicd.children = [
    Item('GitHub Actions'),
    Item('GitLab CI'),
    Item('自动化测试'),
    Item('自动化部署'),
    Item('环境变量管理')
  ];

  const monitoring = Yellow('监控与日志');
  monitoring.children = [
    Item('日志收集与分析'),
    Item('错误监控：Sentry'),
    Item('性能监控：New Relic'),
    Item('日志管理：Winston/Pino'),
    Item('告警机制')
  ];

  const infrastructure = Yellow('基础设施');
  infrastructure.children = [
    Item('Linux 基础'),
    Item('云服务：AWS/GCP/Azure'),
    Item('VPC / 安全组'),
    Item('负载均衡'),
    Item('Infrastructure as Code：Terraform'),
    Item('配置管理：Ansible')
  ];

  const checkpoint7 = Checkpoint('检查点：部署上线');
  checkpoint7.children = [
    Item('应用完整部署流程'),
    Item('配置域名与HTTPS'),
    Item('监控与告警设置')
  ];

  const bestPractices = Yellow('最佳实践');
  bestPractices.children = [
    Item('代码规范与 Code Review'),
    Item('文档编写'),
    Item('技术债管理'),
    Item('性能优化策略'),
    Item('持续学习与技术追踪')
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
    1: { title: '阶段一：前端基础', categories: [ html, css, javascript, checkpoint1, checkpoint2 ] },
    2: { title: '阶段二：前端进阶', categories: [ git, packageManager, frameworks, styling, build, checkpoint3 ] },
    3: { title: '阶段三：后端开发', categories: [ nodejs, database, api, checkpoint4, checkpoint5 ] },
    4: { title: '阶段四：全栈集成', categories: [ fullstackIntegration, realtime, testing, security, checkpoint6 ] },
    5: { title: '阶段五：DevOps与运维', categories: [ docker, deployment, cicd, monitoring, infrastructure, checkpoint7, bestPractices ] }
  };

  const renderedStages = new Set();

  window.RenderStage = function(stageNum){
    if (renderedStages.has(stageNum)) return;
    
    const data = stageData[stageNum];
    if (!data) return;
    
    buildStage(`#tree-${stageNum}`, data.title, data.categories, true);
    renderedStages.add(stageNum);
  };

  window.RenderFullStackRoadmap = function(){
    // 不再预先渲染所有树，改为按需渲染
  };

  // 页面增强：卡片导航滚动、FAQ 折叠、进场动画
  window.EnhanceFullStackPage = function(){
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
