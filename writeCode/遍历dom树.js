/**
 * 节点类型处理，在 TS 中均为 Node 类型
 * @param node
 */
const visitNode = (node) => {
  if (node instanceof Comment) {
    console.log('Comment node: ', node)
  }
  if (node instanceof Text) {
    const t = node.textContent.trim()
    if (t) console.log('Text node: ', t)
  }
  if (node instanceof HTMLElement) {
    console.log('Element node: ', `<${node.tagName.toLowerCase()}>`)
  }
}

/**
 * 深度优先遍历（这里用非递归的写法，注意要反序压栈）
 */
const deepFirstDom = (root) => {
  const stack = [root]
  while(stack.length) {
    const node = stack.pop()
    visitNode(node)
    if (node.childNodes.length) {
      Array.from(node.childNodes).reverse().forEach((child) => {
        stack.push(child)
      })
    }
  }
}

/**
 * 广度优先遍历
 */
const scopeFirstDom = (root) => {
  const queue = [root]
  while(queue.length) {
    const node = queue.shift()
    visitNode(node)
    if (node.childNodes.length) {
      node.childNodes.forEach((child) => {
        queue.push(child)
      })
    }
  }
}

/**
 * 单元测试
 *  - 可以复制到浏览器中进行测试，这里测试不了
 */
