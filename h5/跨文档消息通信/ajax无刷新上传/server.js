const express = require('express')
const multer = require('multer')
const fs = require('fs')
const pathLib = require('path')

/*
 * pathLib.parse('文件/路径')
 *
 * root  所在盘符
 * dir   所在的目录
 * base  文件名 + 扩展名
 * ext   扩展名（带点的）
 * name  文件名
 */

var app = express()

app.use(multer({dest: './upload/img'}).any())

app.use(express.static('./src'))

app.listen(3000, function (err) {
    if (!err) {
        console.log('listen 3000 ... ')
    }
})

app.get('/favicon.ico', function(req, res) {
    res.end()
})

app.use('/', function (req, res) {
    let newFile = pathLib.parse(req.files[0].path).dir +'/mm'+ pathLib.parse(req.files[0].originalname).ext;
    fs.rename(req.files[0].path, newFile, function (err) {
        if (err) {
            res.end("Upload Error");
        } else {
            console.log('------------------------------\n', req.files[0])
            res.end("Upload Success");
        }
    });
});
