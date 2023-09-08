// input: -7855948.9527
// output: -7,855,948.9527
const addComma = (num, maximumFractionDigits = 20) => num.toLocaleString('en-US', { maximumFractionDigits });

export default addComma