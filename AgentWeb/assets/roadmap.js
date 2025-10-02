// 路线图页面逻辑：Markmap 思维导图 + Tab 切换 + URL 参数
(function(){
  let mmInstance = null;

  function getQuery(key){
    const u = new URL(window.location.href);
    return u.searchParams.get(key);
  }

  function currentMarkdown(tab){
    const id = tab === 'be' ? 'md-be' : 'md-fe';
    const el = document.getElementById(id);
    return el ? el.textContent : '# 无内容\n';
  }

  function renderMindmap(tab){
    const md = currentMarkdown(tab);
    const svg = document.getElementById('mindmap');
    if (!window.markmap || !svg) return;

    // 清空画布
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const { Transformer, Markmap } = window.markmap;
    const transformer = new Transformer();
    const { root } = transformer.transform(md);

    mmInstance = Markmap.create(svg, {
      autoFit: true,
      duration: 300,
      color: (n) => undefined
    }, root);
  }

  function switchTab(tab){
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(t => t.setAttribute('aria-selected', String(t.dataset.tab === tab)));
    renderMindmap(tab);
  }

  function onResize(){
    // 让思维导图自适应容器
    if (mmInstance && mmInstance.fit) mmInstance.fit();
  }

  // 事件：Tab 切换
  document.addEventListener('click', function(e){
    const btn = e.target.closest('.tab');
    if(btn){
      switchTab(btn.dataset.tab);
    }
  });
  window.addEventListener('resize', onResize);

  // 初始化
  const init = function(){
    const initTab = getQuery('tab') || 'fe';
    switchTab(initTab);
  };

  if (window.markmap) {
    init();
  } else {
    window.addEventListener('load', init, { once: true });
  }
})();
