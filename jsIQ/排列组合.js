
/**
 * 给出一个数组，长度不定，内部的子数组也长度不定，每次从各个子数组中取出一个数据，列出所有的组合
 * @param array
 * @returns {Array}
 */
function getCombination(array) {
  let resultArr = []
  array.forEach((arrItem) => {
    if (resultArr.length === 0) {
      let firstItem = []
      arrItem.forEach(item => {
        firstItem.push(item)
      })
      resultArr = firstItem
    } else {
      const emptyArray = []
      resultArr.forEach((item) => {
        arrItem.forEach((value) => {
          emptyArray.push(item + value)
        })
      })
      resultArr = emptyArray
    }
  })
  return resultArr
}



// 以下是测试 -----------------------------------------------------------------------------------------------------------

const list = [[1, 2, 3], ['a', 'b', 'c'], ['d', 'e']]

const res = getCombination(list)

console.log('res:', res)
console.log('length:', res.length) // 3 * 3 * 2 = 18
