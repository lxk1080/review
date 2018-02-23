{
  // es5
  let ajax = function (callback) {
    console.log('执行1')
    setTimeout(function () {
      callback && callback.call()
    }, 1000)
  }
  ajax(function () {
    console.log('timeout1')
  })
}

// 串联操作
{
  let ajax = function() {
    console.log('执行2')
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve()
      }, 1000)
    })
  }

  ajax().then(function () {
    console.log('timeout2')
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve()
      }, 1000)
    })
  }).then(function () {
    console.log('timeout22')
  })
}

// catch
{
  let ajax = function (num) {
    console.log('执行3')
    return new Promise(function (resolve, reject) {
      if (num > 5) {
        resolve()
      } else {
        throw new Error('这个数不是小于5的')
      }
    })
  }

  ajax(6).then(function() {
    console.log(6)
    console.log(qwer) // 这里出错也会进入catch函数
  }).catch(function (err) {
    console.log(err)
  })
}

{
  // 所有图片都加载完再添加到封面
  function loadImg(src) {
    return new Promise(function (resolve, reject) {
      let img = document.createElement('img')
      img.src = src
      img.onload = function () {
        resolve(img)
      }
      img.onerror = function (err) {
        reject(err)
      }
    })
  }

  let showImgs = function(imgs) {
    let p = document.createElement('p')
    imgs.forEach((img) => {
      p.appendChild(img)
    })
    document.body.appendChild(p)
  }

  Promise.all([
    loadImg('https://p.qpic.cn/music_cover/0D5Unc6BuPDfbMLbKgQeQFErcInxb58ML3sjWyEYOTyxY7lRZ7aLMw/300?n=1'),
    loadImg('https://p.qpic.cn/music_cover/zr4kI23pfnkYh6Ul22ibxQxtfvVyrt0CyGLDJopt4Libicut46UqxWbnQ/300?n=1'),
    loadImg('https://p.qpic.cn/music_cover/rTTmm5kYwyYzDb9vVF6KscPfJAPM79TOChRw75Ue2Zk2FakoOR8j3A/300?n=1'),
  ]).then(showImgs)
}

{
  // 任意一张图片加载完就添加到封面
  function loadImg(src) {
    return new Promise(function (resolve, reject) {
      let img = document.createElement('img')
      img.src = src
      img.onload = function () {
        resolve(img)
      }
      img.onerror = function (err) {
        reject(err)
      }
    })
  }

  let showImg = function(img) {
    let p = document.createElement('p')
    p.appendChild(img)
    document.body.appendChild(p)
  }

  Promise.race([
    loadImg('https://p.qpic.cn/music_cover/0D5Unc6BuPDfbMLbKgQeQFErcInxb58ML3sjWyEYOTyxY7lRZ7aLMw/300?n=1'),
    loadImg('https://p.qpic.cn/music_cover/zr4kI23pfnkYh6Ul22ibxQxtfvVyrt0CyGLDJopt4Libicut46UqxWbnQ/300?n=1'),
    loadImg('https://p.qpic.cn/music_cover/rTTmm5kYwyYzDb9vVF6KscPfJAPM79TOChRw75Ue2Zk2FakoOR8j3A/300?n=1'),
  ]).then(showImg)
}