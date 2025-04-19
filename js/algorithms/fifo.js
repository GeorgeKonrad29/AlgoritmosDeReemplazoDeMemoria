// Estado persistente para la memoria y la cola
const fifoState = {
    memory: [],
    pageQueue: [],
    pageFaults: 0,
    currentIndex: 0 // Índice para rastrear cuál página reemplazar
};

export function fifo(newEntry, numFrames) {
    let pageFault = false;

    // Verificar si la página ya está en memoria
    if (!fifoState.memory.includes(newEntry)) {
        pageFault = true; // Genera un fallo de página

        if (fifoState.memory.length < numFrames) {
            // Si hay espacio en memoria, agregar la nueva página
            fifoState.memory.push(newEntry);
        } else {
            // Reemplazar la página en la posición actual (FIFO)
            fifoState.memory[fifoState.currentIndex] = newEntry;
        }

        // Actualizar el índice para el próximo reemplazo
        fifoState.currentIndex = (fifoState.currentIndex + 1) % numFrames;

        // Incrementar el contador de fallos de página
        fifoState.pageFaults++;
    }

    // Retornar el estado actual de los frames y si hubo un fallo
    return {
        pagesInMemory: [...fifoState.memory, pageFault ? '*' : ''], // Agregar '*' si hubo fallo
        pageFaults: fifoState.pageFaults,
        procesoSaliendo: fifoState.pageQueue.shift() // Retirar la página que sale
    };
}

export function resetFifoState() {
    fifoState.memory = [];
    fifoState.pageQueue = [];
    fifoState.pageFaults = 0;
    fifoState.currentIndex = 0; // Reiniciar el índice
}

export default fifo;