// ==================== 导航栏功能 ====================
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// 汉堡菜单切换
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// 导航链接点击事件
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // 移除所有active类
        navLinks.forEach(l => l.classList.remove('active'));
        // 给当前链接添加active类
        link.classList.add('active');
        // 关闭移动端菜单
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// 滚动时改变导航栏样式
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // 高亮当前区域的导航链接
    highlightNavOnScroll();
});

// 根据滚动位置高亮导航链接
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// ==================== 平滑滚动 ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== 菜单筛选功能 ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 移除所有按钮的active类
        filterBtns.forEach(b => b.classList.remove('active'));
        // 给当前按钮添加active类
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        menuItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filterValue === 'all') {
                item.classList.remove('hide');
                item.style.display = 'block';
            } else {
                if (category === filterValue) {
                    item.classList.remove('hide');
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                    item.classList.add('hide');
                }
            }
        });

        // 添加淡入动画
        setTimeout(() => {
            menuItems.forEach((item, index) => {
                if (!item.classList.contains('hide')) {
                    item.style.animation = `fadeIn 0.5s ease-in ${index * 0.05}s backwards`;
                }
            });
        }, 100);
    });
});

// ==================== 表单提交（如果有） ====================
const feedbackForm = document.getElementById('feedbackForm');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(feedbackForm);
        const name = feedbackForm.querySelector('input[type="text"]').value;
        const email = feedbackForm.querySelector('input[type="email"]').value;
        const message = feedbackForm.querySelector('textarea').value;

        // 这里可以添加实际的表单提交逻辑
        // 例如: fetch API 发送到后端
        
        // 显示成功消息
        showNotification('感谢您的反馈！我们会尽快处理。');
        
        // 重置表单
        feedbackForm.reset();
    });
}

// 通知消息函数
function showNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b35, #f7931e);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.5s ease-out;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    // 3秒后移除通知
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// 添加通知动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== 滚动动画 ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease-out';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// 观察所有卡片元素
document.querySelectorAll('.restaurant-card, .menu-item, .hours-card, .info-item, .health-card, .tea-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== 滚动指示器 ====================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// ==================== 图片懒加载占位符 ====================
// 为没有实际图片的地方添加占位图
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.menu-image img');
    images.forEach((img, index) => {
        img.addEventListener('error', function() {
            // 如果图片加载失败，使用占位符
            this.src = `https://via.placeholder.com/400x300/ff6b35/ffffff?text=${encodeURIComponent('美食图片')}`;
        });
    });
});

// ==================== 页面加载完成 ====================
window.addEventListener('load', () => {
    // 页面加载完成后的初始化
    console.log('校园食堂页面加载完成！');
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== 响应式处理 ====================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // 窗口大小改变时的处理
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }, 250);
});

// ==================== 防止右键菜单（可选） ====================
// 如果需要保护图片，取消下面的注释
// document.addEventListener('contextmenu', (e) => {
//     if (e.target.tagName === 'IMG') {
//         e.preventDefault();
//     }
// });

// ==================== 添加当前时间显示（可选） ====================
function updateCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    
    // 根据当前时间高亮对应的营业时间卡片
    const hoursCards = document.querySelectorAll('.hours-card');
    hoursCards.forEach((card, index) => {
        card.classList.remove('current-time');
        
        if (index === 0 && hours >= 6 && hours < 9) { // 早餐
            card.classList.add('current-time');
            card.style.background = 'rgba(255, 255, 255, 0.3)';
        } else if (index === 1 && hours >= 11 && hours < 14) { // 午餐
            card.classList.add('current-time');
            card.style.background = 'rgba(255, 255, 255, 0.3)';
        } else if (index === 2 && hours >= 17 && hours < 20) { // 晚餐
            card.classList.add('current-time');
            card.style.background = 'rgba(255, 255, 255, 0.3)';
        } else if (index === 3 && hours >= 20 && hours < 22) { // 夜宵
            card.classList.add('current-time');
            card.style.background = 'rgba(255, 255, 255, 0.3)';
        }
    });
}

// 页面加载时更新一次
updateCurrentTime();

// 每分钟更新一次
setInterval(updateCurrentTime, 60000);
