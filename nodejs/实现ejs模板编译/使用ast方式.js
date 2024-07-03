/**
 * @desc 使用类似 ast 的方式，先获取所有的节点类型，然后按照类型去操作拼接
 *  - 这种方式比较强大、灵活，但也更复杂，可以实现自定义的模板引擎
 */

function parse(template) {
  const tokens = template.split(/(<%=|%>|<%)/)
  const ast = []
  let current = 0

  while (current < tokens.length) {
    const token = tokens[current]

    if (token === '<%') {
      current++
      let code = ''
      while (tokens[current] !== '%>') {
        code += tokens[current]
        current++
      }
      ast.push({ type: 'Code', value: code.trim() })
      current++
    } else if (token === '<%=') {
      current++
      let code = ''
      while (tokens[current] !== '%>') {
        code += tokens[current]
        current++
      }
      ast.push({ type: 'Expression', value: code.trim() })
      current++
    } else {
      ast.push({ type: 'Text', value: token })
      current++
    }
  }

  return ast
}

function compile(ast) {
  let code = 'let result = "";\n'

  ast.forEach(node => {
    if (node.type === 'Text') {
      code += `result += \`${node.value}\`;\n`
    } else if (node.type === 'Expression') {
      code += `result += ${node.value};\n`
    } else if (node.type === 'Code') {
      code += `${node.value}\n`
    }
  })

  code += 'return result;'
  return new Function('data', code)
}

const template = `
  <div>hahaha</div>
  <h1><%= data.title %></h1>
  <% if (data.user) { %>
    <p>Hello, <%= data.user.name %>!</p>
  <% } else { %>
    <p>Hello, guest!</p>
  <% } %>
  <ul>
    <% data.items.forEach(item => { %>
      <li><%= item %></li>
    <% }); %>
  </ul>
`

const ast = parse(template)
console.log(ast)
const render = compile(ast)

const data = {
  title: 'My Page',
  user: { name: 'John' },
  items: ['Item 1', 'Item 2', 'Item 3']
}

const result = render(data)
console.log(result)
