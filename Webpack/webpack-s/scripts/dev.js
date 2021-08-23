
const fs= require('fs')
const path = require('path')
const { exec } = require('shelljs')

// 判断文件或文件夹是否存在
function isFileExisted(path_way) {
  return new Promise((resolve) => {
    fs.access(path_way, (err) => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

async function execCmd() {
  try {
    const dllPath = path.join(__dirname, '..', 'dist/dll')
    const hasDllDir = await isFileExisted(dllPath)

    // 因为 dll 文件构建一次后就不需要再次构建，以后直接用即可，这里判断下 dll 文件夹是否存在，存在的话就不要重复了
    if (!hasDllDir) {
      exec(`npx webpack --config ${path.join(__dirname, '..', '动态链接库插件Dllplugin/webpack.dll.js')}`)
    }

    exec(`npx webpack serve --config ${path.join(__dirname, '..', '动态链接库插件Dllplugin/webpack.dev.js')}`)

  } catch (e) {
    console.log('exec error')
  }
}

execCmd()
