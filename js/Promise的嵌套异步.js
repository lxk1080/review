/**
 * 输出 2 1 ，虽然 a Promise 先 resolve，但是它的 then 函数还没执行到，b Promise 后 resolve，但是先走 then 函数（前提是已经 resolve 过），所以先输出 b 的结果
 */
const a = () => {
  return new Promise((resolve) => {
    resolve(1)

    const b = new Promise((resolve) => {
      // setTimeout(() => {
        resolve(2)
      // })
    })

    b.then((data) => {
      console.log(data)
    })
  })
}

a().then((data) => {
  console.log(data)
})
