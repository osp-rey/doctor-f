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
      } else if (index < activeIndex){
        item.classList.remove("_active");
        item.classList.add("_fill");
      } else if (index === activeIndex) {
        item.classList.remove("_fill");
      }
    });

    items[activeIndex].classList.add("_active");
  }
}
