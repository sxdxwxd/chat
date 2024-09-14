const username = prompt("请输入你的名片:");
const socket = io();

socket.emit("join", username);
document.querySelector('.chat-header').innerText = username + "的聊天室";

socket.on("join", function (user) {
    $('#messages').append(`<div class="message system">提示：${user} 已经加入了聊天</div>`);
});

function sendBtn() {
    const msgInput = document.getElementById('msg-input');
    const message = msgInput.value.trim();

    if (message !== '') {
        // 自己发送消息
        socket.emit('sendMsgFun', { message, username });
        msgInput.value = ''; // 清空输入框

        // 显示作为发送者的消息
        const messages = document.getElementById('messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message message-sent';
        messageElement.textContent = `${message}: 我 `;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight; // 滚动到底部
    } else {
        alert("请填写消息.");
    }
}

document.getElementById('file-upload').addEventListener('change', handleImageUpload);

function handleImageUpload() {
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const fileData = event.target.result;
            const filename = file.name;
            socket.emit('sendFile', { file: fileData, filename, username });
        };
        reader.readAsDataURL(file);
    }
}

socket.on('sendMsgFunServe', function({ message, username: sender }) {
    if (sender !== username) { // 检查消息发送者是否是自己
        const messages = document.getElementById('messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message message-received'; // 接收方消息样式
        messageElement.textContent = `${sender}: ${message}`;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight; // 滚动到底部
    }
});

// 处理收到的图片消息
socket.on('sendFileServe', function({ file, filename, username: sender }) {
    if (sender !== username) { // 检查图片消息发送者是否是自己
        const messages = document.getElementById('messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message message-received'; // 接收方消息样式
        const imageElement = document.createElement('img');
        imageElement.src = file;
        imageElement.alt = filename;
        imageElement.className = 'uploaded-image'; // 自定义类名用于样式
        messageElement.textContent = `${sender} 发送了图片: `;
        messageElement.appendChild(imageElement);
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight; // 滚动到底部
    }
});