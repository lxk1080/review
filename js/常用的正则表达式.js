
// 匹配中文字符（只能在google支持，其他的用插件，详见./resource/JavaScript正则表达式匹配汉字.js）
const regex = /\p{Unified_Ideograph}/u;
console.log(regex.test('中文')); // true
console.log(regex.test('123中文qwe')); // true
console.log(regex.test('123qwe')); // false


