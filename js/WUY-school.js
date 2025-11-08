// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initTabs();
    initRegulations();
    initStats();
    initCarousel();
});

// 导航栏功能
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 汉堡菜单切换
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 平滑滚动到对应部分
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 关闭移动端菜单
                navMenu.classList.remove('active');
                
                // 平滑滚动
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 更新活动链接
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // 滚动时更新活动链接
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// 滚动效果
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
    });

    // 观察元素进入视口
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察所有卡片
    const cards = document.querySelectorAll('.overview-card, .club-card, .scholarship-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// 社团标签页功能
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 添加活动状态
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// 规章制度折叠功能
function initRegulations() {
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const category = this.parentElement;
            const isActive = category.classList.contains('active');
            
            // 关闭所有分类
            document.querySelectorAll('.regulation-category').forEach(cat => {
                cat.classList.remove('active');
            });
            
            // 如果之前未激活，则激活当前分类
            if (!isActive) {
                category.classList.add('active');
            }
        });
    });
}

// 兼容旧的 toggleCategory 函数（如果HTML中有onclick使用）
function toggleCategory(element) {
    // 如果传入的是header元素，找到其父元素category
    const category = element.classList.contains('regulation-category') 
        ? element 
        : element.closest('.regulation-category');
    
    if (!category) {
        console.error('未找到 regulation-category 元素');
        return;
    }
    
    const isActive = category.classList.contains('active');
    
    // 关闭所有分类
    document.querySelectorAll('.regulation-category').forEach(cat => {
        cat.classList.remove('active');
    });
    
    // 如果之前未激活，则激活当前分类
    if (!isActive) {
        category.classList.add('active');
    }
}

// 统计数字动画
function initStats() {
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateStats = () => {
        if (hasAnimated) return;
        
        const statsSection = document.getElementById('overview');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            hasAnimated = true;
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000; // 2秒
                const step = target / (duration / 16); // 每帧增加的数量
                let current = 0;

                const updateCount = () => {
                    current += step;
                    if (current < target) {
                        stat.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = target.toLocaleString();
                    }
                };

                updateCount();
            });
        }
    };

    window.addEventListener('scroll', animateStats);
    animateStats(); // 初始检查
}

// 平滑滚动到顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 显示返回顶部按钮
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let backToTopBtn = document.getElementById('backToTop');
    
    // 如果按钮不存在，创建它
    if (!backToTopBtn && scrollTop > 300) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'backToTop';
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #2563eb, #3b82f6);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 999;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
        `;
        
        backToTopBtn.addEventListener('click', scrollToTop);
        backToTopBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
        });
        backToTopBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
        
        document.body.appendChild(backToTopBtn);
    }
    
    // 显示/隐藏按钮
    if (backToTopBtn) {
        if (scrollTop > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    }
});

// 添加滚动进度条
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scrollProgress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #3b82f6);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 初始化滚动进度条
createScrollProgress();

// 添加加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动性能
const optimizedScroll = debounce(() => {
    // 滚动相关的优化处理
}, 100);

window.addEventListener('scroll', optimizedScroll);

// 轮播图功能
function initCarousel() {
    let currentSlide = 0;
    let autoPlayInterval = null;
    
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    
    if (slides.length === 0) {
        console.log('未找到轮播图片');
        return;
    }
    
    console.log('初始化轮播图，共有', slides.length, '张图片');
    
    // 显示指定幻灯片
    function showSlide(index) {
        // 循环索引
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        console.log('切换到第', currentSlide + 1, '张图片');
        
        // 更新幻灯片
        slides.forEach((slide, i) => {
            if (i === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // 更新指示器
        indicators.forEach((indicator, i) => {
            if (i === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // 下一张
    function nextSlide() {
        showSlide(currentSlide + 1);
        resetAutoPlay();
    }
    
    // 上一张
    function prevSlide() {
        showSlide(currentSlide - 1);
        resetAutoPlay();
    }
    
    // 跳转到指定幻灯片
    function goToSlide(index) {
        showSlide(index);
        resetAutoPlay();
    }
    
    // 开始自动播放
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000); // 每5秒切换一次
        console.log('自动播放已启动');
    }
    
    // 停止自动播放
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
            console.log('自动播放已暂停');
        }
    }
    
    // 重置自动播放
    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }
    
    // 绑定事件
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // 鼠标悬停时暂停自动播放
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
        carouselWrapper.addEventListener('mouseleave', startAutoPlay);
    }
    
    // 初始化显示第一张并开始自动播放
    showSlide(0);
    startAutoPlay();
}
