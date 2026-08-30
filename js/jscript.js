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

});
```
