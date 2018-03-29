// 修饰器 可以修改类的行为的一个函数
{
  // 参数：类 属性 属性描述符
  let readonly = function (target, name, descriptor) {
    descriptor.writable = false;
    return descriptor
  };

  class Test {
    @readonly
    time() {
      return '123'
    }
  }

  let test = new Test();
  // Cannot assign to read only property 'time' of object
  // test.time = 'another'
  console.log(test.time())
}

{
  // 类修饰符
  let typename = function (target, name, descriptor) {
    target.myname = 'hello'
  };

  @typename
  class Test {

  }

  console.log(Test.myname)
  // 第三方修饰器js库：core-decorators; cnpm install core-decorators --save-dev
}

{
  // 埋点（例如打印日志）
  let log = function (type) {
    return function (target, name, descriptor) {
      let method = descriptor.value;
      descriptor.value = (...arg) => {
        method.apply(target, arg);
        // 给原来的方法添加一个打印日志的功能
        console.log(`log ${type}`)
      }
    }
  };

  class AD {
    @log('show')
    show() {
      console.log('ad is show')
    }
    @log('click')
    click() {
      console.log('ad is click')
    }
  }

  let ad = new AD();
  ad.show();
  ad.click()
}
