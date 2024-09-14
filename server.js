const express = require('express');
const http = require('http');
const expressWs = require('express-ws');

const app = express();
const server = http.createServer(app);
expressWs(app, server);

// 静态文件服务
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// 导入并初始化聊天和 P2P 模块
require('./server/chatServer')(server);
require('./server/p2pServer')(app);

server.listen(3000, '0.0.0.0',() => {
    console.log('Server is listening on http://localhost:3000');
});