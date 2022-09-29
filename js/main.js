'use strict';
import { GAME_STATUS, PAIRS_COUNT } from './constants.js';
import { getColorElementList, getColorListElement, getInActiveColorList } from './selectors.js';
import { getRandomColorPairs } from './utils.js';

// Global variables
let selections = [];
let gameStatus = GAME_STATUS.PLAYING;

// Flow
// 1. Generating colors using https://github.com/davidmerfield/randomColor
// 2. Attach item click for all li elements
// 3. Check win logic
// 4. Add timer
// 5. Handle replay click

function handleLiElementClick(liElement) {
  const shouldBlockClick = [GAME_STATUS.FINISHED, GAME_STATUS.BLOCKING].includes(gameStatus);

  if (!liElement || shouldBlockClick) return;
  // add active class to li element
  liElement.classList.add('active');

  // add li element to selections array
  selections.push(liElement);
  if (selections.length < 2) return;

  // handle matching
  const isMatchColors = selections[0].dataset.color === selections[1].dataset.color;
  if (isMatchColors) {
    selections = [];
    // check win
    const isWin = getInActiveColorList().length === 0;
    // handle ...
    console.log('you win');
  } else {
    // set game status to blocking mode
    gameStatus = GAME_STATUS.BLOCKING;
    // spend time to load animation
    setTimeout(() => {
      // li element in selections should remove active class
      selections[0].classList.remove('active');
      selections[1].classList.remove('active');
      // reset selections
      selections = [];

      // close blocking mode
      gameStatus = GAME_STATUS.PLAYING;
    }, 500);
  }
}
function attachClickEventForColorList() {
  // find color list element
  const colorsElement = getColorListElement();
  if (!colorsElement) return;

  // add click event for color list element
  colorsElement.addEventListener('click', (event) => {
    if (event.target.tagName !== 'LI') return;
    handleLiElementClick(event.target);
  });
}

function initColors() {
  // get color list
  const colors = getRandomColorPairs(PAIRS_COUNT);

  // 1. get all li list
  const liElements = getColorElementList();

  // 2. each li element , we will find div.overlay element and add color for it
  liElements.forEach((liElement, idx) => {
    if (liElement) liElement.dataset.color = colors[idx];
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
  initColors();

  // add click event to colorList element
  attachClickEventForColorList();
})();
