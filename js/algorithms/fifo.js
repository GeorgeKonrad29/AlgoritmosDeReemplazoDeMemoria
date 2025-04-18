function fifo(referenceString, numFrames) {
    let pageFaults = 0;
    let memory = [];
    let pageQueue = [];

    for (let page of referenceString) {
        if (!memory.includes(page)) {
            if (memory.length < numFrames) {
                memory.push(page);
            } else {
                const removedPage = pageQueue.shift();
                const index = memory.indexOf(removedPage);
                memory[index] = page;
            }
            pageQueue.push(page);
            pageFaults++;
        }
    }

    return {
        pagesInMemory: memory,
        pageFaults: pageFaults
    };
}

export default fifo;