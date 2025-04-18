function fifoPlus(referenceString, frameCount) {
    const frames = [];
    const pageFaults = [];
    const pageCount = {};

    for (let page of referenceString) {
        if (!frames.includes(page)) {
            if (frames.length < frameCount) {
                frames.push(page);
            } else {
                let replaceIndex = -1;
                let maxCount = -1;

                for (let i = 0; i < frames.length; i++) {
                    const currentPage = frames[i];
                    const count = pageCount[currentPage] || 0;

                    if (count > maxCount) {
                        maxCount = count;
                        replaceIndex = i;
                    }
                }

                frames[replaceIndex] = page;
            }
            pageFaults.push(page);
        }
        pageCount[page] = (pageCount[page] || 0) + 1;
    }

    return frames;
}

export default fifoPlus;