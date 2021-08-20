
// React 的 PureComponent 组件的浅比较

const hasOwn = Object.prototype.hasOwnProperty

// 基本类型比较，兼容了 -0 +0 好 NaN 的情况
// -0 === +0 // true，期待返回 false
// NaN === NaN // false，期待返回 true
function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } else {
    return x !== x && y !== y
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true

  if (typeof objA !== 'object' || objA === null ||
    typeof objB !== 'object' || objB === null) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])) {
      return false
    }
  }

  return true
}



// 以下是测试代码 --------------------------------------------------------------------------------------------------------

const obj1 = { a: 1, b: 2 };
const obj2 = { a: 1, b: 2 };

const obj3 = {
  a: 1,
  b: 2,
  c: { d: 1 },
}

const obj4 = {
  a: 1,
  b: 2,
  c: { d: 1 },
}

console.log(shallowEqual(obj1, obj2)); // true
console.log(shallowEqual(obj3, obj4)); // false，第二层的比不了
