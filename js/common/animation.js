console.log('JS in work');

const Width = {
  DESKTOP_WIDTH: 1920,
  TABLET_WIDTH: 768,
  MOBILE_WIDTH: 320,
  CONTAINER_WIDTH: 1440,
};

//---BECOME---

const animateSlider = document.querySelector('.animation-slides');

const toggleClass = (className) => {
  animateSlider.classList.toggle(className);
};

const setAnimation = () => {
  const windowWidth = document.documentElement.clientWidth;

  if (windowWidth < Width.TABLET_WIDTH) {
    !animateSlider.classList.contains('mobile') && animateSlider.classList.add('mobile');
  } else {
    animateSlider.classList.contains('mobile') && animateSlider.classList.remove('mobile');
  }
};

setInterval(() => toggleClass('animation-slides--active-right'), 3500);

setAnimation();

window.addEventListener('resize', () => {
  setAnimation();
});

