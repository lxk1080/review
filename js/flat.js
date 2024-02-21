
/**
 * 递归 1（一般做法），这个递归看似没有中断条件，其实有个隐藏的条件，子数组的长度
 * @param arr
 * @returns {Array}
 */
function flat(arr) {
  let result = [];
  function each(arr) {
    arr.forEach((item) => {
      if (item instanceof Array) {
        each(item);
      } else {
        result.push(item);
      }
    })
  }
  each(arr);
  return result;
}

/**
 * 递归 2（推荐使用这种方法），虽然也是递归，但是与递归 1 的思路不同，感觉 2 的思路从代码上来看更好理解，更符合递归的原则
 * 递归 1，深度优先，从左往右逐个找，找到一个数组，把这个数组全部拍平后，再检查下一个数据，数据一个一个的处理，需要遍历每一个数据
 * 递归 2，广度优先，先把第一层的全部数组拍平，再检查第二层，再拍平，一层一层的处理，主要是利用 concat 可以连接数组的特性，不需要遍历
 * @param arr
 */
function flaten (arr) {
  const hasArray = arr.some(v => v instanceof Array);
  if (!hasArray) {
    return arr;
  }
  const res = Array.prototype.concat.apply([], arr);
  return flaten(res);
}

/**
 * 这方法超方便，主要是先 join 再 split，后面的 map 是为了区分 number 和 string 类型的数据
 * 不过这方法有个缺点，对于 string 类型的数字，flat 后会变成 number 类型，例如下面的数据 '1'
 * 不过也没办法，如果不做 parseInt 转换的话，所有数据都是字符串了
 * 从另一个角度来说，加了 parseInt 的转换，其实是在修正数据，字符串的数字，最终肯定还是要转换成 number 类型使用的
 * @param arr
 * @returns {(number | string)[]}
 */
function flatByConvert(arr) {
  return arr.join(',').split(',').map(v => parseInt(v) || v);
}



// 以下是测试 -----------------------------------------------------------------------------------------------------------

let arr = ['1', 2, [3, ['a', 'b', 'c'], 4], 5, 6, [7, 8, [9, 10, [11, 12]]]];

console.log(flat(arr));
console.log(flaten(arr));
console.log(flatByConvert(arr));
