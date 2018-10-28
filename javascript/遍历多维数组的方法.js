// JavaScript Document

Array.prototype.each = function (fn) {
  try {
    //遍历数组的每一项  //计数器 记录当前遍历的元素的位置
    // this 代表调用此方法的数组，数组是对象，这里添加一个 i 属性用来计数，如果没有 i 属性就初始化为 0
    //这样定义变量，是为了防止底层代码发生耦合冲突
    this.i || (this.i = 0);

    //严谨的判断什么时候走each核心方法
    //当数组的长度大于0，传递的参数必须为函数
    if (this.length > 0 && fn.constructor === Function) {
      //循环遍历数组每一项
      while (this.i < this.length) {
        //获取数组每一项的值
        const e = this[this.i];

        //如果获取的值还是一个数组
        if (e && e.constructor === Array) {
          //做递归操作
          e.each(fn);

        } else {
          //如果不是一个数组（是一个元素）
          //把当前的这个元素传递给 fn 函数，让函数执行
          //fn.call(e,e);
          //fn.apply(e,[e]);
          fn(e);  //这里的 e 是实参
        }

        this.i++;
      }

      this.i = null;  //完成后计数器没用了，释放内存，垃圾回收机制回收变量
    }

  } catch (e) {
    //do something
  }

  return this;	//返回原数组
}

// test
const array = [1, 2, [3, [4]], 5, [7, 8], [9, [10, [11, 12]]], [13], 14];

array.each(function(item) {
  console.log(item)
});
