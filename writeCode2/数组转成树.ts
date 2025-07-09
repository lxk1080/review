// @ts-nocheck
/**
 * 将数组转化为树结构
 *  - 很容易想到遍历数组，然后把每个元素变成 ITreeNode 节点，再把节点加入到父节点的 children 中
 *  - 问题就在于：如何找到父节点？
 *    - 当然是通过 parentId 去找，但是如果按常规方法找，每次就需要遍历树结构，找到 parentId 对应的父节点，这个是比较耗时的
 *    - 所以优化方案是，我们将建立一个 Map([id, ITreeNode]) 的映射关系
 *    - 这样，我们只要知道了 parentId，就可以立刻使用 map.get(id) 得到父节点
 *  - 顺带一提，如果遇到 id 的顺序不是从小到大排列的，可以先排序后再转化
 */

interface IArrayItem {
  id: number
  name: string
  parentId: number
}

interface ITreeNode {
  id: number
  name: string
  children: ITreeNode[]
}

const convertArrToTree = (arr: IArrayItem[]): ITreeNode | null => {
  const idToTreeNodeMap = new Map()
  let root = null

  arr.forEach((item) => {
    const { id, name, parentId } = item

    // 1、将数组元素转化为树节点，并加入到 map 映射中
    const treeNode: ITreeNode = { id, name, children: [] }
    idToTreeNodeMap.set(id, treeNode)

    // 2、获取父节点，并将节点加入到父节点的 children 中，如果没有父节点，代表它是 root 节点
    const parentNode = idToTreeNodeMap.get(parentId)
    if (!parentNode) {
      root = treeNode
    } else {
      parentNode.children.push(treeNode)
    }
  })

  return root
}

/**
 * 功能测试
 */

const arr = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 1 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 2 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
]

console.log(convertArrToTree(arr))
