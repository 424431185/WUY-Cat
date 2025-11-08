// ==================== 转盘配置 ====================
const restaurants = [
    '品味烤肉拌饭',
    '京味杂酱面',
    '重庆小面（二期一楼）',
    '黄焖鸡米饭（四期一楼）',
    '东北烤盘饭',
    '五谷渔粉（二期一楼）',
    '客家阿姨（四期二楼）',
    '贵州砂锅粉',
    '客家瓦罐',
    '卤味世家',
    '紫米饭团（一期一楼）',
    '千里香馄饨',
    '兰州拉面',
    '鲜炖牛腩饭',
    '香香餐馆',
    '片皮鸭',
    '好味道酸辣粉',
    '特色铁板炒饭',
    '亿缘麻辣烫（四期一楼）',
    '一休豚骨拉面',
    '林记风味馆',
    '章哥水饺',
    '塔斯汀',
    '派乐汉堡',
    '程家花甲',
    '木桑森林·沙拉·轻食',
    '美维多',
    '经济餐厅',
    '沙县小吃（四期二楼）',
    '淮南牛肉粉丝汤（二期一楼）',
    '淮南牛肉面（四期一楼）',
    '蒙自源（四期一楼）',
    '鲁道夫',
    '喜乐堡',
    '农家竹筒饭',
    '福祥粥铺',
    '林记风味小吃（一期一楼）',
    '下饭菜（四期）',
    '卤智深'
];

// 生成丰富的颜色数组
const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
    '#FF8C94', '#A8DADC', '#F4A261', '#E76F51', '#2A9D8F',
    '#E9C46A', '#F4A3A8', '#8ECAE6', '#219EBC', '#FFB703',
    '#FB8500', '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9',
    '#BAE1FF', '#E0BBE4', '#FFDFD3', '#C7CEEA', '#FFC8DD',
    '#BDE0FE', '#A2D2FF', '#CDB4DB', '#FFAFCC', '#FEC89A',
    '#F0B5B3', '#B8E0D2', '#D6EADF', '#EAC4D5'
];

// Canvas和上下文
let canvas;
let ctx;
let currentRotation = 0;
let isSpinning = false;
let hoveredIndex = -1; // 鼠标悬停的扇形索引
let tooltip = null; // tooltip元素
let bgImage = null; // 背景图片

// ==================== 初始化转盘 ====================
function initWheel() {
    canvas = document.getElementById('wheelCanvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    
    // 加载背景图片
    bgImage = new Image();
    bgImage.src = 'images/foodbeijin .png';
    bgImage.onload = function() {
        drawWheel();
    };
    
    // 响应式处理
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // 绘制转盘
    drawWheel();
    
    // 创建tooltip元素
    createTooltip();
    
    // 添加鼠标事件
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.style.cursor = 'pointer';
    
    // 添加点击事件
    const spinBtn = document.getElementById('spinBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    if (spinBtn) {
        spinBtn.addEventListener('click', spinWheel);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetWheel);
    }
}

// ==================== 创建Tooltip ====================
function createTooltip() {
    tooltip = document.createElement('div');
    tooltip.className = 'wheel-tooltip';
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);
}

// ==================== 颜色加亮函数 ====================
function lightenColor(color, percent) {
    // 将十六进制颜色转换为RGB
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.min(255, Math.floor((num >> 16) + (255 - (num >> 16)) * percent / 100));
    const g = Math.min(255, Math.floor(((num >> 8) & 0x00FF) + (255 - ((num >> 8) & 0x00FF)) * percent / 100));
    const b = Math.min(255, Math.floor((num & 0x0000FF) + (255 - (num & 0x0000FF)) * percent / 100));
    return `rgb(${r}, ${g}, ${b})`;
}

// ==================== 更新Canvas尺寸 ====================
function updateCanvasSize() {
    if (!canvas) return;
    
    const container = document.querySelector('.wheel-wrapper');
    if (!container) return;
    
    const size = Math.min(container.offsetWidth, container.offsetHeight);
    canvas.width = size;
    canvas.height = size;
    
    drawWheel();
}

