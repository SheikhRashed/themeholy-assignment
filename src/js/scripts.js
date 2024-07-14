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
        let _loop = $this.dataset.loop ? JSON.parse($this.dataset.loop) : true;
        let _centeredSlides = $this.dataset.centeredslides ? JSON.parse($this.dataset.centeredslides) : false;
        let _slidesPerView = $this.dataset.slidesperview ? parseInt($this.dataset.slidesperview) : "auto";
        let _speed = $this.dataset.speed ? parseInt($this.dataset.speed) : 300;
        let _spaceBetween = $this.dataset.spaceBetween ? parseInt($this.dataset.spaceBetween) : 12;
        let _effect = $this.dataset.effect ? $this.dataset.effect : 'slide';
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

  thApp.Addons.particlesJS = function (selector) {
    let elements = document.querySelectorAll(selector);
  
    if (elements.length > 0) {
      elements.forEach(element => {
        let $this = element;
        let particlesNumber = $this.dataset.particlesNumber ? parseInt($this.dataset.particlesNumber) : 80;
        let particlesColor = $this.dataset.particlesColor ? $this.dataset.particlesColor : '#ffffff';
        let particlesShape = $this.dataset.particlesShape ? $this.dataset.particlesShape : 'circle';
        let particlesOpacity = $this.dataset.particlesOpacity ? parseFloat($this.dataset.particlesOpacity) : 0.6;
        let particlesSize = $this.dataset.particlesSize ? parseFloat($this.dataset.particlesSize) : 3;
        let lineLinkedEnable = $this.dataset.lineLinkedEnable ? JSON.parse($this.dataset.lineLinkedEnable) : true;
        let lineLinkedDistance = $this.dataset.lineLinkedDistance ? parseInt($this.dataset.lineLinkedDistance) : 150;
        let lineLinkedColor = $this.dataset.lineLinkedColor ? $this.dataset.lineLinkedColor : '#ffffff';
        let lineLinkedOpacity = $this.dataset.lineLinkedOpacity ? parseFloat($this.dataset.lineLinkedOpacity) : 0.4;
        let lineLinkedWidth = $this.dataset.lineLinkedWidth ? parseFloat($this.dataset.lineLinkedWidth) : 1;
        let moveEnable = $this.dataset.moveEnable ? JSON.parse($this.dataset.moveEnable) : true;
        let moveSpeed = $this.dataset.moveSpeed ? parseFloat($this.dataset.moveSpeed) : 6;
        let interactivityDetectOn = $this.dataset.interactivityDetectOn ? $this.dataset.interactivityDetectOn : 'canvas';
        let interactivityOnHoverMode = $this.dataset.interactivityOnHoverMode ? $this.dataset.interactivityOnHoverMode : 'bubble';
  
        particlesJS($this.id, {
          particles: {
            number: {
              value: particlesNumber,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: particlesColor,
            },
            shape: {
              type: particlesShape,
              stroke: {
                width: 0,
                color: "#000000"
              },
              polygon: {
                nb_sides: 5
              },
            },
            opacity: {
              value: particlesOpacity,
              random: true,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
              }
            },
            size: {
              value: particlesSize,
              random: false,
              anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
              }
            },
            line_linked: {
              enable: lineLinkedEnable,
              distance: lineLinkedDistance,
              color: lineLinkedColor,
              opacity: lineLinkedOpacity,
              width: lineLinkedWidth,
            },
            move: {
              enable: moveEnable,
              speed: moveSpeed,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "bounce",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 6000,
                rotateY: 1200
              }
            },
          },
          interactivity: {
            detect_on: interactivityDetectOn,
            events: {
              onhover: {
                enable: true,
                mode: interactivityOnHoverMode,
              },
              onclick: {
                enable: false,
                mode: "push"
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 365.4347455356053,
                line_linked: {
                  opacity: 0.6827791579605474
                }
              },
              bubble: {
                distance: 207.079689136843,
                size: 64.96617698410762,
                duration: 0.8120772123013451,
                opacity: 0.3816762897816322,
                speed: 3
              },
              repulse: {
                distance: 200,
                duration: 0.4
              },
              push: {
                particles_nb: 4
              },
              remove: {
                particles_nb: 2
              }
            }
          },
          retina_detect: true,
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

  thApp.Custom.currentLink = function (selector, activeClass, intoView) {
    let elm = document.querySelectorAll(selector);
    let currentURL = document.location.href,
      removeHash = currentURL.substring(0, (currentURL.indexOf("#") == -1) ? currentURL.length : currentURL.indexOf("#")),
      removeQuery = removeHash.substring(0, (removeHash.indexOf("?") == -1) ? removeHash.length : removeHash.indexOf("?")),
      fileName = removeQuery;

    elm.forEach(function (item) {
      var selfLink = item.getAttribute('href');
      if (fileName.match(selfLink)) {
        // Highlight the current link and its parent
        item.classList.add(activeClass);
        intoView && item.scrollIntoView({ block: "end" });
      } else {
        // Remove highlight from non-matching links
        item.classList.remove(activeClass);
      }
    });
  };

  thApp.Custom.showHidePassword = function (selector) {
    let elem = document.querySelectorAll(selector);
    if (elem) {
      elem.forEach(item => {
        item.addEventListener("click", function (e) {
          e.preventDefault();
          let target = document.getElementById(item.getAttribute("data-target"));

          if (target.type == "password") {
            target.type = "text";
            item.classList.add("is-shown");
          } else {
            target.type = "password";
            item.classList.remove("is-shown");
          }
        });
      });
    }
  };

  thApp.Custom.currentYear = function (selector) {
    let year = document.querySelector(selector);
    if (year) {
      year.textContent = new Date().getFullYear();
    }
  };

  thApp.Custom.preLoader = function (selector) {
    let preloaderElement = document.querySelector(selector);
    if (preloaderElement) {
      preloaderElement.classList.add('hide');
    }
  };

  thApp.Custom.backToTop = function(target) {
    let element = document.querySelector(target);
      window.addEventListener("scroll", ()=> {
          window.scrollY > 60 ? element.classList.add("active") : element.classList.remove("active")
      })
}

  thApp.Custom.init = function () {
    thApp.Addons.aos();
    thApp.Navbar.sticky('.sr-header'); 
    thApp.Custom.backToTop('.scroll-top')
    thApp.Custom.preLoader('.sr-preloader');
    thApp.Custom.currentYear('#currentYear');
    thApp.Addons.particlesJS('#sr-particle-init');
    thApp.Addons.swiperCarousel('.sr-swiper-init');
  }

  thApp.init = function () {
    thApp.winLoad(thApp.Custom.init);
  }

  thApp.init();

  return thApp;

})(thApp);
