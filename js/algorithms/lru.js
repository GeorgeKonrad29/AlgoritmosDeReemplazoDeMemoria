export function lru(referenceString, numFrames) {
    let pageFaults = 0;
    let memory = [];
    let pageIndex = {};

    for (let i = 0; i < referenceString.length; i++) {
        const page = referenceString[i];

        if (!memory.includes(page)) {
            if (memory.length < numFrames) {
                memory.push(page);
            } else {
                const lruPage = memory.reduce((lru, current) => {
                    return pageIndex[current] < pageIndex[lru] ? current : lru;
                });
                memory[memory.indexOf(lruPage)] = page;
            }
            pageFaults++;
        }
        pageIndex[page] = i;
    }

    return {
        pagesInMemory: memory,
        pageFaults: pageFaults
    };
}

export default lru;