// ==================== 鼠标移动处理 ====================
function handleMouseMove(e) {
    if (isSpinning) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    // 计算鼠标相对于中心的位置
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // 检查是否在转盘范围内（排除中心按钮区域）
    if (distance < 60 || distance > radius) {
        hoveredIndex = -1;
        if (tooltip) tooltip.style.display = 'none';
        drawWheel();
        return;
    }
    
    // 计算角度
    let angle = Math.atan2(dy, dx);
    angle = angle + Math.PI / 2; // 调整为从顶部开始
    if (angle < 0) angle += 2 * Math.PI;
    
    // 考虑当前旋转角度
    angle = (angle - currentRotation) % (2 * Math.PI);
    if (angle < 0) angle += 2 * Math.PI;
    
    // 计算在哪个扇形
    const sliceAngle = (2 * Math.PI) / restaurants.length;
    const index = Math.floor(angle / sliceAngle);
    
    if (index !== hoveredIndex) {
        hoveredIndex = index;
        drawWheel();
        
        // 显示tooltip
        if (tooltip && hoveredIndex >= 0 && hoveredIndex < restaurants.length) {
            tooltip.textContent = restaurants[hoveredIndex];
            tooltip.style.display = 'block';
            tooltip.style.left = (e.clientX + 15) + 'px';
            tooltip.style.top = (e.clientY - 10) + 'px';
        }
    } else if (tooltip) {
        // 更新tooltip位置
        tooltip.style.left = (e.clientX + 15) + 'px';
        tooltip.style.top = (e.clientY - 10) + 'px';
    }
}

// ==================== 鼠标离开处理 ====================
function handleMouseLeave() {
    hoveredIndex = -1;
    if (tooltip) tooltip.style.display = 'none';
    drawWheel();
}

// ==================== 绘制转盘 ====================
function drawWheel() {
    if (!ctx || !canvas) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    const sliceAngle = (2 * Math.PI) / restaurants.length;
    
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制背景图片
    if (bgImage && bgImage.complete) {
        ctx.save();
        // 绘制圆形背景图片
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.clip();
        
        // 计算图片绘制尺寸和位置，确保完全铺满圆形区域
        const imgAspect = bgImage.width / bgImage.height;
        const size = radius * 2;
        let drawWidth, drawHeight;
        
        if (imgAspect > 1) {
            drawHeight = size;
            drawWidth = size * imgAspect;
        } else {
            drawWidth = size;
            drawHeight = size / imgAspect;
        }
        
        // 确保完全覆盖
        const scale = Math.max(size / drawWidth, size / drawHeight);
        drawWidth *= scale;
        drawHeight *= scale;
        
        // 居中绘制
        const drawX = centerX - drawWidth / 2;
        const drawY = centerY - drawHeight / 2;
        
        ctx.drawImage(bgImage, drawX, drawY, drawWidth, drawHeight);
        ctx.restore();
    }
    
    // 保存当前状态
    ctx.save();
    
    // 应用旋转
    ctx.translate(centerX, centerY);
    ctx.rotate(currentRotation);
    ctx.translate(-centerX, -centerY);
    
    // 绘制每个扇形
    restaurants.forEach((restaurant, index) => {
        const startAngle = index * sliceAngle - Math.PI / 2;
        const endAngle = startAngle + sliceAngle;
        const color = colors[index % colors.length];
        
        // 如果是悬停的扇形，增加半径产生放大效果
        const isHovered = index === hoveredIndex;
        const sliceRadius = isHovered ? radius + 15 : radius;
        
        // 绘制扇形
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, sliceRadius, startAngle, endAngle);
        ctx.closePath();
        
        // 悬停时使用更亮的颜色，添加透明度让背景图片可见
        if (isHovered) {
            ctx.fillStyle = lightenColor(color, 20);
            ctx.globalAlpha = 0.7;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = 15;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        } else {
            // 设置透明度，让背景图片透出来
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.5;
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
        }
        ctx.fill();
        
        // 恢复透明度
        ctx.globalAlpha = 1.0;
        
        // 绘制边框
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = isHovered ? 3 : 2;
        ctx.stroke();
        
        // 绘制文字
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        
        // 根据Canvas大小调整字体
        const fontSize = Math.max(10, radius / 25);
        ctx.font = `bold ${fontSize}px "Noto Sans SC", sans-serif`;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        
        // 文字位置
        const textX = radius * 0.6;
        const maxWidth = radius * 0.35;
        
        // 如果文字太长，进行裁剪
        let displayText = restaurant;
        ctx.fillText(displayText, textX, 0, maxWidth);
        
        ctx.restore();
    });
    
    ctx.restore();
}

