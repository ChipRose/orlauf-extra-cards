// import "https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css";
import { tns } from 'tiny-slider';

console.log('JS in work');

const Width = {
  DESKTOP_WIDTH: 1920,
  TABLET_WIDTH: 768,
  MOBILE_WIDTH: 320,
  CONTAINER_WIDTH: 1440,
};

const getWindowWidth = () => {
  return document.documentElement.clientWidth;
};

//---BECOME---

const animateSlider = document.querySelector('.animation-slides');

const toggleClass = (className) => {
  animateSlider.classList.toggle(className);
};

const setAnimation = () => {
  const windowWidth = getWindowWidth();

  if (windowWidth < Width.TABLET_WIDTH) {
    !animateSlider.classList.contains('mobile') && animateSlider.classList.add('mobile');
  } else {
    animateSlider.classList.contains('mobile') && animateSlider.classList.remove('mobile');
  }
};

setInterval(() => toggleClass('animation-slides--active-right'), 3500);

setAnimation();

//---CURSOR---

const cursor = document.getElementById('cursor');
const cursorArea = document.getElementById('cursorArea');

const handleMouseMove = (evt) => {
  const x = evt.clientX;
  const y = evt.clientY;

  const xLeft = evt.pageX;
  const yTop = evt.pageY;

  const rect = cursorArea.getBoundingClientRect();
  const isInside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

  if (isInside) {
    cursor.style.left = `${xLeft - 45}px`;
    cursor.style.top = `${yTop - 15}px`;
    cursor.style.display = 'block';
  } else {
    cursor.style.display = 'none';
  }
};

const handleMouseEnter = () => {
  document.body.style.cursor = 'none';
};

const handleMouseLeave = () => {
  document.body.style.cursor = 'default';
  cursor.style.display = 'none';
};

const addCustomCursor = () => {
  document.addEventListener('mousemove', handleMouseMove);

  cursorArea.addEventListener('mouseenter', handleMouseEnter);

  cursorArea.addEventListener('mouseleave', handleMouseLeave);
};

const removeCustomCursor = () => {
  cursor.style.display = 'none';
  document.body.style.cursor = 'default';

  document.removeEventListener('mousemove', handleMouseMove);

  cursorArea.removeEventListener('mouseenter', handleMouseEnter);

  cursorArea.removeEventListener('mouseleave', handleMouseLeave);
};

const setCustomCursor = () => {
  const windowWidth = getWindowWidth();

  if (windowWidth > Width.TABLET_WIDTH) {
    addCustomCursor();
  } else {
    removeCustomCursor();
  }
};

setCustomCursor();

//-----------------

window.addEventListener('resize', () => {
  setAnimation();
  setCustomCursor();
});

//SLIDER

const controlSlider = tns({
  container: '#controlSlider',
  items: 1,
  controls: false,
  nav:false,
  mouseDrag: true,
  // autoWidth:true,
  viewportMax:100
});

