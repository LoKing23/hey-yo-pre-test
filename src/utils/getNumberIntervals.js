// input: [[6, 11], [5, 8], [17, 20], [7, 7], [14, 17]]
// output: {overlap: [[6, 8], [17, 17]], notInclude: [[0, 4], [12, 13]]}

const getOverlap = (array) => {
    const ascendingArray = structuredClone(array).sort((a, b) => a[0] - b[0]);
    // 下個元素的 min < 當前的 max，表示 overlap
    const overlapRangeArray = ascendingArray.reduce((acc, cur, index) => {
        const [_, curMax] = cur;
        const [nextMin, nextMax] = ascendingArray[index + 1] || [Infinity];
        const isOverlap = nextMin <= curMax;
        const overlapMax = nextMax < curMax ? nextMax : curMax;

        if(isOverlap) acc.push([nextMin, overlapMax]);

        return acc;
    }, []);

    return overlapRangeArray
}   

const getNotInclude = (array, min = 1, max = 20) => {
    const result = [];
    const ascendingArray = structuredClone(array).sort((a, b) => a[0] - b[0]);
    let prevMax = min;
    
    for(let i = 0;i<ascendingArray.length;i++) {
        const isFinished = prevMax >= max;
        const [nextMin] = ascendingArray[i + 1] || [Infinity];

        // 跑完 min~max 範圍，後面就不用再跑了
        if(isFinished) return result

        // 與下個元素之間有空的 range
        if(nextMin > prevMax) {
            const rangeMin = prevMax + 1;
            const rangeMax = nextMin < max ? nextMin - 1 : max;
            const notIncludeRange = [rangeMin, rangeMax];

            result.push(notIncludeRange);
        }

        prevMax = nextMin
    }

    return result
}

const getNumberIntervals = (array, min = 0, max = 20) => {
    const overlap = getOverlap(array);
    const notInclude = getNotInclude(array, min, max);
    const result = { overlap, notInclude };

    return result
}

export default getNumberIntervals

