
// this 的取值，是在函数执行的时候确定的，不是函数定义的时候
// 箭头函数，可以使 this 的取值指向定义时的上级作用域

// call 改变函数的作用域，立即执行
// bind 改变函数的作用域，只绑定，不执行，返回一个新的函数
// 这个测试要到浏览器里面，webstorm 里面使用的是 node 的执行引擎

// 测试 1
function fn1() {
 console.log(this);
}

fn1();

// 测试 2
fn1.call({ a: 1 });

// 测试 3
const fn2 = fn1.bind({ a: 1 });
fn2();

// 测试 4
class People {
  constructor(name) {
    this.name = name;
  }

  eat1() {
    setTimeout(function () {
      console.log(`${this.name} eating`);
    }, 500);
  }

  eat2() {
    setTimeout(() => {
      console.log(`${this.name} eating`);
    }, 500);
  }
}

const p = new People('yasuo');
p.eat1();
p.eat2();


