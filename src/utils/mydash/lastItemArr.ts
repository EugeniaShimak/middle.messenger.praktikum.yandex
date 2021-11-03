function lastItemArr(arr: any[] = []) {
    return Array.isArray(arr) ? arr[arr.length - 1] : undefined
}

export default lastItemArr;