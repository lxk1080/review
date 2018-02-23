{
  // ES5
  let regex = new RegExp('xyz', 'i');
  let regex2= new RegExp(/xyz/i);
  console.log(regex.test('xyz123'), regex2.test('xyz123'));

  // ES6
  let regex3 = new RegExp(/xyz/gi, 'i');
  console.log(regex3.flags) // 打印正则的修饰符，可见后面的 i 修饰符覆盖了 gi
}

{
  // y修饰符也是全局匹配，但是必须要从第一个字符开始匹配，多次匹配时也是从接下来的第一个字符开始匹配
  let s = 'bbb_bb_b'
  let a1 = /b+/g
  let a2 = /b+/y

  console.log('one', a1.exec(s), a2.exec(s))
  console.log('two', a1.exec(s), a2.exec(s))

  // 用来判断正则是否开启 y 模式
  console.log(a1.sticky, a2.sticky)
}

{
  // es6 \u{num} 代表一个unicode字符
  console.log('\u{61}')

  // u 修饰符, unicode编码
  console.log(/\u{61}/.test('a'))
  console.log(/\u{61}/u.test('a'))

  // console.log('\u{20BB7}') // 𠮷
  let s = '𠮷'

  // 大于两个字节的字符用 '.' 不能匹配，这里可以加上 'u' 修饰符
  console.log(/^.$/.test(s));
  console.log(/^.$/u.test(s));

  // 总之对于匹配的字符串，如果出现大于两个字节长度的字符，都要加 'u' 修饰符
  console.log(/𠮷{2}/.test('𠮷𠮷'))
  console.log(/𠮷{2}/u.test('𠮷𠮷'))

  // 对于 '.' 还有四个字符不能匹配，换行符、回车符、行分隔符、段分隔符
  // es6 中要加 s 修饰符才能识别，不过现在还在提案中，尚未实现
}