// 1. 统计一个字符串出现频率最高的字母/数字及次数
function maxCountChar(str) {
    let strArr = [...str]
    let obj = {}
    let maxItem, maxCount = 0
    strArr.map((item) => {
        obj[item] = obj[item] == undefined ? 1 : ++obj[item]
        if (obj[item] > maxCount) {
            maxItem = item
            maxCount = obj[item]
        }
    })
    return [maxItem, maxCount]
}


// 2. 数组去重
function unip_1(arr) {
    let obj = {}
    arr.map((item) => {
        obj[item] = true
    })
    return Object.keys(obj)
}

function unip_2(arr) {
    return [...new Set(arr)]
}

function unip_3(arr) {
    return arr.filter((item, index, array) => {
        return array.indexOf(item) == index  // 利用indexOf总是顺序查找的特性
    })
}

// 3. 反转字符串
function reverseString(str) {
    return Array.from(str).reverse().join('')
}

// 4. 数组中最大的差值
function diff_1(arr) {
    let min = arr[0], max = arr[0]
    arr.map((item) => {
        if (item < min) min = item
        if (item > max) max = item
    })
    return max - min
}

function diff_2(arr) {
    let max = Math.max(...arr)
    let min = Math.min(...arr)
    return max - min
}

// 5. 不借助临时变量，进行两个整数的交换
function toggle_1(a, b) {
    [a, b] = [b, a]
    console.log(a, b)
}

function toggle_2(a, b) {
    a = a + b
    b = a - b
    a = a - b
    console.log(a, b)
}

function toggle_3(a, b) {
    a = a ^ b
    b = a ^ b
    a = a ^ b
    console.log(a, b)
}

function toggle_4(a, b) {
    a = (a + b) - (b = a)
    console.log(a, b)
}




