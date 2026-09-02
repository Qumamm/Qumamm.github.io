```javascript
/* =========================================
   Qumamm Personal Website
   JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       页面加载
    ===================================== */

    document.body.classList.add("page-loaded");


    /* =====================================
       获取元素
    ===================================== */

    const header =
        document.querySelector(".header");

    const nav =
        document.querySelector(".nav");

    const menuButton =
        document.querySelector("#menuButton");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const sections =
        document.querySelectorAll("section");

    const backTop =
        document.querySelector("#backTop");

    const newsItems =
        document.querySelectorAll(".news-item");


    /* =====================================
       导航栏滚动效果
    ===================================== */

    function updateHeader() {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        updateHeader
    );

    updateHeader();


    /* =====================================
       手机端菜单
    ===================================== */

    menuButton.addEventListener(
        "click",
        () => {

            nav.classList.toggle("show");

            if (nav.classList.contains("show")) {

                menuButton.textContent = "✕";

            } else {

                menuButton.textContent = "☰";

            }

        }
    );


    /* =====================================
       点击导航后关闭手机菜单
    ===================================== */

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove("show");

                menuButton.textContent = "☰";

            }
        );

    });


    /* =====================================
       当前导航高亮
    ===================================== */

    function updateActiveNav() {

        let currentSection = "home";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 160;

            if (window.scrollY >= sectionTop) {

                currentSection =
                    section.id;

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.dataset.target ===
                currentSection
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNav
    );

    updateActiveNav();


    /* =====================================
       返回顶部
    ===================================== */

    function updateBackTop() {

        if (window.scrollY > 500) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    }

    window.addEventListener(
        "scroll",
        updateBackTop
    );


    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================
       新闻卡片滚动进入动画
    ===================================== */

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");

                            observer
                                .unobserve(
                                    entry.target
                                );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    newsItems.forEach(item => {

        observer.observe(item);

    });


    /* =====================================
       页面滚动时动态调整导航
    ===================================== */

    let scrollTimer;

    window.addEventListener(
        "scroll",
        () => {

            document.body.classList.add(
                "is-scrolling"
            );

            clearTimeout(scrollTimer);

            scrollTimer = setTimeout(
                () => {

                    document.body.classList.remove(
                        "is-scrolling"
                    );

                },
                150
            );

        }
    );


    /* =====================================
       防止空链接跳转
    ===================================== */

    document
        .querySelectorAll('a[href="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                }
            );

        });


    /* =====================================
       访问量计数器(6 位像素电子表样式)
    ===================================== */

    const visitCanvas =
        document.querySelector("#visitCanvas");

    if (visitCanvas) {

        /* 读取访问次数并 +1(同一浏览器内累计) */

        let visits = 0;

        try {

            visits = parseInt(
                localStorage.getItem("qm_visits") || "0",
                10
            );

            if (!isFinite(visits) || visits < 0) {
                visits = 0;
            }

            visits = Math.min(visits + 1, 999999);

            localStorage.setItem(
                "qm_visits",
                String(visits)
            );

        } catch (error) {

            visits = 1;

        }

        /* 6 位目标数字 */

        const target = String(visits)
            .padStart(6, "0")
            .split("")
            .map(Number);

        /* 5x7 像素字模 0-9 */

        const GLYPHS = [
            ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
            ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
            ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
            ["11111", "00010", "00100", "00010", "00001", "10001", "01110"],
            ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
            ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
            ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
            ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
            ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
            ["01110", "10001", "10001", "01111", "00001", "00010", "01100"]
        ];

        /* 画布:每个像素格 6px,左右各留 1 格 */

        const U = 6;

        const COLUMNS = 1 + 6 * 6 - 1 + 1;   // 边距 + 6 位(5 列字 + 1 列间距)

        const ROWS = 1 + 7 + 1;              // 边距 + 7 行字高

        const W = COLUMNS * U;

        const H = ROWS * U;

        const dpr = window.devicePixelRatio || 1;

        visitCanvas.width = Math.round(W * dpr);

        visitCanvas.height = Math.round(H * dpr);

        visitCanvas.style.width = W + "px";

        visitCanvas.style.height = H + "px";

        const cctx = visitCanvas.getContext("2d");

        cctx.scale(dpr, dpr);

        /* 绘制当前 6 位数字 */

        function drawCounter(digits) {

            cctx.clearRect(0, 0, W, H);

            /* 暗格:LCD 点阵未点亮部分 */

            cctx.fillStyle = "rgba(51, 255, 85, 0.08)";

            for (let d = 0; d < 6; d++) {
                for (let r = 0; r < 7; r++) {
                    for (let col = 0; col < 5; col++) {
                        cctx.fillRect(
                            (1 + d * 6 + col) * U,
                            (1 + r) * U,
                            U,
                            U
                        );
                    }
                }
            }

            /* 点亮的绿色像素(带辉光) */

            cctx.beginPath();

            for (let d = 0; d < 6; d++) {
                const glyph = GLYPHS[digits[d]];
                for (let r = 0; r < 7; r++) {
                    for (let col = 0; col < 5; col++) {
                        if (glyph[r][col] === "1") {
                            cctx.rect(
                                (1 + d * 6 + col) * U,
                                (1 + r) * U,
                                U,
                                U
                            );
                        }
                    }
                }
            }

            cctx.fillStyle = "#39ff5c";

            cctx.shadowColor = "rgba(57, 255, 92, 0.85)";

            cctx.shadowBlur = U * 1.2;

            cctx.fill();

            cctx.shadowBlur = 0;

        }

        /* 滚动锁定动画:个位先停,依次向左 */

        const cur = [0, 0, 0, 0, 0, 0];

        const start = performance.now();

        const STEP_MS = 130;

        function frame(now) {

            let spinning = false;

            for (let d = 0; d < 6; d++) {

                const lockAt = start + 350 + (5 - d) * STEP_MS;

                if (now < lockAt) {

                    cur[d] = (cur[d] + 1 +
                        Math.floor(Math.random() * 9)) % 10;

                    spinning = true;

                } else {

                    cur[d] = target[d];

                }

            }

            drawCounter(cur);

            if (spinning) {
                requestAnimationFrame(frame);
            }

        }

        requestAnimationFrame(frame);

    }

});
```
