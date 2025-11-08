// ==================== 食品安全知识库 ====================
const foodSafetyQA = [
    {
        question: "如何正确储存剩饭剩菜？",
        answer: `
            <ol>
                <li><strong>快速冷却：</strong>食物在出锅后2小时内，应密封好放入冰箱冷藏。</li>
                <li><strong>生熟分开：</strong>熟食和生食应分开放置，避免交叉污染。</li>
                <li><strong>浅容器存放：</strong>使用浅口容器盛放，能加快冷却速度。</li>
                <li><strong>标明日期：</strong>在容器上标注存放日期，建议剩菜存放不超过24-48小时。</li>
                <li><strong>彻底加热：</strong>再次食用前，必须彻底加热至中心温度70℃以上（冒热气）。</li>
            </ol>
        `,
        keywords: "剩菜、储存、冰箱、生熟分开、加热"
    },
    {
        question: "哪些食物不适合长时间在室温下存放？",
        answer: `
            <ul>
                <li><strong>熟食和淀粉类：</strong>米饭、面条、土豆等，易滋生蜡样芽孢杆菌。</li>
                <li><strong>蛋白质丰富的食物：</strong>牛奶、豆浆、肉类、禽类、蛋类，易繁殖沙门氏菌、金黄色葡萄球菌。</li>
                <li><strong>切开的果蔬：</strong>如西瓜、哈密瓜，表面易污染李斯特菌。</li>
                <li><strong>结论：</strong>所有熟食和易腐食品均应及时冷藏。</li>
            </ul>
        `,
        keywords: "室温存放、米饭、牛奶、肉类、西瓜"
    },
    {
        question: "从超市买的食物，如何判断是否变质？",
        answer: `
            <p>通过"望、闻、触"综合判断：</p>
            <ul>
                <li><strong>望：</strong>颜色异常，出现霉斑、发酵气泡。</li>
                <li><strong>闻：</strong>产生酸味、臭味、酒味或其他异味。</li>
                <li><strong>触：</strong>食物质地改变，如发粘、变软、出水。</li>
                <li><strong>包装：</strong>包装袋膨胀（胀包、胀罐）是危险的变质信号。</li>
                <li><strong>准则：</strong>如有疑虑，果断丢弃。</li>
            </ul>
        `,
        keywords: "变质、霉斑、异味、发粘、胀包"
    },
    {
        question: "在宿舍使用电器做饭，有哪些安全禁忌？",
        answer: `
            <ol>
                <li><strong>功率限制：</strong>严格遵守宿舍用电功率规定，禁止使用违规大功率电器（如电饭煲、电火锅、热得快）。</li>
                <li><strong>无人看守：</strong>烹饪时严禁长时间离开，做到 "人走断电" 。</li>
                <li><strong>周边环境：</strong>确保电器周围无书本、被褥等易燃物。</li>
                <li><strong>安全首选：</strong>在宿舍内，推荐使用水果、密封包装食品作为零食，烹饪行为应在学校允许的指定区域进行。</li>
            </ol>
        `,
        keywords: "宿舍电器、大功率、人走断电、易燃物"
    },
    {
        question: "听说有些食物不能一起吃，是真的吗？",
        answer: `
            <p>网络上很多"食物相克"说法是夸大或错误的。例如：</p>
            <ul>
                <li><strong>螃蟹与柿子：</strong>少量同食无碍，大量同时食用可能因鞣酸和蛋白质结合影响消化，引发肠胃不适，但并非中毒。</li>
                <li><strong>菠菜与豆腐：</strong>菠菜中的草酸与豆腐中的钙结合生成草酸钙，影响钙吸收，但将菠菜焯水可去除大部分草酸，即可正常食用。</li>
                <li><strong>核心：</strong>食物多样、均衡饮食是关键，无需过度恐慌所谓的"相克"。</li>
            </ul>
        `,
        keywords: "食物相克、螃蟹柿子、菠菜豆腐、焯水、均衡饮食"
    },
    {
        question: "吃水果时需要注意什么？",
        answer: `
            <ol>
                <li><strong>彻底清洗：</strong>即使是带皮水果（如香蕉、橙子），在切开前也应清洗，防止刀面上的农药污染果肉。</li>
                <li><strong>尽快食用：</strong>切好的水果应尽快吃完，不要在室温下久放。</li>
                <li><strong>腐烂即丢：</strong>水果局部腐烂后，霉菌产生的毒素会扩散到看似正常的部分，因此应丢弃整个水果，不要只挖掉坏部分。</li>
            </ol>
        `,
        keywords: "水果清洗、切块水果、腐烂水果"
    },
    {
        question: "取到外卖后，正确的处理流程是什么？",
        answer: `
            <ol>
                <li><strong>及时取餐：</strong>避免外卖在无人看管环境下长时间存放。</li>
                <li><strong>检查包装：</strong>确认包装完好、密封无损。</li>
                <li><strong>清洁双手：</strong>接触外卖包装后，务必用肥皂洗手。</li>
                <li><strong>条件允许下二次加热：</strong>特别是高风险食品（如肉类、米饭），再次加热能有效杀灭可能滋生的细菌。</li>
                <li><strong>尽快食用：</strong>建议在2小时内食用完毕。</li>
            </ol>
        `,
        keywords: "外卖、洗手、二次加热、尽快食用"
    },
    {
        question: "在食堂就餐时，如何选择安全的窗口和菜品？",
        answer: `
            <ol>
                <li><strong>看资质：</strong>选择有《餐饮服务许可证》、公示人员健康证的窗口。</li>
                <li><strong>看环境：</strong>观察操作台是否干净、工作人员个人卫生是否良好。</li>
                <li><strong>看菜品：</strong>选择完全煮熟、热气腾腾的食物，避免生食或半生不熟的食物。</li>
                <li><strong>闻味道：</strong>食物如有异味，坚决不取用。</li>
            </ol>
        `,
        keywords: "食堂、许可证、环境卫生、完全煮熟"
    },
    {
        question: "在食堂就餐时，怀疑自己食物中毒怎么办？",
        answer: `
            <ol>
                <li><strong>立即停止进食。</strong></li>
                <li><strong>保留证据：</strong>尽可能保留导致中毒的可疑食物、呕吐物或排泄物。</li>
                <li><strong>及时就医：</strong>立即到校医院或附近医院就诊，并告知医生进食史。</li>
                <li><strong>报告情况：</strong>向食堂管理人员和学校相关部门（如后勤集团、学生处）报告。</li>
            </ol>
        `,
        keywords: "食物中毒、保留证据、立即就医、报告"
    },
    {
        question: "在食物中发现异物（如头发、虫子）该如何处理？",
        answer: `
            <ol>
                <li><strong>保持冷静，</strong>立即停止食用。</li>
                <li><strong>保留证据：</strong>拍照或录像，保留含异物的食物和消费凭证。</li>
                <li><strong>现场沟通：</strong>礼貌而坚定地向窗口工作人员或食堂经理反映情况。</li>
                <li><strong>寻求上级帮助：</strong>若现场无法解决，应向学校后勤服务集团或学生会权益部投诉。</li>
            </ol>
        `,
        keywords: "食物异物、拍照取证、现场反映、投诉"
    }
];

