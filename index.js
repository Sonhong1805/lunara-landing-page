// ----- start reason -----

new Swiper(".swiperReason", {
  speed: 600,
  slidesPerView: 4,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// ----- end reason -----

// ----- start feedback -----

new Swiper(".swiperFeedback", {
  speed: 600,
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// ----- end feedback -----

// ----- start bestseller -----
const bestSellerItems = document.querySelectorAll(
  ".bestseller__list .swiper-slide"
);
const totalProducts = bestSellerItems.length;
const productsPerSlide = window.innerWidth >= 769 ? 4 : 1;

const swiperBestseller = new Swiper(".swiperBestseller", {
  speed: 600,
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 15,
  watchSlidesProgress: true,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
    renderFraction: function (currentClass, totalClass) {
      return `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`;
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    769: {
      slidesPerView: productsPerSlide,
      slidesPerGroup: productsPerSlide,
      spaceBetween: 30,
    },
  },
  on: {
    slideChange: function () {
      const swiper = this;
      const currentIndex = swiper.activeIndex;
      const currentCount = Math.min(
        (currentIndex + 1) * productsPerSlide,
        totalProducts
      );
      document.querySelector(
        ".bestseller .swiper-pagination-current"
      ).textContent = currentCount;
      document.querySelector(
        ".bestseller .swiper-pagination-total"
      ).textContent = totalProducts;
    },
    afterInit: function () {
      const swiper = this;
      const currentCount = Math.min(
        (swiper.activeIndex + 1) * productsPerSlide,
        totalProducts
      );
      document.querySelector(
        ".bestseller .swiper-pagination-current"
      ).textContent = currentCount;
      document.querySelector(
        ".bestseller .swiper-pagination-total"
      ).textContent = totalProducts;
    },
  },
});

const bestsellerPaginationCurrent = document.querySelector(
  ".bestseller .swiper-pagination-current"
);
const bestsellerPaginationTotal = document.querySelector(
  ".bestseller .swiper-pagination-total"
);

const bestsellerSliderProgress = document.querySelector(
  ".bestseller__slider--progress"
);

const progressbarFill = document.querySelector(
  ".swiper-pagination-progressbar-fill"
);

const current = +bestsellerPaginationCurrent.textContent;
const total = +bestsellerPaginationTotal.textContent;
const calculationProgress = (current / total) * 100;
bestsellerSliderProgress.style.width = calculationProgress + "%";

swiperBestseller.on("slideChange", function () {
  const current = +bestsellerPaginationCurrent.textContent;
  const total = +bestsellerPaginationTotal.textContent;
  const calculationProgress = (current / total) * 100;
  bestsellerSliderProgress.style.width = calculationProgress + "%";
});

// ----- end bestseller -----

// ----- start overview -----
const overviewGallery = new Swiper(".swiperOverview", {
  speed: 600,
  zoom: true,
  navigation: {
    nextEl: ".btn-next",
    prevEl: ".btn-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

const overviewAccordionItemHeader = document.querySelectorAll(
  ".overview .accordion__item--header"
);
overviewAccordionItemHeader.forEach((item) => {
  const icon = item.querySelector(".overview .accordion__header--icon");
  const accordionItem = item.closest(".overview .accordion__item");

  item.addEventListener("click", () => {
    document
      .querySelectorAll(".overview .accordion__item.active")
      .forEach((el) => {
        el.classList.remove("active");
      });
    document
      .querySelectorAll(".overview .accordion__item--body")
      .forEach((el) => {
        el.style.maxHeight = null;
      });
    const accordionBody = item.nextElementSibling;
    document.querySelectorAll(".accordion__header--icon").forEach((el) => {
      el.innerHTML = `<svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path
                        d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                    </svg>`;
    });

    icon.innerHTML = `<svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                        <path
                          d="M5 11V13H19V11H5Z">
                        </path>
                      </svg>`;
    accordionItem.classList.add("active");
    accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
  });
});

const swiperOverviewModal = new Swiper(".swiperOverviewModal", {
  speed: 600,
  loop: true,
  zoom: true,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".overview__button-next",
    prevEl: ".overview__button-prev",
  },
});

const overviewModal = document.querySelector(".overview__modal");
const openOverviewModal = document.querySelector(".overview .open-modal");
const closeOverviewModal = document.querySelector(".overview .close-modal");
const overviewPaginationTotal = document.querySelector(
  ".overview__modal .swiper-pagination-total"
);
const overviewRangeCurrent = document.querySelector(
  ".overview__range .current"
);
const overviewRangeTotal = document.querySelector(".overview__range .total");

openOverviewModal.addEventListener("click", () => {
  overviewModal.classList.add("isOpen");
  document.body.style.overflow = "hidden";
  const indexGallery = overviewGallery.realIndex;
  swiperOverviewModal.slideTo(indexGallery);
  overviewRangeCurrent.textContent = swiperOverviewModal.realIndex + 1;
  overviewRangeTotal.textContent = +overviewPaginationTotal.textContent;
});

closeOverviewModal.addEventListener("click", () => {
  overviewModal.classList.remove("isOpen");
  document.body.style.overflow = "auto";
});

swiperOverviewModal.on("slideChange", function () {
  overviewRangeCurrent.textContent = swiperOverviewModal.realIndex + 1;
});

// ----- end overview -----

// ----- start comparison -----

const comparisonSlider = document.querySelector(".comparison__slider input");
const imageRight = document.querySelector(".image-right");
const comparisonLine = document.querySelector(".comparison__slider--line");

comparisonSlider.addEventListener("input", () => {
  const sliderValue = comparisonSlider.value;
  comparisonLine.style.left = sliderValue + "%";
  imageRight.style.clipPath = `inset(0 0 0 ${sliderValue}%)`;
});

// ----- end comparison -----

// ----- start question -----

const questionAccordionItems = document.querySelectorAll(
  ".question .accordion__item--header"
);

questionAccordionItems.forEach((item) => {
  const icon = item.querySelector(".question .accordion__header--icon");
  const accordionItem = item.closest(".question .accordion__item");
  item.addEventListener("click", () => {
    document
      .querySelectorAll(".question .accordion__item.active")
      .forEach((el) => {
        el.classList.remove("active");
      });

    document
      .querySelectorAll(".question .accordion__header--icon")
      .forEach((el) => {
        el.innerHTML = `<svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path
                        d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                    </svg>`;
      });

    icon.innerHTML = `<svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                        <path
                          d="M5 11V13H19V11H5Z">
                        </path>
                      </svg>`;
    accordionItem.classList.add("active");
  });
});

// ----- end question -----

// ----- start promo -----

const promoVideo = document.querySelector(".promo__wrapper video");
const btnOpenVideo = document.querySelector(".open-video");
const btnCloseVideo = document.querySelector(".close-video");

btnOpenVideo.addEventListener("click", () => {
  btnOpenVideo.style.display = "none";
  btnCloseVideo.style.display = "flex";
  promoVideo.controls = true;
  promoVideo.setAttribute("src", "assets/video/video-promo.mp4");
  promoVideo.play();
});

btnCloseVideo.addEventListener("click", () => {
  btnOpenVideo.style.display = "block";
  btnCloseVideo.style.display = "none";
  promoVideo.controls = false;
  promoVideo.pause();
  promoVideo.currentTime = 0;
  promoVideo.removeAttribute("src");
  promoVideo.setAttribute("poster", "assets/img/banner_video.jpg");
  promoVideo.load();
});

// ----- end promo -----

// ----- start countdown -----

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

let dayVal = 34,
  hourVal = 23,
  minuteVal = 59,
  secondVal = 59;

const countdownTimer = setInterval(() => {
  secondVal--;
  if (secondVal === 0) {
    minuteVal--;
    secondVal = 59;
  }
  if (minuteVal === 0) {
    hourVal--;
    minuteVal = 59;
  }
  if (hourVal === 0) {
    dayVal--;
    hourVal = 23;
  }
  if (dayVal === 0) {
    clearInterval(countdownTimer);
  }

  days.innerHTML = dayVal < 0 ? `0${dayVal}` : dayVal;
  hours.innerHTML = hourVal < 0 ? `0${hourVal}` : hourVal;
  minutes.innerHTML = minuteVal < 0 ? `0${minuteVal}` : minuteVal;
  seconds.innerHTML = secondVal < 0 ? `0${secondVal}` : secondVal;
}, 1000);

// ----- end countdown -----
