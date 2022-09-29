'use strict';
import { GAME_STATUS, PAIRS_COUNT } from './constants.js';
import { getColorElementList, getColorListElement } from './selectors.js';
import { getRandomColorPairs } from './utils.js';

// Global variables
let selections = [];
let gameState = GAME_STATUS.PLAYING;

// TODOs
// 1. Generating colors using https://github.com/davidmerfield/randomColor
console.log('colors', getRandomColorPairs(PAIRS_COUNT));

// 2. Attach item click for all li elements
// 3. Check win logic
// 4. Add timer
// 5. Handle replay click

function handleLiElementClick(liElement) {
  if (!liElement) return;
  // add active class to li element
  liElement.classList.add('active');
}
function attachClickEventForColorList() {
  // find color list element
  const colorsElement = getColorListElement();
  if (!colorsElement) return;

  // add click event for color list element
  colorsElement.addEventListener('click', (event) => {
    handleLiElementClick(event.target);
  });
}

function initMain() {
  // get color list
  const colors = getRandomColorPairs(PAIRS_COUNT);

  // 1. get all li list
  const liElements = getColorElementList();

  // 2. each li element , we will find div.overlay element and add color for it
  liElements.forEach((liElement, idx) => {
    // find overlay element
    const divOverlay = liElement.querySelector('.overlay');
    if (!divOverlay) return;
    // add color for overlay element
    divOverlay.style.backgroundColor = colors[idx];
  });
}

// main
(() => {
  console.log('main is running...');
  initMain();

  // add click event to colorList element
  attachClickEventForColorList();
})();
