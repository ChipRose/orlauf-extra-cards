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

//---CURSOR---

const cursor = document.getElementById('cursor');
const cursorArea = document.getElementById('cursorArea');

const handleMouseMove = (evt) => {
  const x = evt.clientX;
  const y = evt.clientY;

  const rect = cursorArea.getBoundingClientRect();

  const isInside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

  if (isInside) {
    cursor.style.left = `${x - 40}px`;
    cursor.style.top = `${y - rect.top - 10}px`;
    cursor.style.display = 'block';
  } else {
    cursor.style.display = 'none';
  }
};

document.addEventListener('mousemove', handleMouseMove);

cursorArea.addEventListener('mouseenter', () => {
  document.body.style.cursor = 'none';
});

cursorArea.addEventListener('mouseleave', () => {
  document.body.style.cursor = 'default';
  cursor.style.display = 'none';
});

