const expressWs = require('express-ws');

module.exports = function(app) {
    const wsInstance = expressWs(app);

    app.ws('/ws', (ws, req) => {
        console.log('WebSocket client connected');

        ws.on('message', (msg) => {
            wsInstance.getWss().clients.forEach(client => {
                if (client !== ws && client.readyState === ws.OPEN) {
                    client.send(msg);  // 转发消息
                }
            });
        });

        ws.on('close', () => {
            console.log('WebSocket client disconnected');
        });
    });
};