'use strict'

;(function () {
  var sliderCoaches = document.querySelector('.coaches');
  var sliderCoachesList = sliderCoaches.querySelector('.slider__list');
  var sliderCoachesItems = sliderCoaches.querySelectorAll('.slider__item');
  var sliderCoachesLeft = sliderCoaches.querySelector('.slider__control--left');
  var sliderCoachesRight = sliderCoaches.querySelector('.slider__control--right');
  var mainElementReviews = document.querySelector('.reviews');
  var sliderReviewsList = mainElementReviews.querySelector('.reviews__list');
  var sliderReviewsItems = mainElementReviews.querySelectorAll('.reviews__item');
  var sliderReviewsMoveLeft = mainElementReviews.querySelector('.reviews__slider-control--left');
  var sliderReviewsMoveRight = mainElementReviews.querySelector('.reviews__slider-control--right');
  var elementProducts = document.querySelector('.products');
  var buttonsProduct = elementProducts.querySelectorAll('.products__button');
  var products = elementProducts.querySelectorAll('.products__item');
  var elementButtons = elementProducts.querySelector('.products__buttons');
  var formContacts = document.querySelector('.contacts__form');
  var telInput = formContacts.querySelector('input[type="tel"]');
  var positionLeftItemCoaches = 0;
  var positionLeftItemReviews = 0;
  var sliderCoachesLastSlide = false;
  var COUNT_SLIDES_DESKTOP = 4;
  var COUNT_SLIDES_TABLET = 2;
  var COUNT_SLIDES_MOBILE = 1;
  var BREAKPOINT_TABLET = 768;
  var BREAKPOINT_DESKTOP = 1200;
  var WIDTH_REVIEWS_DESKTOP = 560;
  var WIDTH_REVIEWS_TABLET = 566;
  var WIDTH_REVIEWS_MOBILE = 226;
  var WIDTH_COACHES_DESKTOP = 22.41379;
  var MARGINRIGHT_COACHES_DESKTOP = 3.448;
  var WIDTH_COACHES_TABLET = 268;
  var MARGINRIGHT_COACHES_TABLET = 30;
  var WIDTH_COACHES_MOBILE = 226;
  var widthReviewCurrent = WIDTH_REVIEWS_DESKTOP;
  var countSlidesCurrent = COUNT_SLIDES_DESKTOP;

  var checkCoachesLastSlide = function () {
    if (sliderCoachesItems.length - positionLeftItemCoaches <= countSlidesCurrent) {
      sliderCoachesLastSlide = true;
    } else {
      sliderCoachesLastSlide = false;
    }
  };

  var makeCoachesSlider = function () {
    checkCoachesLastSlide();
    if (sliderCoachesLastSlide) {
      positionLeftItemCoaches = sliderCoachesItems.length - countSlidesCurrent;
      sliderCoachesRight.classList.remove('slider__control--active');
    } else {
      sliderCoachesRight.classList.add('slider__control--active');
    }
    if (positionLeftItemCoaches === 0) {
      sliderCoachesList.style.left = '0';
      sliderCoachesLeft.classList.remove('slider__control--active');
    } else {
      sliderCoachesLeft.classList.add('slider__control--active');
      if (countSlidesCurrent === 4) {
        sliderCoachesList.style.left = -positionLeftItemCoaches * (WIDTH_COACHES_DESKTOP + MARGINRIGHT_COACHES_DESKTOP) + '%';
      } else if (countSlidesCurrent === 2) {
        sliderCoachesList.style.left = -positionLeftItemCoaches * (WIDTH_COACHES_TABLET + MARGINRIGHT_COACHES_TABLET) + 'px';
      } else {
        sliderCoachesList.style.left = -positionLeftItemCoaches * WIDTH_COACHES_MOBILE + 'px';
      }
    }
  };

  var makeReviewsSlider = function () {
    var widthElement = mainElementReviews.offsetWidth;
    var numberSlide = positionLeftItemReviews / widthReviewCurrent;

    if (widthElement < BREAKPOINT_TABLET) {
      widthReviewCurrent = WIDTH_REVIEWS_MOBILE;
    } else if (widthElement >= BREAKPOINT_DESKTOP) {
      widthReviewCurrent = WIDTH_REVIEWS_DESKTOP;
    } else {
      widthReviewCurrent = WIDTH_REVIEWS_TABLET;
    }

    positionLeftItemReviews = widthReviewCurrent * numberSlide;
    sliderReviewsList.style.left = -positionLeftItemReviews + 'px';
  };

  var onButtonCoachesClick = function (evtCoaches) {
    var btn = evtCoaches.target;
    // нажата стрелка влево
    if (btn.classList.contains('slider__control--left')) {
      if (positionLeftItemCoaches > 0) {
        positionLeftItemCoaches -= countSlidesCurrent;
        if (positionLeftItemCoaches < 0) {
          positionLeftItemCoaches = 0;
        }
      }
      // нажата стрелка вправо
    } else if (btn.classList.contains('slider__control--right')) {
      positionLeftItemCoaches += countSlidesCurrent;
      checkCoachesLastSlide();
      if (sliderCoachesLastSlide) {
        positionLeftItemCoaches = sliderCoachesItems.length - countSlidesCurrent;
      }
    }
    makeCoachesSlider();
  };

  var onButtonLeftReviewsClick = function (evtReviewsLeft) {
    evtReviewsLeft.preventDefault();
    if (positionLeftItemReviews > 0) {
      positionLeftItemReviews = positionLeftItemReviews - widthReviewCurrent;
      if (positionLeftItemReviews < 0) {
        positionLeftItemReviews = 0;
      }
    }
    makeReviewsSlider();
  };

  var onButtonRightReviewsClick = function (evtReviewsRight) {
    evtReviewsRight.preventDefault();
    if (positionLeftItemReviews < (sliderReviewsItems.length - 1) * widthReviewCurrent) {
      positionLeftItemReviews = positionLeftItemReviews + widthReviewCurrent;
      if (positionLeftItemReviews > (sliderReviewsItems.length - 1) * widthReviewCurrent) {
        positionLeftItemReviews = (sliderReviewsItems.length - 1) * widthReviewCurrent;
      }
    }
    makeReviewsSlider();
  };

  var setCountSlides = function () {

    var widthElement = sliderCoaches.offsetWidth;

    if (widthElement < BREAKPOINT_TABLET) {
      countSlidesCurrent = COUNT_SLIDES_MOBILE;
    } else if (widthElement >= BREAKPOINT_DESKTOP) {
      countSlidesCurrent = COUNT_SLIDES_DESKTOP;
    } else {
      countSlidesCurrent = COUNT_SLIDES_TABLET;
    }
  };

  window.onresize = function () {
    setCountSlides();
    makeCoachesSlider();
    makeReviewsSlider();
  };

  var onInputChange = function (evt) {
    var val = evt.target.value;
    var newval = val.replace(/\D/g, '').substr(0, 10);
    if (val[0] === '+') {
      evt.target.value = '+' + newval;
    } else {
      evt.target.value = newval;
    }
  };

  var onButtonProductsClick = function (evtBtnProdt) {
    var classesElement = evtBtnProdt.target.classList;
    for (var i = 0; i < buttonsProduct.length; i++) {
      var item = buttonsProduct[i];
      if (item.classList.contains('products__button--active')) {
        item.classList.remove('products__button--active');
      }
    }

    for (var j = 0; j < classesElement.length; j++) {
      var itemClass = classesElement[j];
      if (itemClass !== 'products__button') {
        var prodModifierPos = itemClass.indexOf('--');
        var prodModifier = '';
        if (prodModifierPos >= 0) {
          prodModifier = itemClass.slice(prodModifierPos, itemClass.length);
        }
      }
    }
    classesElement.add('products__button--active');
    for (var z = 0; z < products.length; z++) {
      if (products[z].classList.contains('products__item--show')) {
        products[z].classList.remove('products__item--show');
      }
    }
    var productActiveClass = 'products__item' + prodModifier;
    var elementProdActive = elementProducts.querySelector('.' + productActiveClass);
    if (elementProdActive) {
      elementProdActive.classList.add('products__item--show');
    }
  };

  if (sliderCoaches) {
    setCountSlides();
    makeCoachesSlider();
    sliderCoaches.addEventListener('click', onButtonCoachesClick);
  }

  if (sliderReviewsItems && sliderReviewsMoveLeft && sliderReviewsMoveRight) {
    makeReviewsSlider();
    sliderReviewsMoveLeft.addEventListener('click', onButtonLeftReviewsClick);
    sliderReviewsMoveRight.addEventListener('click', onButtonRightReviewsClick);
  }

  if (telInput) {
    telInput.addEventListener('input', onInputChange, false);
  }

  if (buttonsProduct) {
    elementButtons.addEventListener('click', onButtonProductsClick);
  }

})();
