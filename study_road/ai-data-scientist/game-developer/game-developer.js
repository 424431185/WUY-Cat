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

  // Root factory per stage will be used later

  // Stage 1: 计算基础与工具链（游戏开发者）
  const mathBase = Yellow('数学基础');
  mathBase.children = [
    Item('线性代数：向量/矩阵/线性变换'),
    Item('几何与仿射空间、坐标系'),
    Item('三角函数与微积分'),
    Item('数值稳定性与误差')
  ];

  const gameMath = Yellow('游戏数学');
  gameMath.children = [
    Item('四元数与旋转、插值与曲线'),
    Item('随机性与概率统计'),
    Item('相机/世界/物体坐标变换')
  ];

  const csFund = Yellow('计算机基础');
  csFund.children = [
    Item('数据结构与算法'),
    Item('操作系统/内存/并发'),
    Item('计算机图形学入门')
  ];

  const languages = Yellow('编程语言');
  languages.children = [
    Item('C/C++ 基础与调试'),
    Item('C#（Unity）'),
    Item('脚本：Lua / Python'),
    Item('代码风格与单元测试')
  ];

  const toolchain = Yellow('工具链');
  toolchain.children = [
    Item('Git/分支/PR 流程'),
    Item('构建：CMake/Gradle/MSBuild'),
    Item('包与依赖管理'),
    Item('IDE/Profiler/内存工具')
  ];

  // Stage 2: 引擎架构与 Runtime
  const engineIntro = Yellow('游戏引擎');
  engineIntro.children = [
    Item('Unity / Unreal / 自研引擎'),
    Item('项目结构与资源管线')
  ];

  const engineSubsystems = Yellow('引擎子系统');
  engineSubsystems.children = [
    Item('输入系统'),
    Item('时间与更新（Game Loop）'),
    Item('事件/消息系统'),
    Item('场景/实体组件（ECS）')
  ];

  const assetsSerialization = Yellow('资源与序列化');
  assetsSerialization.children = [
    Item('资产导入与打包'),
    Item('资源热更'),
    Item('数据驱动：JSON/自定义格式')
  ];

  const platformInterfaces = Yellow('平台与接口');
  platformInterfaces.children = [
    Item('操作系统接口'),
    Item('线程与 Job System'),
    Item('文件 I/O 与网络 I/O')
  ];

  const gfxApi = Yellow('图形 API 基础');
  gfxApi.children = [
    Item('OpenGL / DirectX / Vulkan / Metal'),
    Item('着色器语言：GLSL / HLSL')
  ];

  // Stage 3: 游戏系统与 AI 物理
  const gameplayMechanics = Yellow('玩法与机制');
  gameplayMechanics.children = [
    Item('Game Loop 与核心循环'),
    Item('相机/角色控制'),
    Item('UI / HUD'),
    Item('交互与反馈')
  ];

  const physicsSystem = Yellow('物理系统');
  physicsSystem.children = [
    Item('碰撞检测'),
    Item('刚体 / 约束'),
    Item('粒子与布料'),
    Item('数值稳定、调参与迭代')
  ];

  const aiSystem = Yellow('AI 系统');
  aiSystem.children = [
    Item('有限状态机 FSM'),
    Item('行为树 BT'),
    Item('寻路：A* / NavMesh'),
    Item('群集与 Steering')
  ];

  const animationAudio = Yellow('动画与音频');
  animationAudio.children = [
    Item('骨骼 / 蒙皮、状态机、混合树'),
    Item('音频引擎、空间化与混响')
  ];

  const netAndSave = Yellow('网络与存档');
  netAndSave.children = [
    Item('会话与同步：帧同步 / 状态同步'),
    Item('反作弊要点'),
    Item('存档与版本兼容')
  ];

  const stage3Checkpoint = Yellow('检查点：可玩性 Demo');
  stage3Checkpoint.children = [
    Item('核心循环可玩性 Demo'),
    Item('简单关卡与敌人 AI'),
    Item('基础物理交互')
  ];


  const insertNextAtMiddle = (node, next) => {
    const list = node.children || (node.children = []);
    const mid = Math.floor(list.length / 2);
    list.splice(mid, 0, next);
  };

  // ------------------ Stage 3: 质量与性能提升 ------------------
  const testSys = Yellow('测试体系');
  testSys.children = [
    Item('单元：金字塔、Mock/Stub/Fake、覆盖率阈值'),
    Item('集成：容器化依赖 Testcontainers/内存DB'),
    Item('端到端：黑盒/冒烟、稳定性（重试/隔离）'),
    Item('持续回归：变更触发、拆分与并行'),
    Item('Checkpoint：质量基线')
  ];

  const codeLint = Yellow('代码规范与静态检查');
  codeLint.children = [
    Item('Lint/格式化与预提交钩子'),
    Item('静态分析：类型/复杂度/安全'),
    Item('评审清单与自动化规则')
  ];

  const observability = Yellow('日志与可观测性');
  observability.children = [
    Item('结构化日志：级别/字段/采样'),
    Item('指标与追踪：RED/USE、OpenTelemetry、告警阈值'),
    Item('可视化：仪表盘、SLO/SLI、错误预算')
  ];

  const securityHardening = Yellow('安全加固与鉴权');
  securityHardening.children = [
    Item('鉴权/授权：Session/JWT/OAuth2、RBAC/ABAC'),
    Item('输入校验/输出编码、防注入与依赖漏洞（SCA）'),
    Item('配置与密钥管理：.env/Secrets/分环境密钥'),
    Item('Checkpoint：安全与鉴权完善')
  ];

  const performance = Yellow('性能优化与缓存');
  performance.children = [
    Item('Profiling：CPU/内存/阻塞点'),
    Item('数据库：索引/执行计划/连接池/慢查询'),
    Item('缓存：多级缓存、一致性与热点防护'),
    Item('并发与限流：排队/降级/熔断/重试退避'),
    Item('Checkpoint：性能闭环')
  ];

  const ciQuality = Yellow('CI 与质量门禁');
  ciQuality.children = [
    Item('流水线：Lint→Test→Build→扫描→签名'),
    Item('门禁：覆盖率/静态检查/SAST/SCA'),
    Item('结果可视化：报告/工件/变更日志')
  ];

  const releaseRollback = Yellow('发布与回滚');
  releaseRollback.children = [
    Item('蓝绿/金丝雀、版本兼容策略（DB/接口）'),
    Item('可回滚设计：幂等/特性开关/迁移回滚'),
    Item('运行前检查：健康检查/探针/预热与缓存'),
    Item('Checkpoint：发布演练')
  ];

  // ------------------ Stage 4: 部署与运维 ------------------
  const buildRelease = Yellow('构建与发布');
  buildRelease.children = [
    Item('可重现构建、SBOM/签名、语义化版本'),
    Item('工件管理：制品库/镜像仓库/缓存'),
    Item('容器化构建：多阶段 Dockerfile、12-Factor')
  ];

  const containerOrchestration = Yellow('容器与编排');
  containerOrchestration.children = [
    Item('镜像最佳实践：基础镜像/非root/瘦身/扫描'),
    Item('K8s 对象：Deployment/Service/Ingress/Config/Secret'),
    Item('健康探针与资源：liveness/readiness/startup、请求/限制'),
    Item('服务发现与网络：LB/Ingress/DNS/网络策略')
  ];

  const envGovernance = Yellow('环境与策略');
  envGovernance.children = [
    Item('多环境与配置：dev/staging/prod、配置中心/Secret/Flag'),
    Item('部署策略：蓝绿/金丝雀/滚动、DB 迁移前后向兼容'),
    Item('回滚机制：快速回滚/数据回滚、变更冻结与窗口')
  ];

  const monitorAlert = Yellow('可观测性与告警');
  monitorAlert.children = [
    Item('指标/日志/追踪：RED/USE、结构化日志、TraceID'),
    Item('监控体系：Prometheus/Grafana/ELK/Tempo/Alertmanager'),
    Item('告警设计：阈值/异常、抑制/静默、值班与升级')
  ];

  const scalingHA = Yellow('伸缩与高可用');
  scalingHA.children = [
    Item('自动伸缩：HPA/VPA、CPU/内存/自定义指标'),
    Item('高可用：多副本、反亲和/拓扑、读写分离、限流熔断'),
    Item('Service Mesh（可选）：mTLS/流量治理/可观测')
  ];

  const cdGitOps = Yellow('CD 与 GitOps');
  cdGitOps.children = [
    Item('CD 流水线：构建→部署→验证→回滚自动化'),
    Item('GitOps：声明式、ArgoCD/Flux、环境分支策略'),
    Item('渐进式交付：金丝雀自动化、指标守门 SLO/SLA')
  ];

  const drResilience = Yellow('灾备与韧性');
  drResilience.children = [
    Item('备份与恢复：RPO/RTO、快照/增量、跨地域'),
    Item('韧性演练：故障注入、混沌工程、故障注记/复盘'),
    Item('业务连续性：降级预案、只读模式、限流排队')
  ];

  const costSecOps = Yellow('成本与安全运营（可选）');
  costSecOps.children = [
    Item('成本优化：请求/配额、空闲缩容、存储治理'),
    Item('运行态安全：Runtime 策略、镜像/主机加固、审计')
  ];

  // Stage 4: 图形渲染与优化上线
  const renderPipeline = Yellow('渲染管线');
  renderPipeline.children = [
    Item('变换/光栅化'),
    Item('延迟/前向渲染'),
    Item('PBR'),
    Item('阴影/全局光照'),
    Item('后处理')
  ];

  const materialTexture = Yellow('材质与贴图');
  materialTexture.children = [
    Item('法线/粗糙度/金属度'),
    Item('烘焙与光照贴图'),
    Item('HDR 与色彩管理')
  ];

  const shaderDev = Yellow('着色器开发');
  shaderDev.children = [
    Item('顶点/片元/几何/计算着色器'),
    Item('实例化与批处理')
  ];

  const perfMemory = Yellow('性能与内存');
  perfMemory.children = [
    Item('剖析与火焰图'),
    Item('Draw Call/带宽/缓存命中'),
    Item('LOD/裁剪'),
    Item('资产体积治理')
  ];

  const multiplatform = Yellow('多平台发布');
  multiplatform.children = [
    Item('PC/主机/移动：输入与分辨率适配'),
    Item('打包与商店提交流程')
  ];

  const automationQuality = Yellow('自动化与质量');
  automationQuality.children = [
    Item('关卡回归'),
    Item('截图/录像对比'),
    Item('CI/CD（构建→测试→分发）')
  ];

  const stage4Checkpoint = Yellow('检查点：上线就绪');
  stage4Checkpoint.children = [
    Item('目标平台稳定 60FPS'),
    Item('图形特性清单与回归脚本'),
    Item('可上架包体')
  ];

  // 阶段四检查点与实践（对齐图片中的列表）
  const opsCheckpoint = Yellow('检查点与实践');
  opsCheckpoint.children = [
    Item('Linux Basics'),
    Item('AWS 基础服务：Route53 / EC2 / VPC / S3 / SES'),
    Item('Deployment / Monitoring'),
    Item('CI / CD'),
    Item('Automation'),
    Item('Terraform（Infrastructure）')
  ];

  // ------------------ Stage 5: 职业发展与通用能力 ------------------
  const commsDocs = Yellow('沟通协作与文档');
  commsDocs.children = [
    Item('表达与确认：复述/同理/冲突管理'),
    Item('结构化文档：需求/方案/评审/复盘'),
    Item('异步协作：纪要/行动项/跨时区礼仪')
  ];

  const decomposeEstimate = Yellow('需求拆解与估算');
  decomposeEstimate.children = [
    Item('需求澄清：目标/边界/非功能（SLO/成本）'),
    Item('拆解：里程碑/关键路径/风险缓解'),
    Item('估算与承诺：SP/三点估算/Buffer')
  ];

  const pmRisk = Yellow('项目管理与风险');
  pmRisk.children = [
    Item('Scrum/Kanban：节奏与可视化（燃尽/累计流）'),
    Item('风险清单：技术债/依赖/窗口/预案'),
    Item('跨团队：对齐/契约/变更管理（冻结/CR）')
  ];

  const reviewShare = Yellow('评审与分享');
  reviewShare.children = [
    Item('评审基线：复杂度/可测试/可维护'),
    Item('流程：高质量 PR/Checklist/强制检查'),
    Item('知识沉淀：Tech Talk/Wiki/最佳实践')
  ];

  const interviewResume = Yellow('面试与职业路径');
  interviewResume.children = [
    Item('成果呈现：性能/成本/稳定性指标'),
    Item('面试准备：项目深挖/系统设计/STAR'),
    Item('职业路径：专家/管理、技术品牌')
  ];

  // Stage 5: 项目化与职业成长
  const teamProcess = Yellow('团队与流程');
  teamProcess.children = [
    Item('任务拆解与估算'),
    Item('里程碑与风险管理'),
    Item('版本与分支策略')
  ];

  const codeAssets = Yellow('代码与资产规范');
  codeAssets.children = [
    Item('目录与命名'),
    Item('模块边界与可扩展性'),
    Item('技术债治理')
  ];

  const docsReview = Yellow('文档与评审');
  docsReview.children = [
    Item('设计文档与调参手册'),
    Item('PR Checklist'),
    Item('性能/稳定性复盘')
  ];

  const careerPath = Yellow('职业路径');
  careerPath.children = [
    Item('引擎/图形/玩法/工具/线上运维方向专精'),
    Item('技术品牌与社区参与')
  ];

  const portfolio = Yellow('作品集与发布');
  portfolio.children = [
    Item('可运行 Demo 与部署链接'),
    Item('技术亮点与指标前后对比'),
    Item('商店/开源链接')
  ];

  const continuousLearning = Yellow('持续学习');
  continuousLearning.children = [
    Item('图形论文/书单'),
    Item('GDC / SIGGRAPH'),
    Item('开源引擎阅读')
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
    // 阶段一：计算基础与工具链
    1: { title: '阶段一：计算基础与工具链', categories: [ mathBase, gameMath, csFund, languages, toolchain ], expandLevel: 1 },
    // 阶段二：引擎架构与 Runtime
    2: { title: '阶段二：引擎架构与 Runtime', categories: [ engineIntro, engineSubsystems, assetsSerialization, platformInterfaces, gfxApi ], expandLevel: 1 },
    // 阶段三：游戏系统与 AI 物理
    3: { title: '阶段三：游戏系统与 AI 物理', categories: [ gameplayMechanics, physicsSystem, aiSystem, animationAudio, netAndSave, stage3Checkpoint ], expandLevel: 1 },
    // 阶段四：图形渲染与优化上线
    4: { title: '阶段四：图形渲染与优化上线', categories: [ renderPipeline, materialTexture, shaderDev, perfMemory, multiplatform, automationQuality, stage4Checkpoint ], expandLevel: 1 },
    // 阶段五：项目化与职业成长
    5: { title: '阶段五：项目化与职业成长', categories: [ teamProcess, codeAssets, docsReview, careerPath, portfolio, continuousLearning ], expandLevel: 1 }
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
