function lastItemArr(arr = []) {
    return Array.isArray(arr) ? arr[arr.length - 1] : undefined
}

export default lastItemArr;