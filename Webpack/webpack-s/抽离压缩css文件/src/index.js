
import { sum } from './math'

import './style/style1.css'
import './style/style2.less'

// 可以直接拿到 DefinePlugin 中定义的值
console.log('ENV', ENV)

console.log('sumRes', sum(10, 20))

// 引入图片
function insertImgElem(imgFile) {
  const img = new Image()
  img.src = imgFile
  document.body.appendChild(img)
}

import imgFile1 from './img/1.png'
insertImgElem(imgFile1)
import imgFile2 from './img/2.jpeg'
insertImgElem(imgFile2)
