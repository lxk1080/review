{
  let str = 'string'
  console.log('include', str.includes('t'))
  console.log('start', str.startsWith('s'))
  console.log('end', str.endsWith('g'))
}

{
  let str = 'qw'
  console.log(str.repeat(2))
}

{
  let name = 'lxk'
  console.log(`hello ${name}`)
}

{
  // 要求返回两位，如果不够前面补0
  console.log('1'.padStart(2, '0')) // 01
  // 要求返回两位，如果不够后面补0
  console.log('1'.padEnd(2, '0')) // 10
}

// 标签模板（防止xss攻击，处理多语言转换）
{
  let user = {
    name: 'list',
    info: 'hello world'
  }
  function abc(s, v1, v2) {
    console.log(s, v1, v2)
    return s + v1 + v2
  }
  console.log(abc`i am ${user.name},${user.info}`)
}

{
  console.log(`Hi\n${1+2}`)
  // 对 '\' 转义，从而原样输出了 \n 换行符
  console.log(String.raw`Hi\n${1+2}`)
}