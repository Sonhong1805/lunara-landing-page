import reasons from "./assets/data/reason.js";
import bestsellers from "./assets/data/bestseller.js";
import services from "./assets/data/service.js";
import feedbacks from "./assets/data/feedback.js";
import questions from "./assets/data/question.js";
import overviews from "./assets/data/overview.js";

const renderReason = (data) => {
  let html = "";
  html = data.map((element) => {
    return `
        <article>
          <figure class="icon">
            <img src=${element.icon} alt="icon leaf" />
          </figure>
          <div class="text-h6">${element.title}</div>
          <div class="text-p2">
            ${element.description}
          </div>
        </article>
    `;
  });

  document.querySelector(".reason__list").innerHTML = html.join("");
};
renderReason(reasons);

const renderRating = (rating) => {
  return Array.from({ length: rating })
    .map(
      () =>
        `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor">
      <path d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17Z"></path>
    </svg>`
    )
    .join("");
};

const renderBestseller = (data) => {
  let html = "";
  html = data.map((element) => {
    return `
        <div class="swiper-slide">
          <article class="bestseller__item">
            <a href="${element.url}" class="bestseller__thumbnail">
              <figure>
                <img
                  src=${element.image}
                  alt="product image" 
                  loading="lazy" />
              </figure>
              <div class="bestseller__thumbnail--badge">
                ${
                  element.discount > 0
                    ? `<div class="bestseller__badge badge-discount text-p3">Save ${element.discount}%</div>`
                    : ""
                }
                ${
                  element.label
                    ? `<div class="bestseller__badge badge-new text-p3">
                  ${element.label}
                </div>`
                    : ""
                }
              </div>
              <div class="bestseller__thumbnail--button">
                <button class="btn btn-add">
                  <span>add to cart</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="52"
                    height="52"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-plus">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
            </a>
            <div class="bestseller__brand text-h5">${element.brand}</div>
            <div class="bestseller__title text-h6">
              <a href=${element.url}
                >${element.title}</a
              >
            </div>
            <div class="bestseller__price">
              <span class="bestseller__price--new">$${element.priceNew.toFixed(
                2
              )}</span>
              ${
                element.priceOld > 0
                  ? `<span class="bestseller__price--old">$${element.priceOld.toFixed(
                      2
                    )}</span>`
                  : ""
              }
            </div>
            <div class="bestseller__ratings">
            ${renderRating(element.rating)}
            </div>
          </article>
        </div>
    `;
  });

  document.querySelector(".bestseller__list").innerHTML = html.join("");
};
renderBestseller(bestsellers);

const renderService = (data) => {
  let html = "";
  html = data.map((element) => {
    return `
      <article class="service__item">
        <div class="service__item--icon">
          <img src=${element.icon} alt="" />
        </div>
        <div class="text-h6">${element.title}</div>
        <div class="text-p2">
          ${element.description}
        </div>
      </article>
    `;
  });

  document.querySelector(".service__list").innerHTML = html.join("");
};
renderService(services);

const renderFeedback = (data) => {
  let html = "";
  html = data.map((element) => {
    return `
      <div class="swiper-slide">
        <div class="feedback__wrapper">
          <figure class="feedback__avatar">
            <img src="${element.avatar}" loading="lazy" alt="avatar feedback" />
          </figure>
          <div class="feedback__content">
            <div class="feedback__ratings">
              ${renderRating(element.star)}
            </div>
            <div class="text-p1">
              ${element.feedback}
            </div>
            <div class="feedback__name text-p1">– ${element.name}</div>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector(".feedback__list").innerHTML = html.join("");
};

renderFeedback(feedbacks);

const renderQuestion = (data) => {
  let html = "";
  html = data.map((element) => {
    return `
      <div class="accordion__item">
        <div class="accordion__item--header">
          <span>${element.question}</span>
          <div class="accordion__header--icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path
                d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
            </svg>
          </div>
        </div>
        <div class="accordion__item--body">
          <div class="accordion__content text-p2">${element.answer}</div>
        </div>
      </div>
    `;
  });
  document.querySelector(".question__accordion").innerHTML = html.join("");
};
renderQuestion(questions);

const renderOverview = (data) => {
  let html = "",
    modal = "";
  html = data.map((element) => {
    return `
      <div class="swiper-slide">
        <figure>
          <img
            src=${element.image}
            alt="product image" />
        </figure>
      </div>
    `;
  });
  modal = data.map((element) => {
    return `
      <div class="swiper-slide">
        <div class="swiper-zoom-container">
          <figure>
            <img
              src=${element.image}
              alt="product image" />
          </figure>
        </div>
      </div>
    `;
  });

  document.querySelector(".overview__gallery").innerHTML = html.join("");
  document.querySelector(".modal__gallery").innerHTML = modal.join("");
};
renderOverview(overviews);
