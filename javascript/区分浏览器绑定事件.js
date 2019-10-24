// JavaScript Document

//单体模式
//实现一个跨浏览器的事件处理程序

const Global = {};   //命名空间

Global.EventUtil = {
  addHandler: function (element, type, fn) {
    if (element.addEventListener) { //FF
      element.addEventListener(type, fn, false); //false代表冒泡事件，默认是捕获事件
    } else if (element.attachEvent) { //IE
      element.attachEvent('on' + type, fn);
    }
  },
  removeHandler: function (element, type, fn) {
    if (element.removeEventListener) {
      element.removeEventListener(type, fn, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, fn);
    }
  }
}
