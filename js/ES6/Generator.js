// 需要babel-polyfill包
{
  let tell = function* () {
    yield 'a'
    yield 'b'
    return 'c'
  }

  let k = tell()

  console.log(k.next())
  console.log(k.next())
  console.log(k.next())
  console.log(k.next())
}

// 应用于迭代器
{
  let obj = {}
  obj[Symbol.iterator] = function* () {
    yield 1
    yield 2
    yield 3
  }

  for (let value of obj) {
    console.log(value)
  }
}

// 状态机
{
  let state = function* () {
    while(true) {
      yield 'A'
      yield 'B'
      yield 'C'
    }
  }

  let status = state()
  console.log(status.next())
  console.log(status.next())
  console.log(status.next())
  console.log(status.next())
  console.log(status.next())
}

// aysnc语法糖
// {
//   let state = async function () {
//     while(true) {
//       await 'A'
//       await 'B'
//       await 'C'
//     }
//   }
//
//   let status = state()
//   console.log(status.next())
//   console.log(status.next())
//   console.log(status.next())
//   console.log(status.next())
//   console.log(status.next())
// }

// 模拟抽奖次数
{
  let draw = function (count) {
    // 具体抽奖逻辑
    console.log(`剩余${count}次`)
  }

  let residue = function* (count) {
    while(count > 0) {
      count--
      yield draw(count)
    }
  }

  let star = residue(5)
  let btn = document.createElement('button')
  btn.id = 'start'
  btn.textContent = '抽奖'
  document.body.appendChild(btn)
  document.getElementById('start').addEventListener('click', function() {
    star.next()
  }, false)
}

// 长轮询
{
  let ajax = function* () {
    yield new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve({code: 0})
      }, 20)
    })
  }

  let pull = function () {
    let gen = ajax()
    let step = gen.next()
    step.value.then(function(data) {
      if (data.code === 0) {
        console.log(data)
      } else {
        setTimeout(function () {
          console.log('pulling...')
          pull()
        }, 1000)
      }
    })
  }

  pull()
}