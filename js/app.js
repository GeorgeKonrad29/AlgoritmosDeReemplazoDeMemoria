// This file initializes the application and handles user interactions for switching between memory replacement algorithms.

import { fifo } from './algorithms/fifo.js';
import { fifoPlus } from './algorithms/fifo-plus.js';
import { lru } from './algorithms/lru.js';
import { optimal } from './algorithms/optimal.js';

const algorithms = {
    fifo: fifo,
    fifoPlus: fifoPlus,
    lru: lru,
    optimal: optimal
};

let currentAlgorithm = 'fifo';

document.getElementById('algorithm-selector').addEventListener('change', (event) => {
    currentAlgorithm = event.target.value;
    updateDisplay();
});

document.getElementById('run-button').addEventListener('click', () => {
    const referenceString = document.getElementById('reference-string').value.split(',').map(Number);
    const frames = parseInt(document.getElementById('frame-count').value);
    const result = "hola"//algorithms[currentAlgorithm](referenceString, frames);
    displayResult(result);
});

function updateDisplay() {
    const resultArea = document.getElementById('result');
    resultArea.innerHTML = ''; // Clear previous results
}

function displayResult(result) {
    const resultArea = document.getElementById('result');
    resultArea.innerHTML = `Pages in memory: `;
}