/**
 * 重点在于使用 Object.prototype.toString 这个方法
 * 这里使用 indexOf 而不使用 split(' ')，是因为，尽量使用底层代码吧，能快一点是一点
 * @param data
 */
const getType = (data: any) => {
  const originType = Object.prototype.toString.call(data)
  const spaceIndex = originType.indexOf(' ')
  const type = originType.slice(spaceIndex + 1, -1)
  return type.toLowerCase()
}

/**
 * 单元测试
 */

console.log(getType(123))
console.log(getType('123'))
console.log(getType([]))
console.log(getType({}))
console.log(getType(true))
console.log(getType(null))
console.log(getType(undefined))
