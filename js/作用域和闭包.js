
// 闭包的形成：自由变量的查找，是在函数定义的地方，向上级作用域查找，不是在执行的地方查找！箭头函数也是一样。
// 自由变量：当前作用域使用了，但是在当前作用域没有定义的变量。

// 1. 函数作为返回值
function create() {
  const a = 100;
  return function () {
    console.log(a);
  }
}

const fn1 = create();
const a = 200;
fn1();

// 2. 函数作为参数被传递
function print(fn) {
  const b = 200;
  fn();
}

const b = 100;
const fn2 = () => {
  console.log(b);
}
print(fn2);

// 3. 闭包的应用（数据缓存，闭包隐藏数据，不被外界访问，只提供 API，这里的 data，外界是不能直接访问的）
function createCache() {
  const data = {};
  return {
    set: function (key, value) {
      data[key] = value;
    },
    get: function (key) {
      return data[key];
    }
  };
}

const c = createCache();
c.set('a', 1);
console.log(c.get('a'));

// 关于作用域，这里补充一下 -------------------------------------------------------------------------------

// 1. ES6 中的 let 可形成块级作用域
for (let i = 0; i < 5; i++) {
 setTimeout(() => {
   console.log(i);
 }, 200);
}

// 2. 以前的解决办法
for (var i = 0; i < 5; i++) {
  (function(i){
    setTimeout(() => {
      console.log(i);
    }, 200);
  })(i);
}


