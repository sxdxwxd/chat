function notifyUser(title, options) {
    if (!("Notification" in window)) {
        console.error("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        new Notification(title, options);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission(permission => {
            if (permission === "granted") {
                new Notification(title, options);
            }
        });
    }
}

// 使用示例
socket.on('sendMsgFunServe', function({ message, id }) {
    if (id !== socket.id) {
        notifyUser("新消息", { body: `${id} 发来消息: ${message}` });
        // 添加消息逻辑
    }
});