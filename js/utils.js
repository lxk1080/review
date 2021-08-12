
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
  });

  target.dispatchEvent(event);
};


