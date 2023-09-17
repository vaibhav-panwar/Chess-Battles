//getting query params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get("username");
const room = urlParams.get("room");

//vc app
let APP_ID = '0310e67038924aeebf23bb827ed2b0c3'


let token = null;
let uid = String(Math.floor(Math.random() * 10000))

let client;
let channel;


if (!room) {
    window.location = 'index.html'
}

let localStream;
let remoteStream;
let peerConnection;

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }
    ]
}


let constraints = {
    video: {
        width: { min: 600, ideal: 600, max: 600 },
        height: { min: 1000, ideal: 1000, max: 1000 },
    },
    audio: true
}

let init = async () => {
    client = await AgoraRTM.createInstance(APP_ID)
    await client.login({ uid, token })

    channel = client.createChannel(room)
    await channel.join()

    channel.on('MemberJoined', handleUserJoined)
    channel.on('MemberLeft', handleUserLeft)

    client.on('MessageFromPeer', handleMessageFromPeer)

    localStream = await navigator.mediaDevices.getUserMedia(constraints)
    document.getElementById('user-1').srcObject = localStream
}


let handleUserLeft = (MemberId) => {
    document.getElementById('user-2').style.display = 'none'
    // document.getElementById('user-1').classList.remove('smallFrame')
}

let handleMessageFromPeer = async (message, MemberId) => {

    message = JSON.parse(message.text)

    if (message.type === 'offer') {
        createAnswer(MemberId, message.offer)
    }

    if (message.type === 'answer') {
        addAnswer(message.answer)
    }

    if (message.type === 'candidate') {
        if (peerConnection) {
            peerConnection.addIceCandidate(message.candidate)
        }
    }


}

let handleUserJoined = async (MemberId) => {
    console.log('A new user joined the channel:', MemberId)
    createOffer(MemberId)
}


let createPeerConnection = async (MemberId) => {
    peerConnection = new RTCPeerConnection(servers)

    remoteStream = new MediaStream()
    document.getElementById('user-2').srcObject = remoteStream
    document.getElementById('user-2').style.display = 'block'

    // document.getElementById('user-1').classList.add('smallFrame')


    if (!localStream) {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        document.getElementById('user-1').srcObject = localStream
    }

    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    })

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
        })
    }

    peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
            client.sendMessageToPeer({ text: JSON.stringify({ 'type': 'candidate', 'candidate': event.candidate }) }, MemberId)
        }
    }
}

let createOffer = async (MemberId) => {
    await createPeerConnection(MemberId)

    let offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)

    client.sendMessageToPeer({ text: JSON.stringify({ 'type': 'offer', 'offer': offer }) }, MemberId)
}


let createAnswer = async (MemberId, offer) => {
    await createPeerConnection(MemberId)

    await peerConnection.setRemoteDescription(offer)

    let answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)

    client.sendMessageToPeer({ text: JSON.stringify({ 'type': 'answer', 'answer': answer }) }, MemberId)
}


let addAnswer = async (answer) => {
    if (!peerConnection.currentRemoteDescription) {
        peerConnection.setRemoteDescription(answer)
    }
}


let leaveChannel = async () => {
    await channel.leave()
    await client.logout()
}

let toggleCamera = async () => {
    let videoTrack = localStream.getTracks().find(track => track.kind === 'video')

    if (videoTrack.enabled) {
        videoTrack.enabled = false
        document.getElementById('camera-btn').style.backgroundColor = 'rgb(255, 80, 80)'
    } else {
        videoTrack.enabled = true
        document.getElementById('camera-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)'
    }
}

let toggleMic = async () => {
    let audioTrack = localStream.getTracks().find(track => track.kind === 'audio')

    if (audioTrack.enabled) {
        audioTrack.enabled = false
        document.getElementById('mic-btn').style.backgroundColor = 'rgb(255, 80, 80)'
    } else {
        audioTrack.enabled = true
        document.getElementById('mic-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)'
    }
}

window.addEventListener('beforeunload', leaveChannel)

document.getElementById('camera-btn').addEventListener('click', toggleCamera)
document.getElementById('mic-btn').addEventListener('click', toggleMic)

init()


//
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
//chess move
var board;
var game;

window.onload = function () {
    initGame();
};

var initGame = function () {
    var cfg = {
        draggable: true,
        position: 'start',
        onDrop: handleMove,
    };

    board = new ChessBoard('gameBoard', cfg);
    game = new Chess();
};

var handleMove = function (source, target) {
    var move = game.move({ from: source, to: target });

    if (move === null) return 'snapback';
};



const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const socket = io();

//emitting room name
socket.emit('join-room', { username, room });

var handleMove = function (source, target) {
    var move = game.move({ from: source, to: target });

    if (move === null) return 'snapback';
    else socket.emit('move', move);

};

socket.on('move', function (msg) {
    game.move(msg);
    board.position(game.fen()); // fen is the board layout
});

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    socket.emit('chatMsg', msg);

    //Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})
socket.on('roomUsers',({room,users})=>{
    outputRoomName(room);
    outputUsers(users);
})
socket.on('message', (data) => {
    console.log(data);
    appendMsg(data);

    //Scroll Down
    chatMessages.scrollTop = chatMessages.scrollHeight


})

function appendMsg(msg) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${msg.username}<span>${msg.time}</span></p>
						<p class="text">
							${msg.message}
						</p>`
    document.querySelector('.chat-messages').appendChild(div);

}

function outputRoomName(room) {
    roomName.innerText = room
}
function outputUsers(users){
    userList.innerHTML = `${users.map(user=>`<li>${user.username}</li>`).join('')}`
}