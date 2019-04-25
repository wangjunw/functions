var http = require('http');
var url = require('url');
var data = { data: 'hello' };
http.createServer((req, res) => {
    /**
     * 解析URL字符串，第二个参数为true表示返回的 URL 对象的 query 属性
     * 会是一个使用 querystring 模块的 parse() 生成的对象。 不需要自己再去转换
     * */
    var params = url.parse(req.url, true);
    if (params.query.callback) {
        var str = `${params.query.callback}(${JSON.stringify(data)})`;
        res.end(str);
    } else {
        res.end();
    }
}).listen(8888, () => {
    console.log('8888端口服务已启动');
});

/**
 * Express版本直接调用res.jsonp即可
 * 可以自行下载express之后使用
 */
// const express = require('express');
// let server = express();
// server.listen(8888);

// let router = express.Router();
// router.get('/', (req, res) => {
//     res.jsonp('{ a: 10 }');
// });
// server.use(router);
