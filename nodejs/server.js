const express = require('express')
const axios = require('axios')

const app = express()

app.all("*", function(req, res, next) {
  if (req.path !== "/" && !req.path.includes(".")) {
    res.header("Access-Control-Allow-Credentials", true);
    // 这里获取 origin 请求头 而不是用 *
    res.header("Access-Control-Allow-Origin", req.headers["origin"] || "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
  }
  next();
});

const apiRouter = express.Router()

app.use('/api', apiRouter)

apiRouter.get('/data', (req, res) => {
  const url = 'http://app.edaycn.com/api/jssdk/?url=';
  axios.get(url, {
    headers: {
      referer: 'http://app.edaycn.com/',
      host: 'app.edaycn.com',
    },
    params: req.query
}).then((response) => {
  res.json(response.data)
}).catch((err) => {
  console.log(err)
})
})

app.use(express.static('./public'))

app.listen(3000, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at port 3000...')
})
