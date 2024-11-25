/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
console.log('JS in work');
const Width = {
  DESKTOP_WIDTH: 1920,
  TABLET_WIDTH: 768,
  MOBILE_WIDTH: 320,
  CONTAINER_WIDTH: 1440
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
setMobileAnimation();
/******/ })()
;