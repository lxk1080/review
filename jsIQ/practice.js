// 获取随机数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 洗牌
function shuffle(arr) {
  let newArr = arr.slice()
  for (let i = 0; i < newArr.length; i++) {
    let num = getRandomInt(0, i)
    let tmp = newArr[i]
    newArr[i] = newArr[num]
    newArr[num] = tmp
  }
  return newArr
}

// 防抖函数（调用后 在计时完成后执行函数，若在延迟时间内再次调用，则重新计时）
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 防抖函数升级（可以避免连续快速调用时一直不执行的问题）
function debouncePro(fn, delay, time) {
  let timer, previous;
  return function(...args) {
    let now = new Date()
    if (!previous) previous = now
    if (timer) {
      clearTimeout(timer)
    }
    if (now - previous > time) {
      fn.apply(this, args)
      previous = now
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
}

// 节流函数（第一次调用立即执行，以后每隔一个时间段才能再次调用）
function throttle(fn, time) {
  let timer, firstTime = true;
  return function (...args) {
    if (firstTime) {
      fn.apply(this, args)
      firstTime = false
      return
    }
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, args)
      clearTimeout(timer)
      timer = null
    }, time)
  }
}

// 选择排序（每个与其他的比，小的放到前面，最后一个不比较）
function chooseSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[i]) {
        let tmp = arr[j]
        arr[j] = arr[i]
        arr[i] = tmp
      }
    }
  }
  return arr
}

// 冒泡排序（两个两个的比，大的放到后面， 总共循环 len - 1 次，每次循环比较若干次）
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i -1; j++) {
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = tmp
      }
    }
  }
  return arr
}

// 快速排序（递归）
// 先从数列中取出一个数作为"基准"
// 分区过程：将比这个"基准"小的数全放到"基准"的左边，大于或等于"基准"的数全放到"基准"的右边
// 再对左右区间重复第二步，直到各区间只有一个数
function quickSort(arr) {
  let len = arr.length
  if (len <= 1) return arr
  let pointIndex = Math.floor(len / 2)
  let point = arr.splice(pointIndex, 1)[0]
  let left = []
  let right = []
  for (var i = 0; i < len - 1; i++) {
    if (arr[i] < point) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat([point], quickSort(right))
}

let arr = [14, 11, 3, 13, 10, 15, 2, 5, 4, 6, 8, 7, 12, 1, 9];
let res = chooseSort(arr)
console.log(res)