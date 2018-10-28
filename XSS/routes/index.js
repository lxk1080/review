var express = require('express');
var router = express.Router();

var comments = {}

// 编码
function html_encode(str) {
    if (str.length == 0) return '';
    var s = ''
    s = str.replace(/</g, '&lt;');
    s = s.replace(/>/g, '&gt;');
    s = s.replace(/\'/g, '&#39;');
    s = s.replace(/\"/g, '&quot;');
    s = s.replace(/\s/g, '&nbsp;');
    s = s.replace(/\n/g, '<br>');
    return s
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'XSS', xss: req.query.xss});
});

router.get('/setComment', function (req, res, next) {
    comments.v = html_encode(req.query.comment)
    res.end()
});

router.get('/getComment', function (req, res, next) {
    res.json({
        comment: comments.v
    })
});

module.exports = router;
