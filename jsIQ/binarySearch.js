// 二分查找法，主要是对已经排好序的数组进行元素的查找
// 1. 递归
function binarySearch1(array, item, start, end) {
    if (start === undefined) start = 0
    if (end === undefined) end = array.length - 1
    if (start > end) {
        return -1
    }
    let m = Math.floor((start + end) / 2)
    if (item === array[m]) {
        return m
    }
    if (item < array[m]) {
        return binarySearch1(array, item, start, m-1)
    } else {
        return binarySearch1(array, item, m+1, end)
    }
}

// 2. 非递归
function binarySearch2(array, item) {
    let end = array.length - 1
    let start = 0
    while (start <= end) {
        let m = Math.floor((start + end) / 2)
        if (item === array[m]) {
            return m
        }
        if (item < array[m]) {
            end = end - 1
        }
        if (item > array[m]) {
            start = start + 1
        }
    }
    return -1
}

let arr = [1, 2, 5, 8, 10, 15, 22, 25]
console.log(binarySearch1(arr, 15))
console.log(binarySearch2(arr, 15))
console.log(binarySearch1(arr, 9))
console.log(binarySearch2(arr, -9))
