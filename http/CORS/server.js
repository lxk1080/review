const express = require('express')
const bodyParser = require('body-parser')

let app = express()

app.use(bodyParser.urlencoded({extended: false}))

app.use('/', function (req, res, next) {
  // CORS，前端都是浏览器自动处理，主要是后端要加 Access-Control-Allow-<*> 这样的代码
  res.header("Access-Control-Allow-Origin", "*");
  next()
})

app.get('/', function (req, res, next) {
  res.send(`hello world '${req.query.name}'`).end()
})

app.post('/', function (req, res, next) {
  res.send(`hello world '${req.body.name}'`).end()
})

app.listen(3000, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('lisrening... port 3000')
})
