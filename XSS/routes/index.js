var express = require('express');
var router = express.Router();

var comments = {}

function html_encode(str) {
  if (str.length == 0) return '';
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/\'/g, '&39;');
  str = str.replace(/\"/g, '&quot;');
  str = str.replace(/\s/g, '&nbsp;');
  str = str.replace(/\n/g, '<br>');
  return str
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express', xss: req.query.xss});
});

router.get('/setComment', function (req, res, next) {
  comments.v = html_encode(req.query.comment)
});

router.get('/getComment', function (req, res, next) {
  res.json({
    comment: comments.v
  })
});

module.exports = router;
