/**
 * 对象深拷贝，只关注对象、数组，深入版本请参考文件：writeCode/手写深拷贝.ts
 */

let util = (function () {
  let tObj = {};
  ['Null', 'Undefined', 'Number', 'String', 'Boolean', 'Object', 'Function', 'Array', 'RegExp', 'Date'].forEach((item) => {
    tObj['[object ' + item + ']'] = item.toLowerCase()
  });
  return {
    getType: function (obj) {
      return tObj[Object.prototype.toString.call(obj)] || 'object'
    },
    isType: function (obj, type) {
      return this.getType(obj) === type
    }
  }
})();

// 远古版本
function copy(obj, deep) {
  if (obj === null || typeof obj !== 'object') return obj

  let target = util.isType(obj, 'array') ? [] : {}

  for (let key in obj) {
    let value = obj[key];
    if (deep && util.getType(value) === 'array' || util.getType(value) === 'object') {
      target[key] = copy(value)
    } else {
      target[key] = value
    }
  }

  return target
}

// ES2015 后改良
function copy(obj) {
  if (obj === null || typeof obj !== 'object') return obj

  const target = Array.isArray(obj) ? [] : {}

  for (let key in obj) {
    target[key] = copy(obj[key])
  }

  return target
}

/**
 * 测试代码
 */

let obj = {
  name: 'lxk',
  age: '123',
  child: {
    name: 'child',
    age: '456'
  },
  arr: [1, 2, 3],
  run: function () {
    return this.name
  }
};

let obj2 = copy(obj, true);

obj2.name = 'qwer';
obj2.child.name = 'children';
obj2.arr = [1, 2, 3, 4];
obj2.run = function () {
  return this.name + '-haha'
};

console.log(obj);
console.log(obj2);
console.log(obj.run());
console.log(obj2.run());
