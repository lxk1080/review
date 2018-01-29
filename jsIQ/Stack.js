// 模拟栈数据结构（先进后出）
function Stack() {
  this.items = []
}
Stack.prototype = {
  constructor: Stack,
  //添加
  push: function (item) {
    return this.items.push(item)
  },
  // 删除
  pop: function () {
    return this.items.pop()
  },
  // 获取栈顶元素
  peek: function () {
    return this.items[this.items.length - 1]
  },
  // 判断栈是否为空
  isEmpty: function () {
    return this.items.length == 0
  },
  // 栈的长度
  size: function () {
    return this.items.length
  },
  // 清空栈
  clear: function () {
    return this.items.splice(0)
  },
  // 打印栈
  print: function () {
    console.log(this.items)
  }
};

// 通过栈实现对正整数的二进制转换
function divideBy2(num) {
  if (num == 0) return 0;
  var stack = new Stack();
  var rem = 0;
  var res = '';
  while(num > 0) {
    rem = num % 2;
    stack.push(rem);
    num = Math.floor(num / 2);
  }
  while(!stack.isEmpty()) {
    res += stack.pop().toString()
  }
  return res
}

console.log(divideBy2(10));