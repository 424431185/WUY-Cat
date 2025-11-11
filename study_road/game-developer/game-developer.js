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
  const root = Root('游戏开发者');

  // Columns
  const basics = Yellow('基础编程');
  basics.children = [
    Item('C# 或 C++ 基础'),
    Item('面向对象编程'),
    Item('数据结构与算法'),
    Item('版本控制：Git')
  ];

  const engine = Yellow('游戏引擎');
  engine.children = [
    Item('Unity 或 Unreal Engine'),
    Item('场景与资产管理'),
    Item('物理引擎与碰撞'),
    Item('脚本与事件系统')
  ];

  const graphics = Yellow('图形与渲染');
  graphics.children = [
    Item('2D/3D 图形基础'),
    Item('着色器（Shaders）'),
    Item('纹理与材质'),
    Item('光照与阴影')
  ];

  const audio = Yellow('音频与音效');
  audio.children = [
    Item('音频集成与播放'),
    Item('音效设计与合成'),
    Item('音频引擎：FMOD/Wwise'),
    Item('空间音频')
  ];

  const gameplay = Yellow('游戏玩法');
  gameplay.children = [
    Item('游戏循环与机制'),
    Item('关卡设计与平衡'),
    Item('玩家控制与交互'),
    Item('AI 与敌人行为')
  ];

  const ui = Yellow('用户界面');
  ui.children = [
    Item('UI 设计与布局'),
    Item('菜单与导航'),
    Item('HUD 与反馈'),
    Item('本地化与多语言')
  ];

  const tools = Yellow('工具与资产');
  tools.children = [
    Item('建模工具：Blender/Maya'),
    Item('纹理制作：Photoshop/Substance'),
    Item('动画与骨骼'),
    Item('资产管道与优化')
  ];

  const testing = Yellow('测试与调试');
  testing.children = [
    Item('单元测试与集成测试'),
    Item('性能测试与内存管理'),
    Item('平台特定调试'),
    Item('玩家反馈与迭代')
  ];

  const deploy = Yellow('发布与部署');
  deploy.children = [
    Item('多平台构建：PC/Mobile/Console'),
    Item('打包与分发'),
    Item('商店提交与审核'),
    Item('更新与补丁管理')
  ];

  const project = Yellow('项目实践');
  project.children = [
    Item('独立游戏开发'),
    Item('团队协作与分工'),
    Item('原型到成品流程'),
    Item('市场与变现')
  ];

  root.children = [
    basics, engine, graphics, audio, gameplay, ui, tools, testing, deploy, project
  ];

  window.TreeData = { chart, nodeStructure: root };
})();
