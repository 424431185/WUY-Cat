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
  const root = Root('iOS 开发者');

  // Columns
  const basics = Yellow('基础编程');
  basics.children = [
    Item('Swift 语法与基础'),
    Item('变量、常量与类型'),
    Item('控制流与函数'),
    Item('错误处理与可选类型')
  ];

  const oop = Yellow('面向对象与高级概念');
  oop.children = [
    Item('类与结构体'),
    Item('协议与扩展'),
    Item('泛型与闭包'),
    Item('内存管理与ARC')
  ];

  const ui = Yellow('用户界面与UIKit');
  ui.children = [
    Item('UIView 与布局'),
    Item('Auto Layout 与约束'),
    Item('Storyboard 与 XIB'),
    Item('动画与过渡')
  ];

  const data = Yellow('数据持久化');
  data.children = [
    Item('UserDefaults 与文件存储'),
    Item('Core Data 与模型'),
    Item('Realm 或其他数据库'),
    Item('网络请求与JSON解析')
  ];

  const framework = Yellow('框架与集成');
  framework.children = [
    Item('MapKit 与位置服务'),
    Item('Core Location 与传感器'),
    Item('Camera 与媒体'),
    Item('Push Notifications')
  ];

  const testing = Yellow('测试与调试');
  testing.children = [
    Item('单元测试：XCTest'),
    Item('UI 测试与自动化'),
    Item('性能调试与Instruments'),
    Item('错误报告与崩溃分析')
  ];

  const deploy = Yellow('部署与分发');
  deploy.children = [
    Item('App Store Connect'),
    Item('证书与Provisioning'),
    Item('版本管理与更新'),
    Item('本地化与国际化')
  ];

  const perf = Yellow('性能与优化');
  perf.children = [
    Item('内存优化与泄漏检测'),
    Item('电池与网络优化'),
    Item('多线程与GCD'),
    Item('代码组织与架构')
  ];

  const project = Yellow('项目实践');
  project.children = [
    Item('构建完整应用'),
    Item('团队协作与Git'),
    Item('用户反馈与迭代'),
    Item('开源贡献与文档')
  ];

  root.children = [
    basics, oop, ui, data, framework, testing, deploy, perf, project
  ];

  window.TreeData = { chart, nodeStructure: root };
})();
