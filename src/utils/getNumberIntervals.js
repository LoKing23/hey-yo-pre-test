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

    if (isOverlap) acc.push([nextMin, overlapMax]);

    return acc;
  }, []);

  return overlapRangeArray;
};

const getNotInclude = (array, min = 1, max = 20) => {
    // 找出未包含的區間
    const notInclude = [];
    let currentInterval = null;
    
    for (let i = min; i <= max; i++) {
      const isCovered = array.some(([start, end]) => i >= start && i <= end);
      
      if (!isCovered) {
        if (currentInterval === null) {
          currentInterval = [i, i];
        } else {
          if (i === currentInterval[1] + 1) {
            currentInterval[1] = i;
          } else {
            notInclude.push(currentInterval);
            currentInterval = [i, i];
          }
        }
      }
    }
  
    // 如果最後還有一個未包含的區間，加入結果中
    if (currentInterval !== null) {
      notInclude.push(currentInterval);
    }
  
    return notInclude;
  };
  

const getNumberIntervals = (array, min = 1, max = 20) => {
  const overlap = getOverlap(array);
  const notInclude = getNotInclude(array, min, max);
  const result = { overlap, notInclude };

  return result;
};

export default getNumberIntervals;
