!(function (thApp) {

  "use strict";


  thApp.Navbar = {
    sticky: function (target, alter) {
      let elem = document.querySelectorAll(target);
      if (elem.length > 0) {
        elem.forEach(item => {
          let _item_offset = item.offsetTop;

          window.addEventListener("scroll", function () {
            // Check if the 'demo' class is present on the element
            const hasDemoClass = item.classList.contains('demo');

            if (alter) {
              // Reverse the sticky behavior
              if (window.scrollY < _item_offset && !hasDemoClass) {
                item.classList.add('is-sticky');
              } else {
                item.classList.remove('is-sticky');
              }
            } else {
              // Default sticky behavior
              if (window.scrollY > _item_offset && !hasDemoClass) {
                item.classList.add('is-sticky');
              } else {
                item.classList.remove('is-sticky');
              }
            }
          });
        });
      }
    },

  }

  thApp.Addons.swiperCarousel = function (selector) {
    let elem = document.querySelectorAll(selector);

    if (elem.length > 0) {

      elem.forEach(item => {

        let $this = item;
        let _direction = $this.dataset.direction ? $this.dataset.direction : 'horizontal';
        let _breakpoints = $this.dataset.breakpoints ? JSON.parse($this.dataset.breakpoints) : null;
        let _autoplay = $this.dataset.autoplay ? JSON.parse($this.dataset.autoplay) : false;
        let _loop = $this.dataset.loop ? JSON.parse($this.dataset.loop) : false;
        let _centeredSlides = $this.dataset.centeredslides ? JSON.parse($this.dataset.centeredslides) : false;
        let _slidesPerView = $this.dataset.slidesperview ? parseInt($this.dataset.slidesperview) : "auto";
        let _speed = $this.dataset.speed ? parseInt($this.dataset.speed) : 300;
        let _spaceBetween = $this.dataset.spaceBetween ? parseInt($this.dataset.spaceBetween) : 12;
        let _effect = $this.dataset.effect ? $this.dataset.effect : 'flip';
        let _scrollbar = $this.dataset.scrollbar ? JSON.parse($this.dataset.scrollbar) : false;

        let swiper = new Swiper($this, {

          // Optional parameters
          centeredSlides: _centeredSlides,
          slidesPerView: _slidesPerView,
          loop: _loop,
          speed: _speed,
          autoplay: _autoplay,
          spaceBetween: _spaceBetween,
          effect: _effect,
          freeMode: false,
          direction: _direction,
          autoHeight: true,
          pagination: {
            el: $this.querySelectorAll(".swiper-pagination")[0],
            type: 'bullets',
            clickable: true,
          },
          // Navigation
          navigation: {
            prevEl: $this.querySelectorAll(".swiper-button-prev")[0],
            nextEl: $this.querySelectorAll(".swiper-button-next")[0],
            clickable: true,
          },
          scrollbar: {
            el: $this.querySelectorAll(".swiper-scrollbar")[0],
            hide: _scrollbar,
          },
          breakpoints: _breakpoints,
        });

      });
    }
  }

  thApp.Addons.aos = function () {
    AOS.init({
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 60,
      offset: 120,
      delay: 0,
      duration: 900,
      easing: 'ease',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom'
    });
  }

  thApp.Custom.setBGImage = function (selector) {
    let elements = document.querySelectorAll(`[${selector}]`);

    elements.forEach((element) => {
      let image = element.getAttribute(selector);
      let depthLevel = element.getAttribute('data-img-root') || 'images';

      element.style.backgroundImage = `url(${depthLevel}${image})`;
    });
  };

  thApp.Custom.init = function () {
    thApp.Addons.aos();
    thApp.Navbar.sticky('.sr-header'); 
    thApp.Custom.setBGImage('data-bg-image');
    thApp.Addons.swiperCarousel('.sr-swiper-init');
  }

  thApp.init = function () {
    thApp.winLoad(thApp.Custom.init);
  }

  thApp.init();

  return thApp;

})(thApp);
