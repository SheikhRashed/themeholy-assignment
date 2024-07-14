

let thApp = (function (win, doc) {

  "use strict";

  var thApp = {}

  function domLoad(callback) {
    document.addEventListener('DOMContentLoaded', callback, false);
  }

  function winLoad(callback) {
    window.addEventListener('load', callback, false);
  }

  function onResize(callback, selector) {
    selector = (typeof selector === typeof undefined) ? window : selector;
    selector.addEventListener('resize', callback)
  }

  thApp.winLoad = winLoad;
  thApp.domLoad = domLoad;
  thApp.onResize = onResize;

  return thApp;

}(window, document));

thApp = function (thApp) {

  "use strict";

  /* 
  -------------------------------------
  ** 🌐 Global Uses -
  -------------------------------------
  */

  thApp.BS = {};
  thApp.Addons = {};
  thApp.Custom = {};
  thApp.Toggle = {};
  thApp.body = document.querySelector('body');
  thApp.Win = { height: window.innerHeight, width: window.innerWidth };
  thApp.Break = { mb: 420, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400, any: Infinity };

  thApp.State = {
    isTouch: (("ontouchstart" in document.documentElement)) ? true : false,
    isMobile: (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|/i)) ? true : false,
    asMobile: (thApp.Win.width < thApp.Break.md) ? true : false
  };

  thApp.StateUpdate = function () {
    thApp.Win = { height: window.innerHeight, width: window.innerWidth };
    thApp.State.asMobile = (thApp.Win.width < thApp.Break.md) ? true : false;
  };

  thApp.SlideUp = function (target, duration = 500) {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight; target.style.overflow = 'hidden'; target.style.height = 0;
    target.style.paddingTop = 0; target.style.paddingBottom = 0;
    target.style.marginTop = 0; target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  };

  thApp.SlideDown = function (target, duration = 500) {
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden'; target.style.height = 0; target.style.paddingTop = 0;
    target.style.paddingBottom = 0; target.style.marginTop = 0;
    target.style.marginBottom = 0; target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top'); target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top'); target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  };

  thApp.SlideToggle = function (target, duration = 500) {
    if (window.getComputedStyle(target).display === 'none') {
      return thApp.SlideDown(target, duration);
    } else {
      return thApp.SlideUp(target, duration);
    }
  };

  thApp.Debounce = function (func, delay) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  return thApp;

}(thApp);
