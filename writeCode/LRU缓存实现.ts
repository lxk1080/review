// @ts-nocheck
/**
 * 啥是 LRU 缓存？Least Recent Used 最近使用，缓存最近使用的或让存储提前，删除 “沉水” 数据，优化内存使用，和人脑的记忆原理一样
 *  - 有几个点需要注意
 *    - 用哈希表存储数据，这样 get、set 才够快 O(1)
 *    - 必须是有序的，常用数据放在前面，不常用的放后面
 *    - 所以使用 Map 结构，对象 Obj 是无序的，不满足条件
 *  - 在一开始的时候是没有 Map 这个 API 的，那之前是怎么实现的 LRU 的呢？
 *    - 使用 “对象 + 数组” 的结合（使用对象做 get、set，数组做排序，但是这种方式，因为操作数组，所以性能较差）
 *    - 使用 “对象 + 双向链表” 的结合（依旧使用对象做 get、set，但是使用链表做排序，性能会高不少，但是这个代码写起来比较复杂）
 *      - 为啥是双向链表而不是单向链表？其实单向链表也可以，只是双向链表操作起来，更加方便一些，本来代码就比较复杂了，就不要难上加难了
 *      - 双向链表，如果需要移动某个中间节点，可以快速让此节点的上一个节点和下一个节点建立联接，如果是单向链表，则无法获得上一个节点，需要使用其它方式完成此操作
 *    - 参考链接：https://coding.imooc.com/lesson/562.html#mid=51068
 *    - 参考文件：writeCode/LRU缓存实现-对象-双向链表.ts
 */

class LRUCache {
  private readonly length: number
  private dataMap: Map = new Map<any, any>()

  constructor(length: number) {
    if (length < 1) throw new Error('invalid length')
    // 设置缓存最大长度
    this.length = length
  }

  set(key: any, value: any) {
    // 删除老的并重新添加（更新记忆）
    if (this.dataMap.has(key)) {
      this.dataMap.delete(key)
    }
    this.dataMap.set(key, value)

    if (this.dataMap.size > this.length) {
      // 如果长度超过了，则删除掉最老的记忆
      // 通过迭代器的功能找到第一个 key 并删除
      const olderKey = this.dataMap.keys().next().value
      this.dataMap.delete(olderKey)
    }
  }

  get(key: any) {
    if (!this.dataMap.has(key)) return null
    const value = this.dataMap.get(key)

    // 删除并重新插入（温故而知新）
    this.dataMap.delete(key)
    this.dataMap.set(key, value)

    return value
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
