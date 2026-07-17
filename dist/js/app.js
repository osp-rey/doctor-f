(() => {
    "use strict";
    function burger() {
        const burger = document.querySelector("#burger");
        if (burger) {
            const burgerOpen = document.querySelector("#burger-open");
            const burgerCloses = document.querySelectorAll("[data-burger-close]");
            const burgerOverlay = document.querySelector("#burger-overlay");
            const header = document.querySelector(".header");
            const burgerAnchors = burger.querySelectorAll("a[href^='/#']");
            burgerAnchors.forEach(anchor => {
                anchor.addEventListener("click", () => {
                    handleClose();
                });
            });
            burgerOverlay.addEventListener("click", handleClose);
            burgerOpen.addEventListener("click", () => {
                handleOpen();
            });
            burgerCloses.forEach(btn => btn.addEventListener("click", handleClose));
            function updateHeightBurger() {
                burger.style.maxHeight = `${window.visualViewport.height}px`;
            }
            function handleOpen() {
                document.body.classList.add("body-hidden");
                burger.classList.add("_open");
                burgerOverlay.classList.add("_active");
                updateHeightBurger();
            }
            function handleClose() {
                document.body.classList.remove("body-hidden");
                burger.classList.remove("_open");
                burgerOverlay.classList.remove("_active");
            }
            window.visualViewport.addEventListener("resize", updateHeightBurger);
            window.visualViewport.addEventListener("scroll", updateHeightBurger);
            updateHeightBurger();
        }
        const burgerTabBtns = burger.querySelectorAll("[data-burger-tab-btn]");
        if (burgerTabBtns.length) {
            const allTabs = burger.querySelectorAll(".burger__tab");
            burgerTabBtns.forEach(btn => {
                btn.addEventListener("click", () => {
                    const id = btn.dataset.burgerTabBtn;
                    const tab = burger.querySelector(`[data-burger-tab="${id}"]`);
                    if (tab) {
                        allTabs.forEach(t => {
                            t.classList.remove("_show");
                            setTimeout(() => {
                                t.classList.remove("_active");
                            }, 150);
                        });
                        setTimeout(() => {
                            tab.classList.add("_active");
                            setTimeout(() => {
                                tab.classList.add("_show");
                            }, 150);
                        }, 150);
                    }
                });
            });
        }
    }
    function buttonsNote() {
        const buttons = document.querySelectorAll("[data-btn-note]");
        if (buttons.length) {
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const selectorTarget = btn.dataset.targetNote;
                    const target = document.querySelector(selectorTarget);
                    console.log(selectorTarget);
                    const value = btn.dataset.btnNote;
                    if (target) {
                        target.value = value;
                    }
                });
            });
        }
    }
    function changeModaltitle() {
        const buttons = document.querySelectorAll("[data-fancybox][data-modal-title]");
        if (buttons.length) {
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const titleValue = btn.dataset.modalTitle;
                    if (titleValue) {
                        const selector = btn.getAttribute("href") || btn.dataset.src;
                        const modalTitle = document.querySelector(selector).querySelector(".modal__title");
                        if (modalTitle) modalTitle.textContent = titleValue;
                    }
                });
            });
        }
    }
    function copy() {
        const buttons = document.querySelectorAll("[data-copy]");
        if (buttons.length) {
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const value = btn.dataset.copy;
                    const tooltip = tippy(btn, {
                        content: "Скопировано",
                        trigger: "manual"
                    });
                    tooltip.show();
                    setTimeout(() => {
                        tooltip.hide();
                    }, 1e3);
                    navigator.clipboard.writeText(value).then(() => {
                        tooltip.show();
                        setTimeout(() => {
                            tooltip.hide();
                        }, 1e3);
                    });
                });
            });
        }
    }
    function doctorBgHeight() {
        const section = document.querySelector(".s-doctor");
        if (section) {
            function changeHeight() {
                if (window.matchMedia("(min-width: 768px)").matches) {
                    const headHeight = section.querySelector(".s-doctor__head").clientHeight;
                    section.style.setProperty("--bg-height", `${headHeight}px`);
                }
            }
            changeHeight();
            window.visualViewport.addEventListener("resize", changeHeight);
        }
    }
    function handlerSelect() {
        const selects = document.querySelectorAll(".select");
        if (selects.length) {
            document.body.addEventListener("click", () => {
                const openSelects = document.querySelectorAll(".select._open");
                if (openSelects.length) openSelects.forEach(s => s.classList.remove("_open"));
            });
            selects.forEach(select => {
                select.addEventListener("click", e => e.stopPropagation());
                const targetOptions = select.dataset.targetOptions;
                if (targetOptions) {
                    const selector = `data-${targetOptions}-options`;
                    const target = select.closest(`[${selector}]`);
                    if (target) {
                        const selectBodyWrap = select.querySelector(".select-body-wrap");
                        const options = target.getAttribute(selector);
                        const arrOptions = options.split(",");
                        arrOptions.forEach(option => {
                            const item = document.createElement("div");
                            item.classList.add("select-item");
                            item.textContent = option;
                            selectBodyWrap.appendChild(item);
                        });
                    }
                }
                const items = select.querySelectorAll(".select-item");
                const btn = select.querySelector(".select-btn");
                const input = select.querySelector(".select-input");
                btn.addEventListener("click", () => {
                    if (select.classList.contains("_open")) {
                        select.classList.remove("_open");
                    } else {
                        selects.forEach(s => s.classList.remove("_open"));
                        select.classList.add("_open");
                    }
                });
                items.forEach(item => {
                    item.addEventListener("click", () => {
                        handlerChange(item);
                    });
                });
                function handlerChange(item) {
                    const value = item.textContent.trim();
                    input.value = value;
                    select.classList.remove("_open");
                    items.forEach(i => i.classList.remove("_active"));
                    item.classList.add("_active");
                }
            });
        }
    }
    function headerScroll() {
        const header = document.querySelector(".header");
        if (header && window.matchMedia("(min-width: 1025px)").matches) {
            let lastScrollTop = 0;
            window.addEventListener("scroll", changeScroll);
            function changeScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > lastScrollTop && scrollTop > header.clientHeight) {
                    header.classList.add("_hide");
                } else {
                    header.classList.remove("_hide");
                }
                lastScrollTop = scrollTop;
            }
        }
    }
    function inputmask() {
        const inputs = document.querySelectorAll('input[type="tel"]');
        const im = new Inputmask("+7 (999) 999-99-99");
        im.mask(inputs);
    }
    function createScript(url, type) {
        if (!url) return;
        return new Promise((resolve, reject) => {
            const script = document.querySelector(`script[src="${url}"]`);
            if (script) {
                resolve(script);
            } else {
                const htmlScript = document.createElement("script");
                htmlScript.src = url;
                if (type) {
                    htmlScript.type = type;
                }
                htmlScript.onload = () => {
                    resolve(htmlScript);
                };
                htmlScript.onerror = () => {
                    reject(new Error(`Не удалось загрузить скрипт: ${url}`));
                };
                document.head.appendChild(htmlScript);
            }
        });
    }
    function slideUp(target, duration = 500, showmore = 0) {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }, duration);
        }
    }
    function slideDown(target, duration = 500, showmore = 0) {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout(() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }, duration);
        }
    }
    function createEl(tag, classes = "") {
        const item = document.createElement(tag);
        if (classes) {
            classes.split(" ").forEach(c => {
                item.classList.add(c);
            });
        }
        return item;
    }
    function map() {
        const maps = document.querySelectorAll(".map");
        if (maps.length) {
            maps.forEach(map => {
                const options = {
                    root: null,
                    rootMargin: "0px",
                    scrollMargin: "0px",
                    threshold: .01
                };
                function callback(entries, observer) {
                    entries.forEach(entry => {
                        const target = entry.target;
                        if (entry.isIntersecting) {
                            createScript("https://api-maps.yandex.ru/2.1/?apikey=b46e9249-4925-4460-b11c-3aaf76ad0115&lang=ru_RU", "text/javascript").then(() => handlerCreateMap(target));
                            observer.unobserve(target);
                        }
                    });
                }
                const observer = new IntersectionObserver(callback, options);
                observer.observe(map);
            });
            function handlerCreateMap(map) {
                const center = JSON.parse(map.dataset.center);
                const zoom = Number(map.dataset.zoom);
                const iconHref = map.dataset.icon;
                let iconSize = [ 60, 68 ];
                let iconPosition = [ -30, -68 ];
                let objectMark = {};
                if (iconHref) {
                    objectMark = {
                        iconLayout: "default#image",
                        iconImageHref: iconHref,
                        iconImageSize: iconSize,
                        iconImageOffset: iconPosition
                    };
                }
                function init() {
                    const htmlMap = new ymaps.Map(map, {
                        center,
                        zoom
                    });
                    const placemark = new ymaps.Placemark(center, {}, objectMark);
                    htmlMap.geoObjects.add(placemark);
                    htmlMap.controls.remove("geolocationControl");
                    htmlMap.controls.remove("searchControl");
                    htmlMap.controls.remove("trafficControl");
                    htmlMap.controls.remove("typeSelector");
                    htmlMap.controls.remove("fullscreenControl");
                    htmlMap.controls.remove("rulerControl");
                }
                ymaps.ready(init);
            }
        }
    }
    function more() {
        const containers = document.querySelectorAll(".container-more");
        if (containers.length) {
            containers.forEach(container => {
                const btn = container.querySelector("[data-more-btn]");
                const count = +container.dataset.countShow;
                const hideItems = Array.from(container.querySelectorAll("[data-more-item]")).filter(item => window.getComputedStyle(item).display === "none");
                if (hideItems.length === 0) btn.remove();
                btn.addEventListener("click", () => {
                    const items = container.querySelectorAll("[data-more-item]");
                    const hideItems = Array.from(items).filter(item => window.getComputedStyle(item).display === "none");
                    hideItems.splice(0, count).forEach(item => {
                        item.classList.add("_active");
                        setTimeout(() => {
                            item.classList.add("_show");
                        });
                    });
                    if (hideItems.length <= 0) btn.remove();
                });
            });
        }
    }
    function servicesDrop() {
        const drop = document.querySelector("#services-drop");
        if (drop) {
            const header = document.querySelector(".header");
            const headerHeight = header.clientHeight;
            const headerZIndex = window.getComputedStyle(header).zIndex;
            const dropOverlay = document.querySelector("#services-drop-overlay");
            const btnToggle = document.querySelector("#services-drop-btn");
            let isDisabledScroll = false;
            document.body.addEventListener("click", handlerClose);
            drop.addEventListener("click", e => {
                e.stopPropagation();
            });
            btnToggle.addEventListener("click", e => {
                e.stopPropagation();
                if (btnToggle.classList.contains("_active")) {
                    handlerClose();
                } else {
                    handlerOpen();
                }
            });
            function handlerOpen() {
                dropOverlay.classList.add("_open");
                drop.classList.add("_open");
                btnToggle.classList.add("_active");
                header.style.zIndex = "999";
                header.classList.add("_active");
                isDisabledScroll = true;
                changeHeight();
            }
            function handlerClose() {
                dropOverlay.classList.remove("_open");
                drop.classList.remove("_open");
                btnToggle.classList.remove("_active");
                header.style.zIndex = headerZIndex;
                header.classList.remove("_active");
                isDisabledScroll = false;
            }
            function changeHeight() {
                drop.style.maxHeight = `${window.visualViewport.height - headerHeight}px`;
                drop.style.top = `${headerHeight}px`;
            }
            window.visualViewport.addEventListener("resize", changeHeight);
            window.visualViewport.addEventListener("scroll", changeHeight);
            function handlerDisabledScroll(e) {
                if (isDisabledScroll) {
                    e.preventDefault();
                    return false;
                }
            }
            document.addEventListener("wheel", handlerDisabledScroll, {
                passive: false
            });
            document.addEventListener("touchmove", handlerDisabledScroll, {
                passive: false
            });
            document.addEventListener("keydown", handlerDisabledScroll);
        }
    }
    function sliders() {
        const heroSlider = document.querySelector(".s-hero__slider");
        if (heroSlider) {
            const bgSlider = document.querySelector(".s-hero__bg-slider");
            const sliderProgress = document.querySelector(".s-hero .slider-progress");
            const slides = heroSlider.querySelectorAll(".swiper-slide");
            const swiperBg = new Swiper(bgSlider, {
                speed: 900,
                slidesPerView: 1
            });
            const swiper = new Swiper(heroSlider, {
                speed: 900,
                slidesPerView: 1,
                autoplay: {
                    delay: 6e3,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false
                },
                navigation: {
                    prevEl: ".s-hero .slider-arrow._prev",
                    nextEl: ".s-hero .slider-arrow._next"
                },
                controller: {
                    control: swiperBg
                },
                on: {
                    init: ({activeIndex, params}) => {
                        initSliderProgress(sliderProgress, slides.length, activeIndex);
                        changeSliderProgress(sliderProgress, activeIndex);
                    },
                    slideChangeTransitionEnd: ({activeIndex, params}) => {
                        changeSliderProgress(sliderProgress, activeIndex);
                    }
                }
            });
        }
        const sectNavs = document.querySelectorAll(".sect-nav");
        if (sectNavs.length) {
            sectNavs.forEach(nav => {
                const swiper = new Swiper(nav, {
                    speed: 900,
                    spaceBetween: 20,
                    slidesPerView: "auto",
                    navigation: {
                        nextEl: nav.querySelector(".slider-arrow._next"),
                        prevEl: nav.querySelector(".slider-arrow._prev")
                    },
                    breakpoints: {
                        1025: {
                            spaceBetween: 50,
                            slidesPerView: "auto"
                        },
                        768: {
                            spaceBetween: 30,
                            slidesPerView: "auto"
                        }
                    },
                    on: {
                        slideChange: swiper => {
                            if (!swiper.isEnd) {
                                nav.classList.remove("_end");
                            } else {
                                nav.classList.add("_end");
                            }
                        }
                    }
                });
            });
        }
        const servicesSliders = document.querySelectorAll(".s-services__slider");
        if (servicesSliders.length && window.matchMedia("(max-width: 1199px)").matches) {
            servicesSliders.forEach(slider => {
                const swiper = new Swiper(slider, {
                    speed: 900,
                    slidesPerView: "auto",
                    spaceBetween: 10,
                    pagination: {
                        el: slider.closest("[data-tab]").querySelector(".slider-pagination"),
                        clickable: true
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: "auto",
                            spaceBetween: 15
                        }
                    }
                });
            });
        }
        const promoSlider = document.querySelector(".s-promo__slider");
        if (promoSlider) {
            const swiper = new Swiper(promoSlider, {
                speed: 900,
                spaceBetween: 10,
                slidesPerView: 2,
                autoplay: {
                    delay: 6500
                },
                navigation: {
                    prevEl: ".s-promo .slider-arrow._prev",
                    nextEl: ".s-promo .slider-arrow._next"
                },
                pagination: {
                    el: ".s-promo .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    1200: {
                        spaceBetween: 20,
                        slidesPerView: 4
                    },
                    1025: {
                        spaceBetween: 20,
                        slidesPerView: 3
                    },
                    768: {
                        spaceBetween: 15,
                        slidesPerView: 3
                    }
                }
            });
        }
        const teamSlider = document.querySelector(".s-team__slider");
        if (teamSlider) {
            const swiper = new Swiper(teamSlider, {
                speed: 900,
                spaceBetween: 10,
                slidesPerView: 2,
                autoplay: {
                    delay: 6e3
                },
                navigation: {
                    prevEl: ".s-team .slider-arrow._prev",
                    nextEl: ".s-team .slider-arrow._next"
                },
                pagination: {
                    el: ".s-team .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    1200: {
                        spaceBetween: 20,
                        slidesPerView: 4
                    },
                    768: {
                        spaceBetween: 15,
                        slidesPerView: 3
                    }
                }
            });
        }
        const aboutSlider = document.querySelector(".s-about__slider");
        if (aboutSlider) {
            const swiper = new Swiper(aboutSlider, {
                speed: 900,
                spaceBetween: 15,
                slidesPerView: "auto",
                autoplay: {
                    delay: 6500
                },
                navigation: {
                    prevEl: ".s-about .slider-arrow._prev",
                    nextEl: ".s-about .slider-arrow._next"
                },
                pagination: {
                    el: ".s-about .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    768: {
                        spaceBetween: 20,
                        slidesPerView: "auto"
                    }
                }
            });
        }
        const advSlider = document.querySelector(".s-adv__slider");
        if (advSlider) {
            const swiper = new Swiper(advSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 10,
                autoplay: {
                    delay: 6500
                },
                navigation: {
                    prevEl: ".s-adv .slider-arrow._prev",
                    nextEl: ".s-adv .slider-arrow._next"
                },
                breakpoints: {
                    1366: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    },
                    1025: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: "auto",
                        spaceBetween: 15
                    }
                }
            });
        }
        function initSliderProgress(sliderProgress, count, activeIndex) {
            for (let i = 0; i < count; i++) {
                const item = document.createElement("span");
                item.classList.add("slider-progress-item");
                sliderProgress.appendChild(item);
            }
        }
        function changeSliderProgress(sliderProgress, activeIndex) {
            const items = sliderProgress.querySelectorAll(".slider-progress-item");
            items.forEach((item, index) => {
                if (index > activeIndex) {
                    item.style.animation = "none";
                    item.classList.remove("_active");
                    item.classList.remove("_fill");
                } else if (index < activeIndex) {
                    item.classList.remove("_active");
                    item.classList.add("_fill");
                } else if (index === activeIndex) {
                    item.classList.remove("_fill");
                }
            });
            items[activeIndex].classList.add("_active");
        }
    }
    function tab() {
        const buttons = document.querySelectorAll("[data-tab-btn]");
        if (buttons.length) {
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const container = btn.closest(".tabs");
                    const tabId = btn.dataset.tabBtn;
                    const allButtons = container.querySelector(".tabs-nav").querySelectorAll("[data-tab-btn]");
                    const allTabs = [];
                    const allTabsContents = container.querySelectorAll(".tabs-content");
                    allTabsContents.forEach(tabsContent => {
                        const tabs = Array.from(tabsContent.children).filter(child => child.hasAttribute("data-tab"));
                        allTabs.push(...tabs);
                    });
                    const currentTabs = container.querySelectorAll(`[data-tab="${tabId}"]`);
                    allTabs.forEach(t => {
                        t.classList.remove("_show");
                        setTimeout(() => {
                            t.classList.remove("_active");
                        }, 150);
                    });
                    setTimeout(() => {
                        currentTabs.forEach(t => {
                            t.classList.add("_active");
                            setTimeout(() => {
                                t.classList.add("_show");
                            }, 150);
                        });
                    }, 150);
                    allButtons.forEach(b => b.classList.remove("_active"));
                    btn.classList.add("_active");
                });
            });
        }
    }
    document.addEventListener("DOMContentLoaded", () => {
        servicesDrop();
        burger();
        sliders();
        tab();
        buttonsNote();
        changeModaltitle();
        inputmask();
        handlerSelect();
        map();
        more();
        headerScroll();
        doctorBgHeight();
        copy();
        Fancybox.bind("[data-fancybox]", {
            closeButton: false,
            on: {
                destroy: instance => {
                    const id = instance.getSlide().src;
                    if (id.includes("#modal")) {
                        const modal = document.querySelector(id);
                        const inputNote = modal.querySelector(".input-note");
                        const modalTitle = modal.querySelector(".modal__title[data-text]");
                        if (inputNote) inputNote.value = "";
                        if (modalTitle) modalTitle.textContent = modalTitle.dataset.text;
                    }
                }
            }
        });
    });
})();