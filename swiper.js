const swiper = new Swiper(".swiper", {
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 500,
  },
  centeredSlides: true,
  slidesPerView: "auto",
  slideToClickedSlide: true,
  effect: "coverflow",
  coverflowEffect: {
    rotate: 0,
    depth: 150,
    slideShadows: false,
    stretch: 100,
  },
  breakpoints: {
    // 화면의 넓이가 640px 이상일 때
    640: {
      slidesPerView: 2,
    },
    // 화면의 넓이가 900px 이상일 때
    900: {
      slidesPerView: 4,
    },
  },
  observer: true,
  observeParents: true,
});
