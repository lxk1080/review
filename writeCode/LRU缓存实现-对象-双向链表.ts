/**
 * LRU 缓存实现，“对象 + 双向链表” 版本，仅供学习，有需要还是使用 Map 版本比较好
 *  - 使用对象做 get、set 操作，使用链表做移动排序操作
 */

interface IListNode {
  value: any
  key: string // 方便删除节点（否则需要遍历对象）
  prev?: IListNode
  next?: IListNode
}

class LRUCache {
  private length: number
  private data: { [key: string]: IListNode } = {}
  private dataLength: number = 0
  private listHead: IListNode | null = null
  private listTail: IListNode | null = null

  constructor(length: number) {
    if (length < 1) throw new Error('invalid length')
    this.length = length
  }

  tryClean() {
    while (this.dataLength > this.length) {
      // 清理最老的
      const head = this.listHead
      if (head == null) throw new Error('head is null')
      const headNext = this.listHead.next
      if (headNext == null) throw new Error('headNext is null')
      // 断绝 head 和 headNext 的关系
      delete head.next
      delete headNext.prev
      // 重新赋值 listHead
      this.listHead = headNext
      // 清理 data，改变长度
      delete this.data[head.key]
      this.dataLength--
    }
  }

  moveToTail(curNode: IListNode) {
    const tail = this.listTail
    if (tail === curNode) return

    // 1、让 prevNode 和 nextNode 断绝与 curNode 的关系，并且它两建立关系
    const prevNode = curNode.prev
    const nextNode = curNode.next
    if (prevNode) {
      if (nextNode) {
        prevNode.next = nextNode
      } else {
        // 如果没有 nextNode，说明 curNode 是尾节点，根本走不到这来
        // delete prevNode.next
      }
    }
    if (nextNode) {
      if (prevNode) {
        nextNode.prev = prevNode
      } else {
        delete nextNode.prev
      }
      // 如果移动的是头节点，那得改变头节点指向下一个
      if (this.listHead === curNode) {
        this.listHead = nextNode
      }
    }

    // 2、让 curNode 断绝与 prevNode 和 nextNode 的关系
    delete curNode.prev
    delete curNode.next

    // 3、在 list 末尾重新建立 curNode 的关系
    if (tail) {
      tail.next = curNode
      curNode.prev = tail
    }
    this.listTail = curNode
  }

  get(key: string) {
    const data = this.data
    const curNode = data[key]

    if (curNode == null) return null

    // 如果节点不在末尾，则需要移动到末尾（最新鲜的位置）
    if (curNode !== this.listTail) {
      this.moveToTail(curNode)
    }

    return curNode.value
  }

  set(key: string, value: any) {
    const data = this.data
    const curNode = data[key]

    if (curNode == null) {
      // 新增数据
      const newNode: IListNode = { key, value}
      // 添加到末尾
      this.moveToTail(newNode)

      // 更新 data 数据
      data[key] = newNode
      this.dataLength++

      // 初始化 listHead
      if (this.dataLength === 1) {
        this.listHead = newNode
      }
    } else {
      // 修改现有数据
      curNode.value = value
      // 移动到末尾
      this.moveToTail(curNode)
    }

    // 尝试清理长度
    this.tryClean()
  }
}

/**
 * 测试代码
 */

const lru = new LRUCache(2)

lru.set('a', 1) // {a=1}
lru.set('b', 2) // {a=1, b=2}

console.log(lru.get('a')) // 1 {b=2, a=1}

lru.set('c', 3) // {a=1, c=3}

console.log(lru.get('b')) // null {a=1, c=3}
console.log(lru.get('c')) // 3 {a=1, c=3}
console.log(lru.get('a')) // 1 {c=3, a=1}

lru.set('c', 33) // {a=1, c=33}
lru.set('d', 4) // {c=33, d=4}

console.log(lru.get('a')) // null {c=33, d=4}
console.log(lru.get('c')) // 33 {d=4, c=33}
console.log(lru.get('d')) // 4 {c=33, d=4}
