console.log('JS in work');

const Width = {
  DESKTOP_WIDTH: 1920,
  TABLET_WIDTH: 768,
  MOBILE_WIDTH: 320,
  CONTAINER_WIDTH: 1440,
};

const windowWidth = document.documentElement.clientWidth;

//---BECOME---

const sliderBecome = document.querySelector('.become__slides');

const toggleClasses = () => {
  sliderBecome.classList.toggle('become__slides--active-right');
};

const setMobileAnimation = () => {
  let animationTimeout = null;

  if (windowWidth < Width.TABLET_WIDTH) {
    animationTimeout = setInterval(toggleClasses, 3500);
  } else {
    sliderBecome.classList.contains('become__slides--active-right') && sliderBecome.classList.remove('become__slides--active-right');
    animationTimeout && clearInterval(animationTimeout);
  }
};

setMobileAnimation()
