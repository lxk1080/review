
/**
 * 去除字符串两侧的空格，\s 代表空白字符
 * 保证浏览器的兼容性，有的手机端的浏览器没有这个方法，写之前先判断一下，if (!String.prototype.trim) { // 定义函数 }
 * @returns {string}
 */
String.prototype.trim = function () {
  return this.replace(/^\s+/, '').replace(/\s+$/, '');
};



// 测试 ----------------------------------------------------------------------------------------------------------------

const a = '     dsdsdd dfdf qwe  ';

console.log(a);
console.log(a.trim());
