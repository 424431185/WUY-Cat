// 路线图页面交互逻辑
(function() {
  // 标签页切换功能
  const tabs = document.querySelectorAll('.tab');
  const canvas = document.querySelector('.canvas');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // 更新选中状态
      tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
      this.setAttribute('aria-selected', 'true');
      
      // 获取当前选中的标签
      const selectedTab = this.getAttribute('data-tab');
      
      // 根据选中的标签显示对应的思维导图
      const mdSource = document.getElementById(`md-${selectedTab}`);
      if (mdSource) {
        // 清空并重新渲染思维导图
        const mindmapSvg = document.getElementById('mindmap');
        if (mindmapSvg && window.markmap) {
          // 使用 markmap 渲染
          const { Markmap } = window.markmap;
          const mm = Markmap.create(mindmapSvg);
          mm.setData(window.markmap.transform(mdSource.textContent));
          mm.fit();
        }
      }
    });
  });
  
  // 页面加载时渲染默认的思维导图（前端工程）
  window.addEventListener('load', function() {
    const defaultTab = document.querySelector('.tab[aria-selected="true"]');
    if (defaultTab) {
      const selectedTab = defaultTab.getAttribute('data-tab');
      const mdSource = document.getElementById(`md-${selectedTab}`);
      
      if (mdSource) {
        const mindmapSvg = document.getElementById('mindmap');
        if (mindmapSvg && window.markmap) {
          const { Markmap } = window.markmap;
          const mm = Markmap.create(mindmapSvg);
          mm.setData(window.markmap.transform(mdSource.textContent));
          mm.fit();
        }
      }
    }
  });
  
})();
