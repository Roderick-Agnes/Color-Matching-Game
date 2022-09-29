'use strict';
import { GAME_STATUS, PAIRS_COUNT } from './constants.js';
import { getRandomColorPairs } from './utils.js';

// Global variables
let selections = [];
let gameState = GAME_STATUS.PLAYING;

// TODOs
// 1. Generating colors using https://github.com/davidmerfield/randomColor
getRandomColorPairs(PAIRS_COUNT);
console.log('colors', getRandomColorPairs(PAIRS_COUNT));

// 2. Attach item click for all li elements
// 3. Check win logic
// 4. Add timer
// 5. Handle replay click
