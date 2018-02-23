{
  console.log('\u0061') // a
  // es5打印超过两个字节的字符时(大于0xFFFF)
  console.log('\u20bb7') // 乱码

  // es6打印超过两个字节的字符时
  console.log('\u{20bb7}') // 𠮷
}

// 取码值
{
  let s = '𠮷'
  console.log('length', s.length) // 2
  console.log('0', s.charAt(0)) // 乱码
  console.log('1', s.charAt(1)) // 乱码
  console.log('at0', s.charCodeAt(0)) // 55362
  console.log('at1', s.charCodeAt(1)) // 57271

  let s1 = '𠮷a'
  console.log('length', s1.length) // 3
  // codePointAt(0) 取第一个字符的所有字节，不管是2字节还是4字节
  console.log('code0', s1.codePointAt(0)) // 134071
  console.log('code0', s1.codePointAt(0).toString(16)) // 20bb7
  // 取后两个字节（也就是第三个和第四个）
  console.log('code1', s1.codePointAt(1)) // 57271
  // 再取后面的两个字节（第五个和第六个，后面依次类推）
  console.log('code2', s1.codePointAt(2)) // 97
}

// 取码值对应的字符
{
  // es5
  console.log(String.fromCharCode('0x20bb7'))
  // es6（可以处理大于0xFFFF的字符）
  console.log(String.fromCodePoint('0x20bb7'))
}

// es6中使用 let of 可以打印出大于0xFFFF的字符
{
  let str = '\u{20bb7}abc'
  for (let i = 0; i < str.length; i++) {
    console.log('es5', str[i])
  }
  for (let code of str) {
    console.log('es6', code)
  }
}