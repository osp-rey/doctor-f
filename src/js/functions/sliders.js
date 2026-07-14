export default function sliders() {
  const heroSlider = document.querySelector(".s-hero__slider");

  if (heroSlider) {
    const bgSlider = document.querySelector(".s-hero__bg-slider");
    const sliderProgress = document.querySelector(".s-hero .slider-progress");
    const slides = heroSlider.querySelectorAll(".swiper-slide");

    const swiperBg = new Swiper(bgSlider, {
      speed: 900,
      slidesPerView: 1,
    });

    const swiper = new Swiper(heroSlider, {
      speed: 900,
      slidesPerView: 1,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      navigation: {
        prevEl: ".s-hero .slider-arrow._prev",
        nextEl: ".s-hero .slider-arrow._next",
      },
      controller: {
        control: swiperBg,
      },
      on: {
        init: ({ activeIndex, params }) => {
          initSliderProgress(sliderProgress, slides.length, activeIndex);
          changeSliderProgress(sliderProgress, activeIndex);
        },
        slideChangeTransitionEnd: ({ activeIndex, params }) => {
          changeSliderProgress(sliderProgress, activeIndex);
        },
      },
    });
  }
  const tabsNav = document.querySelectorAll(".tabs-nav");

  if (tabsNav.length) {
    tabsNav.forEach((nav) => {
      const swiper = new Swiper(nav, {
        speed: 900,
        spaceBetween: 20,
        slidesPerView: "auto",
        breakpoints: {
          1025: {
            spaceBetween: 50,
            slidesPerView: "auto",
          },
          768: {
            spaceBetween: 30,
            slidesPerView: "auto",
          },
        },
        on: {
          slideChange: (swiper) => {
            if (!swiper.isEnd) {
              nav.classList.remove("_end");
            } else {
              nav.classList.add("_end");
            }
          },
        },
      });
    });
  }

  const servicesSliders = document.querySelectorAll(".s-services__slider");

  if (
    servicesSliders.length &&
    window.matchMedia("(max-width: 1199px)").matches
  ) {
    servicesSliders.forEach((slider) => {
      const swiper = new Swiper(slider, {
        speed: 900,
        slidesPerView: "auto",
        spaceBetween: 10,
        pagination: {
          el: slider.closest("[data-tab]").querySelector(".slider-pagination"),
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: "auto",
            spaceBetween: 15,
          },
        },
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
        delay: 6500,
      },
      navigation: {
        prevEl: ".s-promo .slider-arrow._prev",
        nextEl: ".s-promo .slider-arrow._next",
      },
      pagination: {
        el: ".s-promo .slider-pagination",
        clickable: true,
      },
      breakpoints: {
        1200: {
          spaceBetween: 20,
          slidesPerView: 4,
        },
        1025: {
          spaceBetween: 20,
          slidesPerView: 3,
        },
        768: {
          spaceBetween: 15,
          slidesPerView: 3,
        },
      },
    });
  }

  const teamSlider = document.querySelector(".s-team__slider");

  if (teamSlider) {
    const swiper = new Swiper(teamSlider, {
      speed: 900,
      spaceBetween: 20,
      slidesPerView: 3,
      // autoplay: {
      //   delay: 6000
      // },
      navigation: {
        prevEl: ".s-team .slider-arrow._prev",
        nextEl: ".s-team .slider-arrow._next",
      },
      breakpoints: {
        1025: {
          spaceBetween: 20,
          slidesPerView: 4,
        },
      },
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
