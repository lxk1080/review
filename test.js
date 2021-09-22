
let list = [[1, 2, 3], ['a', 'b', 'c'], ['d', 'e']]
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
console.log(getCombination(list))
