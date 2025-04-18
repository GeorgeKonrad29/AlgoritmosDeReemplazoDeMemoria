function optimal(referenceString, frames) {
    let pageFaults = 0;
    let memory = [];
    
    for (let i = 0; i < referenceString.length; i++) {
        const page = referenceString[i];

        if (!memory.includes(page)) {
            if (memory.length < frames) {
                memory.push(page);
            } else {
                let farthestIndex = -1;
                let pageToReplace = -1;

                for (let j = 0; j < memory.length; j++) {
                    const currentPage = memory[j];
                    const nextIndex = referenceString.slice(i + 1).indexOf(currentPage);

                    if (nextIndex === -1) {
                        pageToReplace = j;
                        break;
                    } else if (nextIndex > farthestIndex) {
                        farthestIndex = nextIndex;
                        pageToReplace = j;
                    }
                }

                memory[pageToReplace] = page;
            }
            pageFaults++;
        }
    }

    return {
        memory: memory,
        pageFaults: pageFaults
    };
}

export default optimal;