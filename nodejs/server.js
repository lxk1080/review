const http = require('http')

const app = http.createServer(function(req, res) {
    res.writeHeader(200, { 'Content-Type': 'text/plain'})
    res.write('hello')
    res.end()
})

app.listen(3000, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('listening 3000 ...')
})