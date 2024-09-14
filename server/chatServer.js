const socketIO = require('socket.io');

module.exports = function(server) {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('Socket.io client connected');

        socket.on('join', (name) => {
            // 广播其他所有客户端，不包括自己
            socket.broadcast.emit('join', name);
        });

        socket.on('sendMsgFun', ({ message, username }) => {
            // 广播给除发送者之外的所有客户端
            socket.broadcast.emit('sendMsgFunServe', { message, username });
        });

        socket.on('sendFile', ({ file, filename, username }) => {
            // 广播给除发送者之外的所有客户端
            socket.broadcast.emit('sendFileServe', { file, filename, username });
        });

        socket.on('disconnect', () => {
            console.log('Socket.io client disconnected');
        });
    });
};