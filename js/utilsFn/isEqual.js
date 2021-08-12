
/**
 * 判断是不是对象类型
 * @param obj
 * @returns {boolean}
 */
const isObject = function (obj) {
  return typeof obj === 'object' && obj !== null;
};

/**
 * 深比较：判断两个对象是否是相同的
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
const isEqual = (obj1, obj2) => {
  // 如果传入的参数不是对象类型，是值类型，直接用三等判断
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2;
  }

  // 如果传入两个相同的对象，直接返回 true
  if (obj1 === obj2) {
    return true;
  }

  // 判断 keys 的长度是否相等
  const keylength1 = Object.keys(obj1).length;
  const keylength2 = Object.keys(obj2).length;

  if (keylength1 !== keylength2) {
    return false;
  }

  // 以 obj1 为基准，用 obj2 依次递归比较
  for (let key in obj1) {
    const res = isEqual(obj1[key], obj2[key]);
    if (!res) {
      return false;
    }
  }

  return true;
};



// 以下是测试 -----------------------------------------------------------------------------------------------------------

const a = {
  a: 100,
  b: {
    x: 100,
    y: 200,
  }
}

const b = {
  a: 100,
  b: {
    x: 100,
    y: 200,
  }
}

console.log(a === b);
console.log(isEqual(a, b));
