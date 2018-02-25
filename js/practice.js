for (var i = 0; i < 5; i++) {
  // 此定时器会在1000ms后加入到异步队列
  setTimeout(function () {
    console.log(i)
  }, 1000)
}