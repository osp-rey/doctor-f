export default function sliders() {
  const heroSlider = document.querySelector(".s-hero__slider");

  if (heroSlider) {
    const bgSlider = document.querySelector(".s-hero__bg-slider");

    const swiperBg = new Swiper(bgSlider, {
      speed: 900,
      slidesPerView: 1,
    })

    const swiper = new Swiper(heroSlider, {
      speed: 900,
      slidesPerView: 1,
      // autoplay: {
      //   delay: 7000
      // },
      navigation: {

      },
      controller: {
        control: swiperBg
      }
    })
  }
}