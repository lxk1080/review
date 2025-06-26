const http = require('http')
const cpuCoreLen = require('os').cpus().length
const cluster = require('cluster')

if (cluster.isMaster) {
  for (let i = 0; i < cpuCoreLen; i++) {
    cluster.fork() // 开启子进程，子进程会再执行一遍这个文件
  }

  cluster.on('exit', () => {
    console.log('子进程退出')
    cluster.fork() // 进程守护（少了一个，就再开一个）
  })
} else {
  // 多个子进程会共享一个 TCP 连接，提供一份网络服务（也就是说对外来看就一个）
  const server = http.createServer((req, res) => {
    res.writeHead(200)
    res.end('Done')
  })
  server.listen(3000, () => {
    // 有几个核，就会输出多少次
    console.log('running at port 3000 ...')
  })
}
