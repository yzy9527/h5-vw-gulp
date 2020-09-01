var express=require('express');
var { createProxyMiddleware } = require('http-proxy-middleware')

var app =express();


//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//目标地址
let target = 'http://47.103.124.166'

let arrayUrl = [
    '/paper-web/search/getPaperUserInfoById'
]
arrayUrl.forEach(ele=>{
    app.use(ele, createProxyMiddleware({target,changeOrigin: true}));
})


//配置服务端口
var server = app.listen(3300, function () {

    var host = server.address().address;

    var port = server.address().port;

    console.log('Example app listening at http:localhost://%s:%s', host, port);
})


