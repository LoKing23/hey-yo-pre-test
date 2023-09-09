// input: -7855948.9527
// output: -7,855,948.9527
const addComma = (num, maximumFractionDigits = 20) => {
    const isInvalid = isNaN(num);

    if(isInvalid) return num;

    const [integer, decimal] = String(num).split('.');
    const integerWithComma = (+integer).toLocaleString('en-US', { maximumFractionDigits });
    const result = decimal !== undefined ? `${integerWithComma}.${decimal}` : integerWithComma;

    return result;
}

export default addComma