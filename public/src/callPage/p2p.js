
let p2pID = document.getElementById("userId").textContent
let peer = new Peer(p2pID, {
    host: 'chatpeer.onrender.com',
    port: 443,
    path: '/myapp',
    secure: true,
})
let conList = []
let streamList = []
let peerList = []
let audioList = []
let userList = []
let firstFlg = true
let firstFLG2 = true
const sendVideo = (stream) => {
    userList.forEach((i) => {
        if (i.userId != p2pID) {
            let sendPeer = peer.call(i.userId, stream)
            peerList.push({ userId: i.userId, peer: sendPeer })
        }
    })
}
const sendVideo2 = (stream, id) => {
    if (id != p2pID) {
        let sendPeer = peer.call(id, stream)
        peerList.push({ userId: id, peer: sendPeer })
    }
}
const sendAudio = (stream) => {
    userList.forEach((i) => {
        if (i.userId != p2pID) {
            let audioPeer = peer.call(i.userId, stream)
            audioList.push({ userId: p2pID, peer: audioPeer })
        }
    })
}
const sendAudio2 = (stream, id) => {
    if (id != p2pID) {
        let audioPeer = peer.call(id, stream)
        audioList.push({ userId: p2pID, peer: audioPeer })
    }
}
const unshiftList = (userList2) => {
    userList2.forEach((i, index) => {
        if (i.userId == p2pID) {
            userList.splice(index, 1)
            userList.unshift(i)
        }
    })

}

Socket.on("setUserNew", async (data) => {
    //始めて接続したクライアントが今までいたクライアントにっ接続
    let conCO = 0
    userList = data.userList
    unshiftList(userList)
    sendMedia(userId)
    let videoWarpp = document.querySelector(".roomCenterMain")
    let audioWarpp = document.getElementById("audioWindowsWaerpp")
    audioWarpp.innerHTML = audioDoms(userList, p2pID)
    videoWarpp.innerHTML = videoWindow(userList, p2pID, camStyle, mkStyle, headStyle)
    if (userList.length - 1 > 0) {
        // userList.forEach((i)=>{
        //     if(i.userId != p2pID){
        //         console.log(i.userId)
        //         // const conn = peer.connect(i.userId);
        //         // conList.push(conn)
        //         // conn.on("open",()=>{
        //         //     conCO +=1
        //         //     console.log(`${i.userId}に接続しました`)
        //         //     if(conCO >= userList.length-1){
        //         //         console.log(camStream)
        //         //         // caminit(true)
        //         //         // audioInit(true)
        //         //     }
        //         // })
        //     }
        // })
    } else {
        caminit(true)
        audioInit(true)
    }
})
Socket.on("joinUser", (data) => {
    userList.push(data.listData)
    if (userList.length > 3) {
        if (capFLG) {
            changeCap()
        }
    }
    sendMedia2(userId, data.userId)
    let videoWarpp = document.querySelector(".firstVideo")
    try {
        videoWarpp.classList.remove("firstVideo")
    } catch { }
    videoWarpp.insertAdjacentHTML('beforebegin', videoWindow2(data.userId, data.listData.name, camStyle, mkStyle, headStyle))
    let audioWarpp = document.querySelector(".firstAudio")
    try {
        audioWarpp.classList.remove("firstAudio")
    } catch { }
    audioWarpp.insertAdjacentHTML('beforebegin', audioDoms2(data.userId))
    const conn = peer.connect(data.userId)
    conList.push(conn)
    conn.on("open", () => {
        // sendMedia2(userId,conn.peer)
        sendVideo2(camStream, data.userId)
        sendAudio2(mikeStream, data.userId)
    })
    //今までいたクライアントが始めて接続したクライアントに接続
})
function sleep(waitMsec) {
    var startMsec = new Date();

    while (new Date() - startMsec < waitMsec);
}
peer.on('connection', (conn) => {

    let dataFLG = false
    conn.on("data", (data) => {
        dataFLG = true
        let userWarp = document.getElementById(`3video:${conn.peer}`)
        if (data.flg) {
            userWarp.style.border = "solid 1px #50FA7B"
        } else {
            userWarp.style.border = "none"
        }
    })
    if (!dataFLG) {
        // firstFLG2 = false
        let flg = true
        let conn2
        conList.forEach((i) => {
            if (i.peer == conn.peer) {
                flg = false
            }
        })
        if (flg) {
            conn2 = peer.connect(conn.peer);
            conList.push(conn2)
        }
        try {
            conn2.on("open", () => {
            })
        } catch { }
        caminit(true)
        audioInit(true)
    }
});
peer.on("call", (call) => {
    call.answer();
    let userVideo = document.getElementById("video:" + call.peer)
    let userAudio = document.getElementById("audio:" + call.peer)
    // streamList.forEach((i)=>{
    //     if(i.userId == call.peer){
    //         flg = true
    //     }
    // })
    call.on("stream", (stream) => {
        if (stream.getVideoTracks().length > 0) {
            streamList.push({ userId: call.peer, stream: stream })
            userVideo.srcObject = stream
        } else if (stream.getAudioTracks().length > 0) {
            if (call.peer != p2pID)
                userAudio.srcObject = stream
            // userAudio.play()
        }
    })
})
const sendMess = () => {
    conList.forEach((i) => {
        if (soundAudioFLG) {
            i.send({ flg: true })
        } else {
            i.send({ flg: false })
        }
    })
}
const sendMedia = (MyId) => {
    Socket.emit("sendMedias", { myId: MyId, cam: camFlg, mike: mikeFlg, head: headFlg })
}
const sendMedia2 = (MyId, userId) => {
    Socket.emit("sendMedias2", { myId: MyId, userId: userId, cam: camFlg, mike: mikeFlg, head: headFlg })
}
Socket.on("sendMediaReturn", (data) => {

    let userId2 = data.myId
    if (userId2 != userId) {
        let cam = document.getElementById("camState" + userId2)
        let mike = document.getElementById("mkState" + userId2)
        let head = document.getElementById("headState" + userId2)
        if (!data.cam) {
            cam.style.display = "block"
        } else {
            cam.style.display = "none"
        }
        if (!data.mike) {

            mike.style.display = "block"
        } else {
            mike.style.display = "none"
        }
        if (!data.head) {

            head.style.display = "block"
        } else {
            head.style.display = "none"
        }
    }
})
