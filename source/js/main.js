'use strict';

(function () {

  var noJsHeader = document.querySelector('.page-header--nojs');
  var pageHeader = document.querySelector('.page-header');
  var toggleButton = pageHeader.querySelector('.page-header__toggle');
  var formBooking = document.querySelector('.early-booking__form');
  var telInput = formBooking.querySelector('input[type="tel"]');

  var onInputChange = function (evt) {
    var val = evt.target.value;
    var newval = val.replace(/\D/g, '').substr(0, 10);
    if (val[0] === '+') {
      evt.target.value = '+' + newval;
    } else {
      evt.target.value = newval;
    }
  };

  if (noJsHeader) {
    noJsHeader.classList.remove('page-header--nojs');
  }

  if (toggleButton) {
    toggleButton.onclick = function () {
      pageHeader.classList.toggle('page-header--menu-open');
    };
  }

  if (telInput) {
    telInput.addEventListener('input', onInputChange, false);
  }

})();
