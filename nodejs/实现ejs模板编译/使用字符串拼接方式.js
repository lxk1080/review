/**
 * @desc 模拟实现 ejs 的模板编译功能
 *  思路：
 *    总的来说：因为模板代码中既有纯 html 代码，也有 js 代码，而最终我们需要转化成纯 html 代码，所以我们需要把 js 代码执行掉，转化成 html 代码
 *    对于表达式语法，因为就一行，我们可以直接做替换，
 *    但是对于像 if else 语法，一般会多行出现，我们需要把这些语句整合起来执行才可以，那就不能用单纯的替换，
 *    所以，我们干脆就把模板代码整个都转换成 js 代码，然后再将 js 代码执行，转化成编译后的 html 代码
 *      - 主要就是转化成 js 代码的部分麻烦一些，需要处理各种语法和字符串拼接
 *      - 执行 js 代码直接使用 new Function 即可
 *    此方式实现简单易用，但是功能有限
 */

function compileTemplate(template, data) {
  // 1. 处理转义问题
  // 2. 正则表达式的匹配
  // 3. 开始匹配，拼接头，拼接中间部分
  // 4. 拼接尾部部分
  // 5. 执行 js 代码并返回最终的 html 代码

  // 转义字符串中的特殊字符
  // 这边如果不进行替换操作，那么，在将模板转化成 js 的时候，换行符就已经用掉了，可能会导致语法错误
  // 而进行了替换操作，换行符是在 html 代码渲染的时候用掉的，可以确保换行符是作为字符串的一部分被正确解析
  // 这个主要是处理那些不涉及 js 执行的纯 html 代码字符串
  const escapeString = str => str.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, "\\").replace(/\n/g, "\\n")

  // code 是要执行的 js 代码，result 是最终的 html 代码
  let code = `let result = '';\nwith(data){\n`

  // 定义正则表达式匹配模板语法
  // 空白字符 + 非空白字符 = 所有字符
  // 为什么不用 "." ？因为点只有在模式修饰符 s 下才会匹配换行符，其他模式下不匹配换行符
  // 后面加一个问号，代表非贪婪匹配，防止匹配到像 `<%= name %><%= age %>` 这样的情况
  const regex = /<%([\s\S]+?)%>/g
  let pointIndex = 0
  let matchContent

  // 遍历匹配模板中的表达式
  // 对于 exec 方法
  // 如果正则表达式没有全局 (g)，exec 方法只会在字符串中查找第一个匹配项
  // 反之，exec 方法会在每次调用时继续查找下一个匹配项，直到没有匹配为止，为 null，代表已经全部搜索完成
  // 如果你继续调用 exec 方法，它将会重新从字符串的开头再次搜索一遍，也就是说，如果你不停止调用，它将会循环搜索
  while ((matchContent = regex.exec(template)) !== null) {
    // 插入前面的静态字符串部分
    code += `result += '${escapeString(template.slice(pointIndex, matchContent.index))}';\n`

    // 根据模板语法生成对应的 JavaScript 代码
    // fullMatch 是匹配到的内容
    // codeSegment 是正则表达式括号内的内容
    const [fullMatch, codeSegment] = matchContent
    if (codeSegment.trim().startsWith('=')) {
      code += `result += ${codeSegment.slice(1).trim()};\n`
    } else {
      // 这个地方是 js 执行，最终不体现在 html 代码中，所以不要使用 result += 拼接
      code += `${codeSegment}\n`
    }

    // 这地方要注意，不需要加上之前的 pointIndex
    pointIndex = matchContent.index + fullMatch.length
  }

  // 插入最后的静态字符串部分
  code += `result += '${escapeString(template.slice(pointIndex))}';\n`
  code += `};\n`
  code += `return result`

  // 使用 new Function 生成函数，并执行代码
  return new Function('data', code)(data)
}

/**
 * 测试代码
 */

const template = `
  <div>hahahayiyi</div>
  <h1><%= title %></h1>
  <% if (user) { %>
    <p>Hello, <%= user.name %>!</p>
  <% } else { %>
    <p>Hello, guest!</p>
  <% } %>
  <ul>
    <% for (let item of items) { %>
      <li><%= item %></li>
    <% } %>
  </ul>
`

const data = {
  title: 'My Page',
  user: { name: 'John' },
  items: ['item1', 'item2', 'item3']
}

console.log(compileTemplate(template, data))
