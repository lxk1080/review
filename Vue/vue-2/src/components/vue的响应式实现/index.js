
// 伪代码：触发更新视图
function updateView() {
  console.log('视图更新');
}

// defineProperty 是无法对数组进行监听的，数组的监听需要特殊处理
// 重新定义一个数组原型，重写原生方法，添加更新视图函数，让 Array 类型数据的隐式原型指向这个原型
const arrProto = Object.create(Array.prototype);
const methods = ['push', 'pop', 'shift', 'unshift']; // 原生的方法，当然不止这么多...
methods.forEach(methodsName => {
  arrProto[methodsName] = function() {
    Array.prototype[methodsName].apply(this, arguments); // 实现原生的功能
    updateView(); // 添加更新视图的函数
  };
})

// 监听数据的变化并通知 Dom 更新
function defineReactive(target, key, value) {
  observer(value); // 深度监听，value 可能是个对象

  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue !== value) {
        observer(newValue); // 深度监听，新值可能是个对象

        value = newValue;
        updateView(); // 在数据改变时触发更新
      }
    }
  })
}

// 监听器（入口）
function observer(data) {
  // 不是 object 类型，直接返回，也作为 defineReactive 函数里面递归的中断条件
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  if (data instanceof Array) {
    // 让数据的隐式原型指向新定义的数组原型对象，后面不能 return 掉，万一数组里面有对象，那么 defineReactive 函数仍然有用
    data.__proto__ = arrProto;
  }

  for (let key in data) {
    defineReactive(data, key, data[key]);
  }
}

// 以下是测试 -----------------------------------------------------------------------------------------------------------

const data = {
  name: 'jie',
  age: 25,
  info: {
    address: 'shanghai',
  },
  arr: [1, 2, 3],
};

observer(data);

data.name = 'yasuo';
data.age = { a: 1 };
data.age.a = 2;
data.info.address = 'tianji';
data.arr.push(4);

// 将会打印 5 次视图更新
