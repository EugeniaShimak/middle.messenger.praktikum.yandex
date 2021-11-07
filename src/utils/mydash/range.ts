function range(start: number, end?: number, step?: number, isRight = false) {

    let index = -1;
    if (typeof end !== 'number') {
        end = start;
        start = 0;

    }
    step = step === undefined ? (start < end ? 1 : -1) : step;

    let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
    const result = Array(length);

    while (length--) {
        result[(isRight ? ++index : length)] = start;
        start += step;
    }
    return result;
}

export default range;