// ==================== 转动转盘 ====================
function spinWheel() {
    if (isSpinning) return;
    
    isSpinning = true;
    const spinBtn = document.getElementById('spinBtn');
    const wheelResult = document.getElementById('wheelResult');
    
    // 更新按钮状态
    if (spinBtn) {
        spinBtn.classList.add('spinning');
        const btnText = spinBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = '转动中...';
    }
    
    // 重置结果显示和tooltip
    if (wheelResult) {
        wheelResult.classList.remove('show-result');
    }
    if (tooltip) {
        tooltip.style.display = 'none';
    }
    hoveredIndex = -1;
    
    // 计算随机结果
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    const sliceAngle = (2 * Math.PI) / restaurants.length;
    
    // 计算需要旋转的角度（多转几圈 + 目标角度）
    const extraSpins = 5 + Math.random() * 3; // 5-8圈
    const targetAngle = randomIndex * sliceAngle + sliceAngle / 2;
    const totalRotation = extraSpins * 2 * Math.PI + targetAngle;
    
    // 动画参数
    const duration = 4000; // 4秒
    const startTime = Date.now();
    const startRotation = currentRotation;
    
    // 使用requestAnimationFrame实现平滑动画
    function animate() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数（先快后慢）
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        currentRotation = startRotation + totalRotation * easeOut;
        drawWheel();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // 动画结束
            isSpinning = false;
            currentRotation = currentRotation % (2 * Math.PI);
            
            // 恢复按钮
            if (spinBtn) {
                spinBtn.classList.remove('spinning');
                const btnText = spinBtn.querySelector('.btn-text');
                if (btnText) btnText.textContent = '点击转动';
            }
            
            // 显示结果
            showResult(restaurants[randomIndex]);
        }
    }
    
    animate();
}

// ==================== 显示结果 ====================
function showResult(restaurant) {
    const wheelResult = document.getElementById('wheelResult');
    const resetBtn = document.getElementById('resetBtn');
    
    if (!wheelResult) return;
    
    // 更新结果内容
    const resultIcon = wheelResult.querySelector('.result-icon');
    const resultTitle = wheelResult.querySelector('.result-title');
    const resultSubtitle = wheelResult.querySelector('.result-subtitle');
    
    if (resultIcon) resultIcon.innerHTML = '<img src="images/foodqier.png" alt="开饭啦" style="width: 100px; height: 100px; object-fit: contain;">';
    if (resultTitle) resultTitle.textContent = restaurant;
    if (resultSubtitle) resultSubtitle.textContent = '就吃这个吧！祝你用餐愉快~';
    
    // 添加动画类
    setTimeout(() => {
        wheelResult.classList.add('show-result');
    }, 100);
    
    // 显示重置按钮
    if (resetBtn) {
        resetBtn.style.display = 'inline-block';
    }
}

// ==================== 重置转盘 ====================
function resetWheel() {
    const wheelResult = document.getElementById('wheelResult');
    const resetBtn = document.getElementById('resetBtn');
    
    if (wheelResult) {
        wheelResult.classList.remove('show-result');
        
        // 重置内容
        const resultIcon = wheelResult.querySelector('.result-icon');
        const resultTitle = wheelResult.querySelector('.result-title');
        const resultSubtitle = wheelResult.querySelector('.result-subtitle');
        
        if (resultIcon) resultIcon.textContent = '🍜';
        if (resultTitle) resultTitle.textContent = '点击转盘开始';
        if (resultSubtitle) resultSubtitle.textContent = '让命运帮你选择今天的美食';
    }
    
    if (resetBtn) {
        resetBtn.style.display = 'none';
    }
}

// ==================== 页面加载时初始化 ====================
document.addEventListener('DOMContentLoaded', initWheel);
