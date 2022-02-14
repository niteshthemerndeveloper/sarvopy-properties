// Testimonial Carousel Functionality

const testimonialCardContainer = document.getElementById(
  'testimonial-card-container'
);
const testimonialRightBtn = document.getElementById('testimonial-right-arrow');
const testimonialLeftBtn = document.getElementById('testimonial-left-arrow');

const testimonialCards = document.querySelectorAll('.testimonial__card');

let testimonialIndex = 0;

let setTestimonialInterval = setInterval(runTestimonialSlideshow, 2000);

function runTestimonialSlideshow() {
  testimonialIndex++;
  changeTestimonialCard();
}

function changeTestimonialCard() {
  if (testimonialIndex > testimonialCards.length - 1) {
    testimonialIndex = 0;
  } else if (testimonialIndex < 0) {
    testimonialIndex = testimonialCards.length - 1;
  }

  testimonialCardContainer.style.transform = `translateX(${
    -testimonialIndex * 596
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
