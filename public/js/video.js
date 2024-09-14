let localStream;
let remoteStream;
let peerConnection;

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const videoContainer = document.getElementById('videoContainer'); // 获取视频容器
const servers = {
    iceServers: [
        {
            urls: 'stun:stun1.l.google.com:19302'
        }
    ]
};

let isVideoCallActive = false;
let isVoiceCallActive = false;

function toggleMoreOptions() {
    const moreOptions = document.getElementById('moreOptions');
    moreOptions.classList.toggle('hidden');
}

function startVideoCall() {
    if (isVoiceCallActive) {
        hideCall(); // 隐藏语音通话
    }

    if (isVideoCallActive) {
        hideCall(); // 如果视频通话已开启，关闭它
        return;
    }

    // 显示视频容器并初始化视频通话逻辑
    videoContainer.classList.remove('hidden');
    isVideoCallActive = true;
    console.log("视频通话已启动");
    startCall({ video: true, audio: true });
}

function startVoiceCall() {
    if (isVideoCallActive) {
        hideCall(); // 隐藏视频通话
    }

    if (isVoiceCallActive) {
        hideCall(); // 如果音频通话已开启，关闭它
        return;
    }

    // 显示视频容器并初始化音频通话逻辑
    videoContainer.classList.remove('hidden');
    isVoiceCallActive = true;
    console.log("音频通话已启动");
    startCall({ video: false, audio: true });
}

function startCall(mediaConstraints) {
    navigator.mediaDevices.getUserMedia(mediaConstraints)
        .then(stream => {
            localStream = stream;
            localVideo.srcObject = stream;

            // 创建 RTCPeerConnection
            peerConnection = new RTCPeerConnection(servers);
            peerConnection.onicecandidate = handleICECandidateEvent;
            peerConnection.ontrack = handleTrackEvent;

            localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

            peerConnection.createOffer()
                .then(offer => {
                    return peerConnection.setLocalDescription(offer);
                })
                .then(() => {
                    socket.emit('offer', peerConnection.localDescription);
                });
        })
        .catch(error => console.error('Error accessing media devices.', error));
}

// Socket.io 事件处理
socket.on('offer', (offer) => {
    initiatePeerConnection();
    peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => peerConnection.createAnswer())
        .then(answer => peerConnection.setLocalDescription(answer))
        .then(() => socket.emit('answer', peerConnection.localDescription));
});

socket.on('answer', (answer) => {
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
});

socket.on('candidate', (candidate) => {
    const iceCandidate = new RTCIceCandidate(candidate);
    peerConnection.addIceCandidate(iceCandidate);
});

function handleICECandidateEvent(event) {
    if (event.candidate) {
        socket.emit('candidate', event.candidate);
    }
}

function handleTrackEvent(event) {
    remoteVideo.srcObject = event.streams[0];
}

function initiatePeerConnection() {
    if (!peerConnection) {
        peerConnection = new RTCPeerConnection(servers);
        peerConnection.onicecandidate = handleICECandidateEvent;
        peerConnection.ontrack = handleTrackEvent;

        if (localStream) {
            localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
        }
    }
}

function hideCall() {
    videoContainer.classList.add('hidden');
    isVideoCallActive = false;
    isVoiceCallActive = false;
}

// 使视频可调整大小
localVideo.style.resize = 'both';
localVideo.style.overflow = 'auto';
remoteVideo.style.resize = 'both';
remoteVideo.style.overflow = 'auto';