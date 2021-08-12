
function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  let result;
  if (obj instanceof Array) {
    result = [];
  } else {
    result = {};
  }

  for (let key in obj) {
    // 保证 key 不是原型的属性
    if (obj.hasOwnProperty(key)) {
      const type = Object.prototype.toString.call(obj[key]);
      const isArrayOrObject = type.includes('Array') || type.includes('Object');

      if (isArrayOrObject) {
        result[key] = deepClone(obj[key]);
      } else {
        result[key] = obj[key];
      }
    }
  }

  return result;
}

// 以下是测试

const a = {
  a: 1,
  b: [1,2,3],
  c: { a: 1, b: 2 },
  d: function () {

  },
  e: new Map([['a', 1], ['b', 2]]),
  f: new Date(),
}

const b = deepClone(a);

console.log('a', a);
console.log('b', b);
console.log('a === b ?', a === b);
