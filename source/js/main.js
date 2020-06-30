'use strict'

;(function () {
  var mainElementCoaches = document.querySelector('.coaches');
  var sliderCoachesItems = mainElementCoaches.querySelectorAll('.coaches__item');
  var sliderCoachesMoveLeft = mainElementCoaches.querySelector('.coaches__slider-control--left');
  var sliderCoachesMoveRight = mainElementCoaches.querySelector('.coaches__slider-control--right');
  var mainElementReviews = document.querySelector('.reviews__container');
  var sliderReviewsItems = mainElementReviews.querySelectorAll('.reviews__item');
  var sliderReviewsMoveLeft = mainElementReviews.querySelector('.reviews__slider-control--left');
  var sliderReviewsMoveRight = mainElementReviews.querySelector('.reviews__slider-control--right');
  var formContacts = document.querySelector('.contacts__form');
  var telInput = formContacts.querySelector('input[type="tel"]');
  var positionLeftItemCoaches = 0;
  var positionLeftItemReviews = 0;
  var countSlidesCurrent = COUNT_SLIDES_DESKTOP;
  var COUNT_SLIDES_DESKTOP = 4;
  var COUNT_SLIDES_TABLET = 2;
  var COUNT_SLIDES_MOBILE = 1;
  var BREAKPOINT_TABLET = 768;
  var BREAKPOINT_DESKTOP = 1200;

  var makeCoachesSlider = function () {
    for (var i = 0; i < sliderCoachesItems.length; i++) {
      var item = sliderCoachesItems[i];
      if (i >= positionLeftItemCoaches && i < positionLeftItemCoaches + countSlidesCurrent) {
        item.classList.add('coaches__item--show');
        if (i < positionLeftItemCoaches + countSlidesCurrent - 1 && countSlidesCurrent === COUNT_SLIDES_DESKTOP) {
          item.style.marginRight = '3.448%';
        } else if (i < positionLeftItemCoaches + countSlidesCurrent - 1 && countSlidesCurrent === COUNT_SLIDES_TABLET) {
          item.style.marginRight = '30px';
        } else {
          item.style.marginRight = '0px';
        }
      } else {
        item.classList.remove('coaches__item--show');
        item.style.marginRight = '0px';
      }
    }
  };

  var makeReviewsSlider = function () {
    for (var i = 0; i < sliderReviewsItems.length; i++) {
      var item = sliderReviewsItems[i];
      if (i === positionLeftItemReviews) {
        item.classList.add('reviews__item--show');
      } else {
        item.classList.remove('reviews__item--show');
      }
    }
  };

  var onButtonLeftCoachesClick = function (evtCoachesLeft) {
    evtCoachesLeft.preventDefault();
    if (positionLeftItemCoaches > 0) {
      positionLeftItemCoaches = positionLeftItemCoaches - countSlidesCurrent;
      if (positionLeftItemCoaches < 0) {
        positionLeftItemCoaches = 0;
      }
    }
    makeCoachesSlider();
  };

  var onButtonRightCoachesClick = function (evtCoachesRight) {
    evtCoachesRight.preventDefault();
    if (sliderCoachesItems.length - positionLeftItemCoaches > countSlidesCurrent) {
      positionLeftItemCoaches = positionLeftItemCoaches + countSlidesCurrent;
      if (positionLeftItemCoaches > sliderCoachesItems.length) {
        positionLeftItemCoaches = sliderCoachesItems.length;
      }
    }
    makeCoachesSlider();
  };

  var onButtonLeftReviewsClick = function (evtReviewsLeft) {
    evtReviewsLeft.preventDefault();
    if (positionLeftItemReviews > 0) {
      positionLeftItemReviews--;
    }
    makeReviewsSlider();
  };

  var onButtonRightReviewsClick = function (evtReviewsRight) {
    evtReviewsRight.preventDefault();
    if (positionLeftItemReviews < sliderReviewsItems.length - 1) {
      positionLeftItemReviews++;
    }
    makeReviewsSlider();
  };

  var setCountSlides = function () {

    var widthElement = mainElementCoaches.offsetWidth;

    if (widthElement < BREAKPOINT_TABLET) {
      countSlidesCurrent = COUNT_SLIDES_MOBILE;
    } else if (widthElement > BREAKPOINT_DESKTOP) {
      countSlidesCurrent = COUNT_SLIDES_DESKTOP;
    } else {
      countSlidesCurrent = COUNT_SLIDES_TABLET;
    }
  };

  window.onresize = function () {
    setCountSlides();
    makeCoachesSlider();
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

  if (sliderCoachesItems && sliderCoachesMoveLeft && sliderCoachesMoveRight) {
    setCountSlides();
    makeCoachesSlider();
    sliderCoachesMoveLeft.addEventListener('click', onButtonLeftCoachesClick);
    sliderCoachesMoveRight.addEventListener('click', onButtonRightCoachesClick);
  }

  if (sliderReviewsItems && sliderReviewsMoveLeft && sliderReviewsMoveRight) {
    makeReviewsSlider();
    sliderReviewsMoveLeft.addEventListener('click', onButtonLeftReviewsClick);
    sliderReviewsMoveRight.addEventListener('click', onButtonRightReviewsClick);
  }

  if (telInput) {
    telInput.addEventListener('input', onInputChange, false);
  }

})();