// ==================== 拖动功能 ====================
const bot = document.getElementById('foodSafetyBot');
const botHeader = document.getElementById('botHeader');
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

// 获取元素的transform位置
function getTranslateValues(element) {
    const style = window.getComputedStyle(element);
    const matrix = style.transform || style.webkitTransform || style.mozTransform;
    
    if (matrix === 'none' || typeof matrix === 'undefined') {
        return {
            x: 0,
            y: 0
        };
    }

    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
    return {
        x: parseFloat(matrixValues[4]),
        y: parseFloat(matrixValues[5])
    };
}

// 开始拖动
function dragStart(e) {
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === botHeader || botHeader.contains(e.target)) {
        isDragging = true;
    }
}

// 拖动中
function drag(e) {
    if (isDragging) {
        e.preventDefault();

        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, bot);
    }
}

// 结束拖动
function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
}

// 设置transform
function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

// 绑定拖动事件
botHeader.addEventListener('mousedown', dragStart);
botHeader.addEventListener('touchstart', dragStart);

document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag, { passive: false });

document.addEventListener('mouseup', dragEnd);
document.addEventListener('touchend', dragEnd);

// ==================== 随机问题功能 ====================
const questionText = document.getElementById('questionText');
const answerContent = document.getElementById('answerContent');
const botAnswer = document.getElementById('botAnswer');
const botRefresh = document.getElementById('botRefresh');
const botClose = document.getElementById('botClose');

let currentQuestionIndex = -1;

// 获取随机问题
function getRandomQuestion() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * foodSafetyQA.length);
    } while (newIndex === currentQuestionIndex && foodSafetyQA.length > 1);
    
    currentQuestionIndex = newIndex;
    return foodSafetyQA[currentQuestionIndex];
}

// 显示问题和答案
function showQuestion() {
    const qa = getRandomQuestion();
    questionText.textContent = qa.question;
    answerContent.innerHTML = qa.answer;
    
    // 显示答案区域
    botAnswer.style.display = 'block';
    
    // 滚动到顶部
    document.getElementById('botBody').scrollTop = 0;
}

// 刷新按钮点击事件
botRefresh.addEventListener('click', showQuestion);

// 关闭按钮点击事件
botClose.addEventListener('click', () => {
    bot.style.display = 'none';
    // 保存状态到localStorage
    localStorage.setItem('foodSafetyBotHidden', 'true');
});

// 页面加载时检查是否应该显示
window.addEventListener('DOMContentLoaded', () => {
    const isHidden = localStorage.getItem('foodSafetyBotHidden');
    if (isHidden === 'true') {
        bot.style.display = 'none';
    } else {
        // 延迟2秒后自动显示第一个问题
        setTimeout(() => {
            showQuestion();
        }, 2000);
    }
});

// 点击问题区域也可以刷新
document.querySelector('.bot-question').addEventListener('click', () => {
    if (answerContent.innerHTML) {
        showQuestion();
    }
});
