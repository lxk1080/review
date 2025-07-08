
/**
 * 自定义事件
 * @param eventName 事件名称
 * @param data 传输的数据
 * @param target 触发事件的元素
 */
export const fireEvent = function (eventName, data, target = document.body) {
  const event = new CustomEvent(eventName, {
    detail: data,
    bubbles: true,
    cancelable: false,
  })
  target.dispatchEvent(event)
}

/**
 * 获取不定层级值
 * @param arr 数组，第一个元素应该是某个对象，后面得元素是下级字段字符串
 */
export const getLevelValue = (arr) => {
  if (!Array.isArray(arr) || arr.length < 2) {
    return void 0
  }
  try {
    let res = arr[0]
    for (let i = 1; i < arr.length; i++) {
      res = res[arr[i]]
    }
    return res
  } catch (err) {
    return void 0
  }
}
