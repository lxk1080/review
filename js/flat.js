// 递归（一般做法，但是好用）
function flat(arr) {
    let result = []
    function each(arr) {
        arr.forEach((item) => {
            if (item instanceof Array) {
                each(item)
            } else {
                result.push(item)
            }
        })
    }
    each(arr)
    return result
}

// 隐式类型转换（如果一个数组内有很多种类型的数据，处理麻烦）
// 也可以调用 valueOf 的方法实现，同理
function flatByConvert(arr) {
    let toString = Array.prototype.toString
    Array.prototype.toString = function() {
        return this.join(',')
    }
    let res = arr + '' // 这里的加号会让 arr 隐式转换，先进行 valueOf 方法，在进行 toString 方法
    Array.prototype.toString = toString
    return res.split(',').map((item) => {
        if (parseInt(item)) return parseInt(item)
        return item
    })
}

// ES6（Iterator，目前测试此方法不可用，只是最后的join方法起作用）
Array.prototype[Symbol.iterator] = function () {
  let arr = [].concat(this);
  let getFirst = function (array) {
    let first = array[0];
    if (first instanceof Array) {
      return getFirst(array[0]);
    } else if (first !== undefined) {
      return array.shift();
    } else {
      return '';
    }
  };
  return {
    next: function () {
      let item = getFirst(arr);
      if (item) {
        return {
          value: item,
          done: false,
        };
      } else {
        return {
          done: true,
        };
      }
    },
  };
};
var flatByES6 = function (arr) {
    let r = []
    for (let i of arr) { r.push(i) }
    return r
}

let arr = ['1', 2, [3, ['a', 'b', 'c'], 4], 5, 6, [7, 8, [9, 10, [11, 12]]]]

console.log(flat(arr))
console.log(flatByConvert(arr))
console.log(flatByES6(arr))