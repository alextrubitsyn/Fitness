'use strict'

;(function () {
  var mainElement = document.querySelector('.coaches');
  var sliderItems = mainElement.querySelectorAll('.coaches__item');
  var sliderMoveLeft = mainElement.querySelector('.coaches__slider-control--left');
  var sliderMoveRight = mainElement.querySelector('.coaches__slider-control--right');
  var positionLeftItem = 0;
  var countSlidesCurrent = COUNT_SLIDES_DESKTOP;
  var COUNT_SLIDES_DESKTOP = 4;
  var COUNT_SLIDES_TABLET = 2;
  var COUNT_SLIDES_MOBILE = 1;
  var BREAKPOINT_TABLET = 768;
  var BREAKPOINT_DESKTOP = 1200;

  var makeSlider = function () {
    for (var i = 0; i < sliderItems.length; i++) {
      if (i >= positionLeftItem && i < positionLeftItem + countSlidesCurrent) {
        sliderItems[i].classList.add('coaches__item--show');
        if (i < positionLeftItem + countSlidesCurrent - 1 && countSlidesCurrent === COUNT_SLIDES_DESKTOP) {
          sliderItems[i].style.marginRight = '3.448%';
        } else if (i < positionLeftItem + countSlidesCurrent - 1 && countSlidesCurrent === COUNT_SLIDES_TABLET) {
          sliderItems[i].style.marginRight = '30px';
        } else {
          sliderItems[i].style.marginRight = '0px';
        }
      } else {
        sliderItems[i].classList.remove('coaches__item--show');
        sliderItems[i].style.marginRight = '0px';
      }
    }
  };

  var onButtonLeftClick = function (evtLeft) {
    evtLeft.preventDefault();
    if (positionLeftItem > 0) {
      positionLeftItem = positionLeftItem - countSlidesCurrent;
      if (positionLeftItem < 0) {
        positionLeftItem = 0;
      }
    }
    makeSlider();
  };

  var onButtonRightClick = function (evtRight) {
    evtRight.preventDefault();
    if (sliderItems.length - positionLeftItem > countSlidesCurrent) {
      positionLeftItem = positionLeftItem + countSlidesCurrent;
      if (positionLeftItem > sliderItems.length) {
        positionLeftItem = sliderItems.length;
      }
    }
    makeSlider();
  };

  var setCountSlides = function () {

    var widthElement = mainElement.offsetWidth;

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
    makeSlider();
  };

  if (sliderItems && sliderMoveLeft && sliderMoveRight) {
    setCountSlides();
    makeSlider();
    sliderMoveLeft.addEventListener('click', onButtonLeftClick);
    sliderMoveRight.addEventListener('click', onButtonRightClick);
  }

})();
