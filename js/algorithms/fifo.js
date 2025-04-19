// Estado persistente para la memoria y la cola
const fifoState = {
    memory: [],
    pageQueue: [],
    pageFaults: 0,
    paginaActual: 0
};

export function fifo(newEntry, numFrames) {
    let pageFault = false;
    

    // Verificar si la página ya está en memoria
    if (!fifoState.memory.includes(newEntry)) {
        pageFault = true; // Genera un fallo de página
        if(fifoState.memory.length < numFrames) {
            // Si hay espacio en memoria, se agrega la nueva página
            fifoState.pageFaults++;
            fifoState.memory.push(newEntry);
            fifoState.pageQueue.push(newEntry);
        }
        else {
            // Si no hay espacio, se elimina la página más antigua
            const pageToRemove = fifoState.pageQueue.shift();
            fifoState.memory.splice(fifoState.memory.indexOf(pageToRemove), 1);
            fifoState.memory.push(newEntry);
            fifoState.pageQueue.push(newEntry);
            fifoState.pageFaults++;

        }
        
    }
    

    // Retornar el estado actual de los frames y si hubo un fallo
    return {
        pagesInMemory: [...fifoState.memory, pageFault ? '*' : ''], // Agregar '*' si hubo fallo
        pageFaults: fifoState.pageFaults
    };
}

export function resetFifoState() {
    fifoState.memory = [];
    fifoState.pageQueue = [];
    fifoState.pageFaults = 0;
}

export default fifo;