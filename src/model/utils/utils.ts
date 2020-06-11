
const add = (x1: number, x2: number) => {
    const result = strip(roundPointInt(x1 + x2))
    if (result.toString().length > 10) {
        return result.toExponential()
    }
    return strip(result)
}
const minus = (x1: number, x2: number) => {
    const result = strip(roundPointInt(x1 - x2))
    if (result.toString().length > 10) {
        return result.toExponential()
    }
    return strip(result)
}
const divide = (x1: number, x2: number) => {
    const result = strip(roundPointInt(x1 / x2))
    if (result.toString().length > 10) {
        return result.toExponential()
    }
    return strip(result)
}
const multiply = (x1: number, x2: number) => {
    const result = strip(roundPointInt(x1 * x2))
    if (result.toString().length > 10) {
        return result.toExponential()
    }
    return strip(result)
}

const percent = (x1: number) => {
    const result = strip(roundPointInt(x1 / 100))
    if (result.toString().length > 10) {
        return result.toExponential()
    }
    return strip(result)
}

const reverseSign = (numStr: string) => {
    if (numStr.indexOf("-") >= 0) {
        return numStr.replace(/^-/g, "");
    } else {
        return "-" + numStr;
    }
}


const filterZeroHead = (numStr: string) => {
    return numStr.replace(/^0+/g, "");
}

const strip = (num: number, precision: number = 12) => {
    return +parseFloat(num.toPrecision(precision));
}

const roundPointInt = (num: number) => {
    var size = Math.pow(10, 6);
    return Math.round(num * size) / size;
}



const $$ = {
    add,
    minus,
    divide,
    multiply,
    percent,
    reverseSign,
    filterZeroHead,
    strip,
    roundPointInt
}

export default $$