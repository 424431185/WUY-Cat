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
  const root = Root('网络安全工程师');

  // Columns
  const basics = Yellow('基础与法规');
  basics.children = [
    Item('网络/系统基础'),
    Item('密码学基础：对称/非对称/哈希'),
    Item('合规框架：ISO27001、等保'),
    Item('安全开发与SDL')
  ];

  const web = Yellow('Web 与应用安全');
  web.children = [
    Item('OWASP Top 10'),
    Item('鉴权与会话安全'),
    Item('输入校验与防注入'),
    Item('API 安全与速率限制')
  ];

  const host = Yellow('系统与主机');
  host.children = [
    Item('Linux 加固与权限'),
    Item('日志与审计'),
    Item('漏洞扫描与补丁管理'),
    Item('EDR/AV 策略')
  ];

  const cloud = Yellow('云与容器安全');
  cloud.children = [
    Item('容器镜像与运行时安全'),
    Item('Kubernetes 安全与准入'),
    Item('云权限与密钥管理'),
    Item('CSPM/CIEM')
  ];

  const id = Yellow('身份与零信任');
  id.children = [
    Item('IAM / RBAC / ABAC'),
    Item('SSO / OAuth2 / OIDC'),
    Item('多因素认证(MFA)'),
    Item('零信任架构')
  ];

  const red = Yellow('渗透测试与攻防');
  red.children = [
    Item('信息收集与漏洞利用'),
    Item('提权与横向移动'),
    Item('内网渗透与域安全'),
    Item('钓鱼与社会工程（合规）')
  ];

  const blue = Yellow('检测与响应');
  blue.children = [
    Item('SIEM/SOC 运营'),
    Item('日志分析与告警'),
    Item('威胁狩猎与溯源'),
    Item('应急响应与取证')
  ];

  const secEng = Yellow('安全工程与DevSecOps');
  secEng.children = [
    Item('依赖与镜像扫描'),
    Item('SAST/DAST/IAST'),
    Item('安全网关与WAF'),
    Item('安全基线自动化')
  ];

  const ti = Yellow('威胁情报与风险');
  ti.children = [
    Item('情报源与IOC 管理'),
    Item('攻击面与资产测绘'),
    Item('漏洞情报与优先级'),
    Item('风险评估与处置')
  ];

  const project = Yellow('项目实践');
  project.children = [
    Item('渗透演练与蓝队对抗'),
    Item('零信任落地与改造'),
    Item('合规检查与整改'),
    Item('攻防演习复盘')
  ];

  root.children = [
    basics, web, host, cloud, id,
    red, blue, secEng, ti, project
  ];

  window.TreeData = { chart, nodeStructure: root };
})();
