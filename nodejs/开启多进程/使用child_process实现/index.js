const http = require('http')
const fork = require('child_process').fork

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // 开启多进程
    const sumProcess = fork('./sum.js')
    sumProcess.send('start')
    sumProcess.on('message', data => {
      res.end('sum is: ' + data)
    })
  }
})

server.listen(3000, () => {
  console.log('running at port 3000 ...')
})
