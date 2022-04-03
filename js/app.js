window.addEventListener('resize', () => {
  console.log(window.innerWidth);
});

/** =========== ALL THE MAGIC IS HAPPENING HERE ============ */

/** =========== MOBILE NAVIGATION ============ */
function mobileNavigation() {
  const navigationMenuBtn = document.querySelector('.navbar__menu-btns');
  const headerEl = document.querySelector('.header__container');

  navigationMenuBtn.addEventListener('click', function () {
    headerEl.classList.toggle('menu__open');
  });
}
mobileNavigation();

/** =========== MOBILE NAVIGATION ============ */
function stickyNavbar() {
  const sectionHeroEl = document.querySelector('.section__hero');

  const obs = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];

      if (ent.isIntersecting === false) {
        document.body.classList.add('sticky');
      }

      if (ent.isIntersecting === true) {
        document.body.classList.remove('sticky');
      }
    },
    {
      // In the viewport
      root: null,
      threshold: 0,
      rootMargin: '-80px',
    }
  );

  obs.observe(sectionHeroEl);
}
stickyNavbar();

/** =========== HERO CAROUSEL/SLIDESHOW ============ */
function heroCarousel() {
  const heroImgsContainer = document.getElementById('hero-imgs');
  const heroLeftBtn = document.getElementById('hero-left-arrow');
  const heroRightBtn = document.getElementById('hero-right-arrow');

  const heroImgs = document.querySelectorAll('#hero-imgs img');

  let heroIndex = 0;

  let interval = setInterval(runHeroSlideshow, 2000);

  function runHeroSlideshow() {
    heroIndex++;
    changeHeroSlide();
  }

  function changeHeroSlide() {
    if (heroIndex > heroImgs.length - 1) {
      heroIndex = 0;
    } else if (heroIndex < 0) {
      heroIndex = heroImgs.length - 1;
    }

    heroImgsContainer.style.transform = `translateX(${-heroIndex * 25}%)`;
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(runHeroSlideshow, 2000);
  }

  heroRightBtn.addEventListener('click', () => {
    heroIndex++;
    changeHeroSlide();
    resetInterval();
  });

  heroLeftBtn.addEventListener('click', () => {
    heroIndex--;
    changeHeroSlide();
    resetInterval();
  });
}
heroCarousel();

/** =========== TESTIMONIAL CAROUSEL/SLIDESHOW ============ */
function testimonialCarousel() {
  const testimonialCardContainer = document.getElementById(
    'testimonial-card-container'
  );
  const testimonialRightBtn = document.getElementById(
    'testimonial-right-arrow'
  );
  const testimonialLeftBtn = document.getElementById('testimonial-left-arrow');

  const testimonialCards = document.querySelectorAll('.testimonial__card');

  let testimonialIndex = 0;

  let setTestimonialInterval = setInterval(runTestimonialSlideshow, 2000);

  function runTestimonialSlideshow() {
    testimonialIndex++;
    changeTestimonialCard();
  }

  function changeTestimonialCard() {
    let flexGap = 96;
    if (testimonialIndex > testimonialCards.length - 1) {
      testimonialIndex = 0;
    } else if (testimonialIndex < 0) {
      testimonialIndex = testimonialCards.length - 1;
    }

    if (window.innerWidth <= 1136) {
      flexGap = 84;
    } else if (window.innerWidth <= 944) {
      flexGap = 64;
    }

    testimonialCardContainer.style.transform = `translateX(${
      -testimonialIndex * (+testimonialCards[0].clientWidth + flexGap)
    }px)`;
  }

  function resetTestimonialInterval() {
    clearInterval(setTestimonialInterval);
    setTestimonialInterval = setInterval(runTestimonialSlideshow, 2000);
  }

  testimonialRightBtn.addEventListener('click', () => {
    testimonialIndex++;
    changeTestimonialCard();
    resetTestimonialInterval();
  });

  testimonialLeftBtn.addEventListener('click', () => {
    testimonialIndex--;
    changeTestimonialCard();
    resetTestimonialInterval();
  });
}
testimonialCarousel();

/** =========== RANGE SLIDER ============ */
// CREATE RANGE SLIDER FUNCTION--> SEARCH COMPONENT
function rangeSlider() {
  const rangeInput = document.querySelectorAll('.range__input input'),
    areaInput = document.querySelectorAll('.area__value'),
    range = document.querySelector('.slider .progress');
  let areaGap = 330;

  rangeInput.forEach((input) => {
    input.addEventListener('input', (e) => {
      let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

      if (maxVal - minVal < areaGap) {
        if (e.target.className === 'range__min') {
          rangeInput[0].value = maxVal - areaGap;
        } else {
          rangeInput[1].value = minVal + areaGap;
        }
      } else {
        areaInput[0].innerText = minVal;
        areaInput[1].innerText = maxVal;
        range.style.left = (minVal / rangeInput[0].max) * 100 + '%';
        range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + '%';
      }
    });
  });
}
// CALL RANGE SLIDER FUNCTION --> SEARCH COMPONENT
rangeSlider();

/** =========== UTILITIES ============ */

/** =========== CHANGE THE FOOTER COPYRIGHT YEAR ============ */
// Set current year
const yearEl = document.querySelector('.footer__year');
const currentYear = new Date().getFullYear();
// yearEl.textContent = currentYear;

/** =========== SMOOTH SCROLLING ANIMATION ============ */
function smoothScrolling() {
  const allLinks = document.querySelectorAll('a:link');

  allLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const href = link.getAttribute('href');

      // Scroll back to top
      if (href === '#')
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

      // Scroll to other links
      if (href !== '#' && href.startsWith('#')) {
        const sectionEl = document.querySelector(href);
        sectionEl.scrollIntoView({ behavior: 'smooth' });
      }

      // Scroll to other pages
      if (href !== '#') {
        window.open(href, '_self');
      }

      // Close mobile naviagtion
      const headerEl = document.querySelector('.header__container');
      if (link.classList.contains('navbar__link'))
        headerEl.classList.toggle('menu__open');
    });
  });
}
smoothScrolling();

/** =========== SCROLL TO TOP ============ */

const scrollToTop = function () {
  // GET THE SCROLL TOP ARROW BTN
  const scrollBtnTop = document.getElementById('scroll-top-btn');

  // Reveal the button
  const btnReveal = function () {
    if (window.scrollY >= 300) {
      scrollBtnTop.classList.add('is-visible');
    } else {
      scrollBtnTop.classList.remove('is-visible');
    }
  };

  // Smooth scroll top
  // Thanks to => http://stackoverflow.com/a/22610562
  const topScrollTo = function () {
    if (window.scrollY != 0) {
      setTimeout(function () {
        window.scrollTo(0, window.scrollY - 580);
        topScrollTo();
      }, 5);
    }
  };
  // LISTEN ON WINDOW SCROLL
  window.addEventListener('scroll', btnReveal);
  scrollBtnTop.addEventListener('click', topScrollTo);
};
scrollToTop();

/** =========== FIX FLEX GAP FOR SAFARI ============ */
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  const flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  const isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}

checkFlexGap();
