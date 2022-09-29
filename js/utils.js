import { getPlayAgainButton, getTimerElement } from './selectors.js';

function shuffleColors(colors) {
  if (!Array.isArray(colors) || colors.length <= 2) return;

  // shuffle colors
  for (let i = colors.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * i);

    // change color position at index equal i and j
    const temp = colors[i];
    colors[i] = colors[j];
    colors[j] = temp;
  }
}

export const getRandomColorPairs = (count) => {
  // receive count --> return count * 2 random colors
  // using lib: https://github.com/davidmerfield/randomColor

  const colors = [];
  const hues = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'monochrome'];

  for (let i = 0; i < count; i++) {
    // Returns a hex code for a 'truly random' color
    const color = randomColor({
      luminosity: 'dark',
      hue: hues[i % hues.length], // if count value > hues length then result is error, so we need to: 7 <= index <= 0
    });

    // add color to color list
    colors.push(color);
  }

  // duplicate color list because the game have 8x2 color
  const mainColors = [...colors, ...colors];
  shuffleColors(mainColors);

  return mainColors;
};

export function showPlayAgainButton() {
  const playAgainButton = getPlayAgainButton();
  if (playAgainButton) playAgainButton.classList.add('show');
}
export function hidePlayAgainButton() {
  const playAgainButton = getPlayAgainButton();
  if (playAgainButton) playAgainButton.classList.remove('show');
}
export function setTimerText(text) {
  const timerElement = getTimerElement();
  if (timerElement) timerElement.textContent = text;
}

export function createTimer({ seconds, onChange, onFinish }) {
  let intervalId = null;

  function start() {
    clear();
    let currentSecond = seconds;
    intervalId = setInterval(() => {
      onChange?.(currentSecond);
      currentSecond--;
      if (currentSecond < 0) {
        clear();
        onFinish?.();
      }
    }, 1000);
  }

  function clear() {
    clearInterval(intervalId);
  }

  return {
    start,
    clear,
  };
}
