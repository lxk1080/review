/**
 * 将树转化成数组，其实就是树的遍历，可以根据需求，做广度优先遍历或深度优先遍历，都行
 *  - 这里就使用广度优先遍历了
 */

interface IArrayItem {
  id: number
  name: string
  parentId: number
}

interface ITreeNode {
  id: number
  name: string
  children?: ITreeNode[]
}

const convertTreeToArr = (root: ITreeNode): IArrayItem[] => {
  const result = []
  const queue = [{ node: root, parentId: 0 }]

  while(queue.length) {
    const { node, parentId } = queue.shift()
    const arrItem: IArrayItem = { id: node.id, name: node.name, parentId }
    result.push(arrItem)
    if (node.children) {
      node.children.forEach((child) => {
        queue.push({ node: child, parentId: node.id })
      })
    }
  }

  return result
}

/**
 * 功能测试
 */

const root = {
  id: 1,
  name: '部门A',
  children: [
    {
      id: 2,
      name: '部门B',
      children: [
        { id: 4, name: '部门D' },
        { id: 5, name: '部门E' }
      ]
    },
    {
      id: 3,
      name: '部门C',
      children: [{ id: 6, name: '部门F' }]
    }
  ]
}

console.log(convertTreeToArr(root))
