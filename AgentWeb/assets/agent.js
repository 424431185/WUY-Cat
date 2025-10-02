// 通用：初始化超星智能体 SDK
(function initAgentSDK() {
  function doInit() {
    try {
      CxRobotSdkJs.init(
        "https://robot.chaoxing.com/embedChat?unitId=333173&robotId=3727c711664b4fc8a6fe390fd4ba56f5&groupId=0",
        "bc58e76dbc69696ebf17a60eb00993d5"
      );
    } catch (e) {
      console.error('[Agent Init Error]', e);
    }
  }

  if (typeof CxRobotSdkJs === 'undefined') {
    // SDK 可能尚未加载完成，等待窗口 onload 再尝试
    window.addEventListener('load', function () {
      if (typeof CxRobotSdkJs !== 'undefined') {
        doInit();
      } else {
        console.warn('[Agent SDK] 未检测到 CxRobotSdkJs，请检查网络与引用顺序。');
      }
    }, { once: true });
  } else {
    doInit();
  }
})();
