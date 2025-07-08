// @ts-nocheck
/**
 * 手写深拷贝，考虑对象、数组、Map、Set、循环引用
 * @param obj
 * @param map
 */
const cloneDeep = (obj: any, map = new WeakMap()) => {
  if (typeof obj !== 'object' || obj === null) return obj

  // 解决循环引用问题，如果一个 obj 已经被复制过，直接返回复制后的值即可，不要重复做复制操作
  const cacheDeep = map.get(obj)
  if (cacheDeep) return cacheDeep

  let target: any

  if (obj instanceof Map) {
    target = new Map()
    map.set(obj, target)
    obj.forEach((v: any, k: any) => {
      const vDeep = cloneDeep(v, map)
      const kDeep = cloneDeep(k, map)
      target.set(kDeep, vDeep)
    })

  } else if (obj instanceof Set) {
    target = new Set()
    map.set(obj, target)
    obj.forEach((v: any) => {
      const vDeep = cloneDeep(v, map)
      target.add(vDeep)
    })

  } else if (Array.isArray(obj)) {
    target = []
    map.set(obj, target)
    obj.forEach((v: any) => {
      target.push(cloneDeep(v, map))
    })

  } else {
    // 最后只能是对象类型了
    target = {}
    // 注意，解决循环引用这里，必须要在 cloneDeep 之前赋值，下面的 cloneDeep 执行的时候，就已经遇到循环引用了
    map.set(obj, target)
    for (let k in obj) {
      target[k] = cloneDeep(obj[k], map)
    }
  }

  return target
}

/**
 * 测试代码
 */

const obj = {
  a: 1,
  b: 2,
  c: {
    name: 'c',
    city: 'qwer',
  },
  d: [1,2,3,4,5],
  e: new Map([[1,1],[2,2]]),
  f: new Set([1,2,3]),
  g: () => {},
}

obj.self = obj

const deepObj = cloneDeep(obj)

console.log('obj =>', obj)
console.log('deepObj =>', deepObj)
