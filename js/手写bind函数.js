
// bind 是函数可调用的方法，所以在函数的原型里定义
// 以下为手写 bind，没有用到 ES6 语法，既然要手写，那肯定不支持 ES6，都支持 ES6 了，还用手写吗

// ES6 的话
// 下面的参数，可用 (t, ...args)
// const self = this，这句可省略，直接将函数改为箭头函数
// args.concat，可改为 [...args, ...params]，参数也改为 ...params

Function.prototype.myBind = function (t) {
  const args = Array.prototype.slice.call(arguments, 1);

  const self = this;

  return function (params) {
    return self.apply(t, args.concat(params));
  }
}

// 以下是测试

const fn = function (n) {
  console.log(this.x, n);
}

const obj = { x: 5 };

const f = fn.myBind(obj);

f(9);


