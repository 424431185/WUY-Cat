// 武小喵 - 交互脚本：三只猫眼跟随鼠标 + 茶叶飘落
(function() {
  // 1. 三只猫的眼珠跟随鼠标
  const catImage = document.querySelector('.cat-image');
  const pupils = {
    cat1: {
      left: document.querySelector('.pupil-1-left'),
      right: document.querySelector('.pupil-1-right')
    },
    cat2: {
      left: document.querySelector('.pupil-2-left'),
      right: document.querySelector('.pupil-2-right')
    },
    cat3: {
      left: document.querySelector('.pupil-3-left'),
      right: document.querySelector('.pupil-3-right')
    }
  };

  if (catImage) {
    document.addEventListener('mousemove', (e) => {
      const imageRect = catImage.getBoundingClientRect();
      
      // 为每只猫的眼珠计算移动
      Object.values(pupils).forEach(cat => {
        if (cat.left && cat.right) {
          // 获取左眼当前位置
          const leftRect = cat.left.getBoundingClientRect();
          const leftCenterX = leftRect.left + leftRect.width / 2;
          const leftCenterY = leftRect.top + leftRect.height / 2;
          
          // 获取右眼当前位置
          const rightRect = cat.right.getBoundingClientRect();
          const rightCenterX = rightRect.left + rightRect.width / 2;
          const rightCenterY = rightRect.top + rightRect.height / 2;
          
          // 计算左眼移动
          const leftDeltaX = e.clientX - leftCenterX;
          const leftDeltaY = e.clientY - leftCenterY;
          const leftAngle = Math.atan2(leftDeltaY, leftDeltaX);
          const leftDistance = Math.sqrt(leftDeltaX * leftDeltaX + leftDeltaY * leftDeltaY);
          
          // 计算右眼移动
          const rightDeltaX = e.clientX - rightCenterX;
          const rightDeltaY = e.clientY - rightCenterY;
          const rightAngle = Math.atan2(rightDeltaY, rightDeltaX);
          const rightDistance = Math.sqrt(rightDeltaX * rightDeltaX + rightDeltaY * rightDeltaY);
          
          // 眼珠移动范围限制（3px）
          const maxMove = 3.5;
          const leftMoveX = Math.cos(leftAngle) * Math.min(leftDistance / 50, maxMove);
          const leftMoveY = Math.sin(leftAngle) * Math.min(leftDistance / 50, maxMove);
          const rightMoveX = Math.cos(rightAngle) * Math.min(rightDistance / 50, maxMove);
          const rightMoveY = Math.sin(rightAngle) * Math.min(rightDistance / 50, maxMove);
          
          // 应用变换
          cat.left.style.transform = `translate(${leftMoveX}px, ${leftMoveY}px)`;
          cat.right.style.transform = `translate(${rightMoveX}px, ${rightMoveY}px)`;
        }
      });
    });
  }

  // 2. 茶叶飘落动画（物理模拟 + 鼠标风力）
  const teaContainer = document.querySelector('.tea-leaves');
  if (teaContainer) {
    const leafCount = Math.min(30, Math.max(20, Math.round(window.innerWidth / 60)));
    const leaves = [];
    const mouse = { x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0 };
    
    // 鼠标移动追踪
    let lastMouseTime = Date.now();
    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      const dt = Math.max(0.001, (now - lastMouseTime) / 1000);
      lastMouseTime = now;
      
      const newX = e.clientX;
      const newY = e.clientY;
      
      // 计算鼠标速度（像素/秒）
      mouse.vx = (newX - mouse.lastX) / dt;
      mouse.vy = (newY - mouse.lastY) / dt;
      mouse.x = newX;
      mouse.y = newY;
      mouse.lastX = newX;
      mouse.lastY = newY;
    });
    
    // 创建茶叶（分批次掉落，均匀分布）
    // 将茶叶分成多个批次，每批间隔固定时间
    const batchSize = 1; // 每批1片，更分散
    const batchCount = Math.ceil(leafCount / batchSize);
    const batchInterval = 1500; // 每批间隔1.5秒
    
    for (let i = 0; i < leafCount; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'leaf';
      
      const size = 15 + Math.random() * 10;
      leaf.style.width = size + 'px';
      leaf.style.height = size + 'px';
      leaf.style.opacity = '0';
      
      teaContainer.appendChild(leaf);
      
      // 计算批次和批次内随机偏移
      const batchIndex = Math.floor(i / batchSize);
      const batchOffset = Math.random() * 400; // 批次内0-0.4秒随机
      const spawnDelay = batchIndex * batchInterval + batchOffset;
      
      // 物理属性
      leaves.push({
        element: leaf,
        x: Math.random() * window.innerWidth,
        y: -100,
        vx: (Math.random() - 0.5) * 20,
        vy: 30 + Math.random() * 20,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 180,
        size: size,
        mass: size / 20,
        isStacked: false,
        stackTime: 0,
        spawnDelay: spawnDelay,
        hasSpawned: false,
        cycleDelay: 0 // 循环延迟（动态设置）
      });
    }
    
    // 物理模拟循环
    let lastTime = Date.now();
    const startTime = Date.now();
    
    function animateLeaves() {
      const now = Date.now();
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      const elapsed = now - startTime;
      lastTime = now;
      
      // 鼠标速度衰减
      mouse.vx *= 0.95;
      mouse.vy *= 0.95;
      
      leaves.forEach(leaf => {
        // 检查是否该生成这片茶叶
        if (!leaf.hasSpawned) {
          // 初始生成或循环生成
          const targetTime = leaf.cycleDelay > 0 ? leaf.cycleDelay : leaf.spawnDelay;
          if (elapsed >= targetTime) {
            leaf.hasSpawned = true;
            leaf.element.style.opacity = '0.8';
            leaf.cycleDelay = 0; // 重置循环延迟
          } else {
            return; // 还未到生成时间
          }
        }
        
        if (leaf.isStacked) {
          // 已堆积的茶叶：检查是否被风吹动或到达边缘
          const stackedDuration = (now - leaf.stackTime) / 1000; // 堆积时长（秒）
          
          // 17秒后开始渐隐，20秒完全消失
          if (stackedDuration > 17) {
            const fadeProgress = (stackedDuration - 17) / 3; // 3秒渐隐过程
            const currentOpacity = Math.max(0, 0.8 * (1 - fadeProgress));
            leaf.element.style.opacity = currentOpacity;
            
            if (stackedDuration > 20) {
              // 完全消失，重置茶叶
              leaf.isStacked = false;
              leaf.hasSpawned = false;
              leaf.cycleDelay = elapsed + 4000 + Math.random() * 4000;
              leaf.x = Math.random() * window.innerWidth;
              leaf.y = -100;
              leaf.vx = (Math.random() - 0.5) * 20;
              leaf.vy = 30 + Math.random() * 20;
              leaf.element.style.opacity = '0';
              return;
            }
          }
          
          const dx = leaf.x - mouse.x;
          const dy = leaf.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxWindDist = 400; // 增加风力影响范围
          
          // 如果鼠标靠近，茶叶可以被吹动（降低难度）
          if (dist < maxWindDist && dist > 0) {
            const windStrength = (1 - dist / maxWindDist) * 0.8; // 增强风力
            const mouseSpeed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
            
            if (mouseSpeed > 20) { // 大幅降低触发速度阈值
              const repelForce = 150 / (dist + 10); // 增强排斥力
              const windForceX = mouse.vx * windStrength * 0.5 + (dx / dist) * repelForce * mouseSpeed * 0.15;
              
              leaf.vx += windForceX * dt / (leaf.mass * 0.5); // 减小质量影响
              leaf.vx *= 0.98; // 减小地面摩擦
              leaf.x += leaf.vx * dt;
              leaf.rotation += leaf.vx * dt * 2;
            }
          } else {
            // 没有风力时，速度衰减
            leaf.vx *= 0.92;
            leaf.x += leaf.vx * dt;
          }
          
          // 检查是否到达屏幕边缘
          const edgeThreshold = 50; // 边缘阈值
          const screenWidth = window.innerWidth;
          let opacity = parseFloat(leaf.element.style.opacity) || 0.8;
          
          // 计算基础透明度（考虑自动消失的渐隐）
          let baseOpacity = 0.8;
          if (stackedDuration > 17) {
            const fadeProgress = (stackedDuration - 17) / 3;
            baseOpacity = Math.max(0, 0.8 * (1 - fadeProgress));
          }
          
          if (leaf.x < edgeThreshold) {
            // 左边缘：逐渐消失
            const fadeRatio = leaf.x / edgeThreshold;
            opacity = Math.max(0, fadeRatio * baseOpacity);
            leaf.element.style.opacity = opacity;
            
            if (leaf.x < 0) {
              // 完全消失，重置茶叶
              leaf.isStacked = false;
              leaf.hasSpawned = false;
              leaf.cycleDelay = elapsed + 4000 + Math.random() * 4000;
              leaf.x = Math.random() * screenWidth;
              leaf.y = -100;
              leaf.vx = (Math.random() - 0.5) * 20;
              leaf.vy = 30 + Math.random() * 20;
              leaf.element.style.opacity = '0';
              return;
            }
          } else if (leaf.x > screenWidth - edgeThreshold) {
            // 右边缘：逐渐消失
            const fadeRatio = (screenWidth - leaf.x) / edgeThreshold;
            opacity = Math.max(0, fadeRatio * baseOpacity);
            leaf.element.style.opacity = opacity;
            
            if (leaf.x > screenWidth) {
              // 完全消失，重置茶叶
              leaf.isStacked = false;
              leaf.hasSpawned = false;
              leaf.cycleDelay = elapsed + 4000 + Math.random() * 4000;
              leaf.x = Math.random() * screenWidth;
              leaf.y = -100;
              leaf.vx = (Math.random() - 0.5) * 20;
              leaf.vy = 30 + Math.random() * 20;
              leaf.element.style.opacity = '0';
              return;
            }
          } else if (stackedDuration <= 17 && opacity < 0.8) {
            // 远离边缘且未进入自动消失阶段时，恢复透明度
            opacity = Math.min(0.8, opacity + 0.02);
            leaf.element.style.opacity = opacity;
          }
          
          // 应用变换
          leaf.element.style.left = leaf.x + 'px';
          leaf.element.style.top = leaf.y + 'px';
          leaf.element.style.transform = `rotate(${leaf.rotation}deg)`;
          return;
        }
        
        // 重力
        const gravity = 50;
        leaf.vy += gravity * dt;
        
        // 空气阻力
        const drag = 0.98;
        leaf.vx *= drag;
        leaf.vy *= Math.pow(drag, 0.5);
        
        // 鼠标风力（基于距离和鼠标速度）
        const dx = leaf.x - mouse.x;
        const dy = leaf.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxWindDist = 300; // 风力影响范围
        
        if (dist < maxWindDist && dist > 0) {
          const windStrength = (1 - dist / maxWindDist) * 0.5;
          const mouseSpeed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
          
          // 风力方向：鼠标运动方向 + 排斥力
          const repelForce = 100 / (dist + 10);
          const windForceX = mouse.vx * windStrength + (dx / dist) * repelForce * mouseSpeed * 0.1;
          const windForceY = mouse.vy * windStrength + (dy / dist) * repelForce * mouseSpeed * 0.1;
          
          leaf.vx += windForceX * dt / leaf.mass;
          leaf.vy += windForceY * dt / leaf.mass;
        }
        
        // 随机扰动（模拟气流）
        leaf.vx += (Math.random() - 0.5) * 10 * dt;
        
        // 更新位置
        leaf.x += leaf.vx * dt;
        leaf.y += leaf.vy * dt;
        leaf.rotation += leaf.rotationSpeed * dt;
        
        // 边界处理
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        // 左右边界：反弹
        if (leaf.x < 0) {
          leaf.x = 0;
          leaf.vx = Math.abs(leaf.vx) * 0.5;
        } else if (leaf.x > screenWidth) {
          leaf.x = screenWidth;
          leaf.vx = -Math.abs(leaf.vx) * 0.5;
        }
        
        // 底部：堆积
        if (leaf.y >= screenHeight - 50) {
          leaf.y = screenHeight - 50 + (Math.random() - 0.5) * 30;
          leaf.vx *= 0.3;
          leaf.vy = 0;
          leaf.isStacked = true;
          leaf.stackTime = now;
        }
        
        // 顶部：重置（循环，分散延迟）
        if (leaf.y < -100) {
          leaf.hasSpawned = false;
          // 循环延迟：4-8秒
          leaf.cycleDelay = elapsed + 4000 + Math.random() * 4000;
          leaf.x = Math.random() * screenWidth;
          leaf.y = -100;
          leaf.vx = (Math.random() - 0.5) * 20;
          leaf.vy = 30 + Math.random() * 20;
          leaf.element.style.opacity = '0';
        }
        
        // 应用变换
        leaf.element.style.left = leaf.x + 'px';
        leaf.element.style.top = leaf.y + 'px';
        leaf.element.style.transform = `rotate(${leaf.rotation}deg)`;
      });
      
      requestAnimationFrame(animateLeaves);
    }
    
    animateLeaves();
  }

  // 2.5 背景猫爪印缓慢漂浮（边界反弹）
  (function createFloatingPaws() {
    const root = document.body;
    if (!root) return;
    const container = document.createElement('div');
    container.className = 'paw-prints';
    root.appendChild(container);

    const pawImages = [
      'assets/images/cat_foot1.png',
      'assets/images/cat_foot2.png',
      'assets/images/cat_foot3.png'
    ];

    const count = Math.min(9, Math.max(6, Math.round(window.innerWidth / 280)));
    const cols = 3;
    const rows = Math.ceil(count / cols);
    const paws = [];
    
    for (let i = 0; i < count; i++) {
      const paw = document.createElement('div');
      paw.className = 'paw';
      const size = 120 + Math.random() * 140; // 120~260px
      paw.style.width = size + 'px';
      paw.style.height = size + 'px';
      
      // 网格分布 + 随机偏移
      const col = i % cols;
      const row = Math.floor(i / cols);
      const baseLeft = (col + 0.5) * (100 / cols);
      const baseTop = (row + 0.5) * (100 / rows);
      const offsetX = (Math.random() - 0.5) * (80 / cols);
      const offsetY = (Math.random() - 0.5) * (80 / rows);
      
      const opacity = (0.15 + Math.random() * 0.15).toFixed(2);
      paw.style.opacity = opacity;
      const randomImage = pawImages[Math.floor(Math.random() * pawImages.length)];
      paw.style.backgroundImage = `url("${randomImage}")`;
      paw.style.backgroundSize = 'contain';
      container.appendChild(paw);
      
      // 存储运动参数
      paws.push({
        element: paw,
        x: baseLeft + offsetX,
        y: baseTop + offsetY,
        vx: (Math.random() - 0.5) * 0.8, // vw/s
        vy: (Math.random() - 0.5) * 0.8, // vh/s
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 30, // deg/s
        size: size
      });
    }
    
    // 动画循环
    let lastTime = Date.now();
    function animate() {
      const now = Date.now();
      const dt = (now - lastTime) / 1000; // 秒
      lastTime = now;
      
      paws.forEach(p => {
        // 更新位置
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rotation += p.rotationSpeed * dt;
        
        // 边界检测与反弹
        const sizeVw = (p.size / window.innerWidth) * 100;
        const sizeVh = (p.size / window.innerHeight) * 100;
        
        if (p.x < sizeVw / 2) {
          p.x = sizeVw / 2;
          p.vx = Math.abs(p.vx);
        } else if (p.x > 100 - sizeVw / 2) {
          p.x = 100 - sizeVw / 2;
          p.vx = -Math.abs(p.vx);
        }
        
        if (p.y < sizeVh / 2) {
          p.y = sizeVh / 2;
          p.vy = Math.abs(p.vy);
        } else if (p.y > 100 - sizeVh / 2) {
          p.y = 100 - sizeVh / 2;
          p.vy = -Math.abs(p.vy);
        }
        
        // 应用变换
        p.element.style.left = p.x + 'vw';
        p.element.style.top = p.y + 'vh';
        p.element.style.transform = `translate(-50%, -50%) rotate(${p.rotation}deg)`;
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
  })();

  // 3. 功能卡片点击提示（可选）
  const featureItems = document.querySelectorAll('.feature-item');
  featureItems.forEach(item => {
    item.addEventListener('click', () => {
      const title = item.querySelector('.feature-title').textContent;
      console.log('点击了功能：', title);
      const label = (item.querySelector('.feature-label')?.textContent || '').trim();
if (label.includes('AR校园导览') || title.includes('AR校园导览')) {
  window.open('https://www.720yun.com/t/6432dxi6jci?scene_id=1205151', '_blank', 'noopener,noreferrer');
  return;
}
      // 这里可以添加实际的跳转或弹窗逻辑
    });
  });

  // 4. 平台按钮点击（可选）
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const text = btn.textContent.trim();
      console.log('点击了按钮：', text);
      // 这里可以添加实际的下载或跳转逻辑
      if (btn.classList.contains('btn-start')) {
        window.location.href = 'WUY-school.html';
      }
    });
  });

  // 4.1 顶部导航点击放大动效和跳转
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      link.classList.add('click-zoom');
      setTimeout(() => link.classList.remove('click-zoom'), 180);
      
      // 处理导航跳转
      const href = link.getAttribute('href');
      if (href === '#study') {
        e.preventDefault();
        window.location.href = 'tea-roadmap.html';
      } else if (href === '#campus') {
        e.preventDefault();
        window.location.href = 'WUY-school.html';
      }
      else if(href == '#zhuzi'){
        e.preventDefault();
        window.location.href = 'zhuzi.html';
      }
  
    });
  });
})();
