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
  const cs = Yellow('计算机基础');
  cs.children = [
    Item('操作系统与进程/线程/协程'),
    Item('计算机网络：TCP/IP/HTTP'),
    Item('数据结构与算法'),
    Item('设计模式与面向对象'),
    Item('编译原理基础')
  ];

  const lang = Yellow('编程语言');
  lang.children = [
    Item('Python：基础语法/装饰器/异步'),
    Item('Java：JVM/GC/多线程'),
    Item('Go：Goroutine/Channel/并发'),
    Item('JavaScript/Node.js：事件循环'),
    Item('类型系统与异常处理')
  ];

  const web = Yellow('Web 基础');
  web.children = [
    Item('HTTP/1.1 & HTTP/2 & HTTP/3'),
    Item('HTTPS/TLS/证书'),
    Item('Session/Cookie/Token'),
    Item('CORS 与跨域处理'),
    Item('RESTful 设计原则')
  ];

  const git = Yellow('版本控制');
  git.children = [
    Item('Git 基础与分支策略'),
    Item('代码审查与协作规范'),
    Item('提交规范与变更日志')
  ];

  // ============ 阶段二：核心技术 ============
  const framework = Yellow('后端框架');
  framework.children = [
    Item('Spring Boot / Spring Cloud'),
    Item('Django / FastAPI / Flask'),
    Item('Express.js / Koa / Nest.js'),
    Item('Gin / Fiber / Echo'),
    Item('依赖注入与配置管理'),
    Item('中间件与拦截器')
  ];

  const db = Yellow('关系型数据库');
  db.children = [
    Item('SQL 基础与高级查询'),
    Item('事务：ACID 与隔离级别'),
    Item('MySQL / PostgreSQL'),
    Item('索引优化与查询调优'),
    Item('主从复制与读写分离'),
    Item('分库分表与分区')
  ];

  const nosql = Yellow('NoSQL 与缓存');
  nosql.children = [
    Item('Redis：数据结构/持久化/集群'),
    Item('MongoDB：文档存储/索引'),
    Item('Elasticsearch：全文搜索'),
    Item('缓存策略：LRU/LFU/过期'),
    Item('缓存一致性与穿透/击穿/雪崩')
  ];

  const mq = Yellow('消息队列');
  mq.children = [
    Item('Kafka：分区/副本/消费者组'),
    Item('RabbitMQ：交换机/队列/路由'),
    Item('消息可靠性与幂等性'),
    Item('延时队列与死信队列'),
    Item('事务消息与最终一致性')
  ];

  const orm = Yellow('ORM 与数据访问');
  orm.children = [
    Item('MyBatis / Hibernate / JPA'),
    Item('SQLAlchemy / Django ORM'),
    Item('TypeORM / Prisma / Sequelize'),
    Item('GORM'),
    Item('连接池与事务管理')
  ];

  // ============ 阶段三：API与质量 ============
  const api = Yellow('API 设计');
  api.children = [
    Item('REST API 规范与版本化'),
    Item('GraphQL：查询/变更/订阅'),
    Item('gRPC / Protocol Buffers'),
    Item('API 文档：Swagger / OpenAPI'),
    Item('接口限流与熔断'),
    Item('响应设计与错误码')
  ];

  const auth = Yellow('认证与授权');
  auth.children = [
    Item('JWT / OAuth2.0 / OIDC'),
    Item('SSO 单点登录'),
    Item('RBAC 与权限模型'),
    Item('密码加密：bcrypt/scrypt'),
    Item('多因素认证（MFA）')
  ];

  const security = Yellow('Web 安全');
  security.children = [
    Item('SQL注入 / XSS / CSRF 防护'),
    Item('输入校验与输出转义'),
    Item('加密算法与密钥管理'),
    Item('HTTPS 与证书配置'),
    Item('安全头：CSP/HSTS/X-Frame')
  ];

  const test = Yellow('测试');
  test.children = [
    Item('单元测试：JUnit/pytest/Jest'),
    Item('集成测试与E2E测试'),
    Item('Mock 与测试替身'),
    Item('测试覆盖率与质量门禁'),
    Item('性能测试：JMeter/Locust'),
    Item('契约测试：Pact')
  ];

  const quality = Yellow('代码质量');
  quality.children = [
    Item('静态分析：SonarQube/ESLint'),
    Item('代码审查与规范'),
    Item('重构与技术债管理')
  ];

  // ============ 阶段四：部署与运维 ============
  const docker = Yellow('容器化');
  docker.children = [
    Item('Docker：镜像/容器/网络/卷'),
    Item('Dockerfile 最佳实践'),
    Item('Docker Compose 编排'),
    Item('镜像优化与多阶段构建')
  ];

  const k8s = Yellow('容器编排');
  k8s.children = [
    Item('Kubernetes：Pod/Service/Deployment'),
    Item('配置管理：ConfigMap/Secret'),
    Item('存储：PV/PVC/StorageClass'),
    Item('网络与Ingress'),
    Item('Helm 包管理'),
    Item('服务网格：Istio 基础')
  ];

  const cicd = Yellow('CI/CD');
  cicd.children = [
    Item('GitHub Actions / GitLab CI'),
    Item('Jenkins 流水线'),
    Item('自动化测试与部署'),
    Item('蓝绿部署 / 金丝雀发布'),
    Item('回滚策略')
  ];

  const monitor = Yellow('监控与日志');
  monitor.children = [
    Item('日志收集：ELK / Loki'),
    Item('指标监控：Prometheus / Grafana'),
    Item('链路追踪：Jaeger / Zipkin'),
    Item('告警与通知机制'),
    Item('可观测性三支柱')
  ];

  const infra = Yellow('基础设施');
  infra.children = [
    Item('Linux 系统管理'),
    Item('Nginx / Apache 配置'),
    Item('负载均衡与反向代理'),
    Item('DNS 与域名解析'),
    Item('CDN 与边缘计算')
  ];

  // ============ 阶段五：架构与进阶 ============
  const arch = Yellow('架构模式');
  arch.children = [
    Item('分层架构 / 六边形架构'),
    Item('DDD 领域驱动设计'),
    Item('微服务架构与拆分'),
    Item('事件驱动架构'),
    Item('CQRS 与 Event Sourcing'),
    Item('Serverless 与 FaaS')
  ];

  const distributed = Yellow('分布式系统');
  distributed.children = [
    Item('CAP 定理 与 BASE 理论'),
    Item('分布式事务：2PC/3PC/TCC/Saga'),
    Item('分布式锁：Redis/ZooKeeper'),
    Item('一致性算法：Raft/Paxos'),
    Item('服务注册与发现'),
    Item('配置中心：Nacos/Consul')
  ];

  const perf = Yellow('性能优化');
  perf.children = [
    Item('数据库查询优化'),
    Item('缓存策略与预热'),
    Item('异步处理与队列'),
    Item('连接池与资源管理'),
    Item('CDN 与静态资源优化'),
    Item('性能分析工具与APM')
  ];

  const ha = Yellow('高可用与容错');
  ha.children = [
    Item('限流：令牌桶/漏桶'),
    Item('熔断与降级'),
    Item('超时与重试策略'),
    Item('故障隔离与舱壁模式'),
    Item('灰度发布与A/B测试'),
    Item('容灾与备份策略')
  ];

  const soft = Yellow('软技能与实践');
  soft.children = [
    Item('需求分析与技术选型'),
    Item('文档编写与知识沉淀'),
    Item('Code Review 与团队协作'),
    Item('故障排查与问题定位'),
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
    1: { title: '阶段一：基础入门', categories: [ cs, lang, web, git ] },
    2: { title: '阶段二：核心技术', categories: [ framework, db, nosql, mq, orm ] },
    3: { title: '阶段三：API与质量', categories: [ api, auth, security, test, quality ] },
    4: { title: '阶段四：部署与运维', categories: [ docker, k8s, cicd, monitor, infra ] },
    5: { title: '阶段五：架构与进阶', categories: [ arch, distributed, perf, ha, soft ] }
  };

  const renderedStages = new Set();

  window.RenderStage = function(stageNum){
    if (renderedStages.has(stageNum)) return;
    
    const data = stageData[stageNum];
    if (!data) return;
    
    buildStage(`#tree-${stageNum}`, data.title, data.categories, true);
    renderedStages.add(stageNum);
  };

  window.RenderBackendRoadmap = function(){
    // 不再预先渲染所有树，改为按需渲染
  };

  // 页面增强：卡片导航滚动、FAQ 折叠、进场动画
  window.EnhanceBackendPage = function(){
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
