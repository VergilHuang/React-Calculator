
// const add = (x1: number, x2: number) => {
//     const result = strip(roundPointInt(x1 + x2))
//     if (result.toString().length > 10) {
//         return result.toExponential()
//     }
//     return strip(result)
// }
// const minus = (x1: number, x2: number) => {
//     const result = strip(roundPointInt(x1 - x2))
//     if (result.toString().length > 10) {
//         return result.toExponential()
//     }
//     return strip(result)
// }
// const divide = (x1: number, x2: number) => {
//     const result = strip(roundPointInt(x1 / x2))
//     if (result.toString().length > 10) {
//         return result.toExponential()
//     }
//     return strip(result)
// }
// const multiply = (x1: number, x2: number) => {
//     const result = strip(roundPointInt(x1 * x2))
//     if (result.toString().length > 10) {
//         return result.toExponential()
//     }
//     return strip(result)
// }

// const percent = (x1: number) => {
//     const result = strip(roundPointInt(x1 / 100))
//     if (result.toString().length > 10) {
//         return result.toExponential()
//     }
//     return strip(result)
// }

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

const fixNumber = (num: number) => {
    let _num: string | number = $$.strip($$.roundPointInt(num))
    if (_num >= 10e8) {
        _num = (_num as number).toExponential()
    }
    return _num.toString()
}

const fixEvalString = (metrix: string[]) => {
    let joinStr = metrix.join("")
    joinStr = joinStr.replace(/^[*/]/i, "");
    return joinStr
}

const createDragableElement = (ele: HTMLDivElement) => {
    const startPoint = { x: 0, y: 0 }
    const endPoint = { x: 0, y: 0 }
    ele.onmousedown = dragStart

    function dragStart(e: MouseEvent) {
        e = e || window.event;
        e.preventDefault();
        startPoint.x = e.clientX;
        startPoint.y = e.clientY;
        document.onmouseup = disableDrap;
        document.onmousemove = dragElement;
    }

    function dragElement(e: MouseEvent) {
        preventDefault(e)

        endPoint.x = startPoint.x - e.clientX
        endPoint.y = startPoint.y - e.clientY
        startPoint.x = e.clientX
        startPoint.y = e.clientY

        ele.style.top = `${ele.offsetTop - endPoint.y}px`
        ele.style.left = `${ele.offsetLeft - endPoint.x}px`
    }

    function disableDrap() {
        document.onmouseup = null
        document.onmousemove = null
    }
}

const preventDefault = (e: any) => {
    e = e || window.event;
    e.preventDefault()
}

const $$ = {
    // add,
    // minus,
    // divide,
    // multiply,
    // percent,
    preventDefault,
    reverseSign,
    filterZeroHead,
    strip,
    roundPointInt,
    fixNumber,
    fixEvalString,
    createDragableElement
}

export default $$