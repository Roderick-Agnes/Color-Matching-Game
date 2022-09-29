'use strict';
import { GAME_STATUS, GAME_TIME, PAIRS_COUNT } from './constants.js';
import {
  getColorBackground,
  getColorElementList,
  getColorListElement,
  getInActiveColorList,
  getPlayAgainButton,
} from './selectors.js';
import {
  createTimer,
  getRandomColorPairs,
  hidePlayAgainButton,
  setTimerText,
  showPlayAgainButton,
} from './utils.js';

// Global variables
let selections = [];
let gameStatus = GAME_STATUS.PLAYING;
let timer = createTimer({
  seconds: GAME_TIME,
  onChange: handleTimerChange,
  onFinish: handleTimerFinish,
});

// Flow
// 1. Generating colors using https://github.com/davidmerfield/randomColor
// 2. Attach item click for all li elements
// 3. Check win logic
// 4. Handle replay click
// 5. Add timer

function handleLiElementClick(liElement) {
  const shouldBlockClick = [GAME_STATUS.FINISHED, GAME_STATUS.BLOCKING].includes(gameStatus);

  // check not allowed click event if li element is click one more time
  const isClicked = liElement.classList.contains('active');
  if (!liElement || isClicked || shouldBlockClick) return;
  // add active class to li element
  liElement.classList.add('active');

  // add li element to selections array
  selections.push(liElement);
  if (selections.length < 2) return;

  // handle matching
  const isMatchColors = selections[0].dataset.color === selections[1].dataset.color;
  if (isMatchColors) {
    // change background color if matching
    const background = getColorBackground();
    background.style.background = selections[0].dataset.color;
    // reset selection to push and handle in next turn
    selections = [];
    // check win
    const isWin = getInActiveColorList().length === 0;
    if (isWin) {
      gameStatus = GAME_STATUS.FINISHED;
      showPlayAgainButton();
      setTimerText('YOU WIN! 😊');
      timer.clear();
    }
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
function resetButton() {
  // set game status
  gameStatus = GAME_STATUS.PLAYING;

  // set selection is empty array
  selections = [];

  // set timer text is empty
  setTimerText('');

  // hide play again button
  hidePlayAgainButton();

  // update all DOM li elements
  const liElements = getColorElementList();
  for (const liElement of liElements) {
    liElement.classList.remove('active');
  }

  // init color list
  initColors();

  // start time countdown
  startTimer();
}
function attachClickEventForPlayAgainButton() {
  const playAgainButton = getPlayAgainButton();
  if (playAgainButton) {
    playAgainButton.addEventListener('click', resetButton);
  }
}
function handleTimerChange(currentSecond) {
  // handle something...
  const fullTime = `0${currentSecond}`.slice(-2);
  setTimerText(`Time: ${fullTime}`);
}
function handleTimerFinish() {
  // handle something...

  // update game status
  gameStatus = GAME_STATUS.FINISHED;

  // show result message
  setTimerText('Game Over! 🤣');

  // show play again button
  showPlayAgainButton();
}
function startTimer() {
  timer.start();
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
  //   console.log('game is running...');
  initColors();

  // add click event to colorList element
  attachClickEventForColorList();

  // add click event to play again button
  attachClickEventForPlayAgainButton();

  // start time countdown timer
  startTimer();
})();
