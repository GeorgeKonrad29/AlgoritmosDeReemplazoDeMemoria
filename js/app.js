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

document.addEventListener('DOMContentLoaded', () => {
    const guessingAlgorithmsDiv = document.querySelector('.guessingAlgorithms');
    const nonGuessingAlgorithmsDiv = document.querySelector('.nonGuessingAlgorithms');

    if (currentAlgorithm === 'optimal') {
        guessingAlgorithmsDiv.style.display = 'block';
        nonGuessingAlgorithmsDiv.style.display = 'none';
    } else {
        guessingAlgorithmsDiv.style.display = 'none';
        nonGuessingAlgorithmsDiv.style.display = 'block';
    }
});

document.getElementById('algorithm-selector').addEventListener('change', (event) => {
    const guessingAlgorithmsDiv = document.querySelector('.guessingAlgorithms');
    const nonGuessingAlgorithmsDiv = document.querySelector('.nonGuessingAlgorithms');

    // Mostrar u ocultar los divs según el algoritmo seleccionado
    if (event.target.value === 'optimal') {
        guessingAlgorithmsDiv.style.display = 'block';
        nonGuessingAlgorithmsDiv.style.display = 'none';
    } else {
        guessingAlgorithmsDiv.style.display = 'none';
        nonGuessingAlgorithmsDiv.style.display = 'block';
    }

    currentAlgorithm = event.target.value;
    updateDisplay();
});

document.getElementById('run-button').addEventListener('click', () => {
    if (currentAlgorithm === 'optimal') {
        const newEntry = document.getElementById('reference-string').value.split(',').map(Number);
        const frames = parseInt(document.getElementById('frame-count').value);
        const result = algorithms[currentAlgorithm](newEntry, frames);
        displayResult(result, frames);
    }
    else {
        
        const NuevoProceso = document.getElementById('NuevoProceso').value;
        console.log(`Nueva entrada: ${NuevoProceso}`);  // Log para depuración

        const frames = parseInt(document.getElementById('frame-count').value);
        const result = algorithms[currentAlgorithm](NuevoProceso, frames);
        displayResult(result, frames);
    }
});

function updateDisplay() {
    const resultArea = document.getElementById('result');
    resultArea.innerHTML = ''; // Clear previous results
}

function displayResult(result, frames) {
    const resultArea = document.getElementById('result');

    // Crear la tabla si no existe
    if (!document.querySelector('#result-table')) {
        resultArea.innerHTML = `
            <table id="result-table" border="1" style="width: 100%; text-align: center;">
                <thead id="result-header">
                    <tr>
                        <th>Paso 1</th>
                    </tr>
                </thead>
                <tbody id="result-body">
                    ${Array(frames).fill('<tr style="display: none;"></tr>').join('')}
                </tbody>
            </table>
            <div id="total-faults" style="margin-top: 10px; font-weight: bold;">
                Total Page Faults: <span id="fault-count">0</span>
            </div>
        `;

        // Inicializar las filas con celdas vacías según el número de frames
        const resultBody = document.getElementById('result-body');
        for (let i = 0; i < frames; i++) {
            const newRow = document.createElement('tr');
            newRow.style.display = 'none'; // Ocultar las filas inicialmente
            resultBody.appendChild(newRow);
        }
    }

    // Agregar un nuevo encabezado para el paso actual
    const resultHeader = document.getElementById('result-header').querySelector('tr');
    const stepNumber = resultHeader.children.length + 1; // Número del paso actual
    const newHeader = `<th>Paso ${stepNumber}</th>`;
    resultHeader.innerHTML += newHeader;

    // Agregar una nueva columna para el paso actual
    const resultBody = document.getElementById('result-body');
    const rows = resultBody.querySelectorAll('tr');
    result.pagesInMemory.forEach((page, index) => {
        const newCell = document.createElement('td');
        newCell.textContent = page;

        // Hacer visible la fila si se usa
        rows[index].style.display = '';
        rows[index].appendChild(newCell); // Agregar la celda al final de la fila
    });

    // Si hay más filas que páginas en memoria, agregar celdas vacías
    for (let i = result.pagesInMemory.length; i < rows.length; i++) {
        const emptyCell = document.createElement('td');
        emptyCell.textContent = '';
        rows[i].appendChild(emptyCell); // Agregar celdas vacías al final
    }

    // Actualizar el número total de fallos
    const faultCount = document.getElementById('fault-count');
    faultCount.textContent = result.pageFaults;
}