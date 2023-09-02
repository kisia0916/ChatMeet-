let cam = true
let mike = true
let audio = true
let userId = document.querySelector(".userId").textContent
function sanitizeInput(input) {
    // 文字列内の特殊文字をエスケープします
    return input.replace(/[&<>"'/]/g, (match) => {
      const escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
      };
      return escapeMap[match];
    });
  }
if(window.sessionStorage.getItem(["userId"])){
    userId = window.sessionStorage.getItem(["userId"])
    Socket.emit("createdSocketConnection",{userId:userId,page:"/call"})
    window.sessionStorage.setItem(["userId"],userId)
}else{
    let userId2 = document.querySelector(".userId").textContent
    Socket.emit("createdSocketConnection",{userId:userId2,page:"/main"})
}
const join = ()=>{
    let userName = document.querySelector(".createInput").value
    let userId = document.querySelector(".userId").textContent
    let roomId = document.querySelector(".roomId").textContent
    userName = sanitizeInput(userName)
    window.sessionStorage.setItem(["cam"],cam)
    window.sessionStorage.setItem(["mike"],mike)
    window.sessionStorage.setItem(["audio"],audio)
    window.sessionStorage.setItem(["roomId"],roomId)
    window.sessionStorage.setItem(["userId"],userId)

    Socket.emit("joinUser",{roomId:roomId,userId:userId,userName:userName})
}
Socket.on("moveCall",(data)=>{
    let room = document.querySelector(".roomId").textContent
    // alert(room)
    console.log(room)
    location.href = `/call/${room}`
})
const changeCam = () =>{
    console.log(cam)
    let camText = document.querySelector(".camText")
    if(cam){
        camText.textContent = "OFF"
        camText.style.color = "#ff3838"
    }else{
        camText.textContent = "ON"
        camText.style.color = "#50FA7B"
    }
    cam = !cam
}
const changeMike = ()=>{
    console.log(mike)
    let camText = document.querySelector(".mikeText")
    if(mike){
        camText.textContent = "OFF"
        camText.style.color = "#ff3838"
    }else{
        camText.textContent = "ON"
        camText.style.color = "#50FA7B"
    }
    mike = !mike
}
const changeAudio = () =>{
    console.log(audio)
    let camText = document.querySelector(".headText")
    if(audio){
        camText.textContent = "OFF"
        camText.style.color = "#ff3838"
    }else{
        camText.textContent = "ON"
        camText.style.color = "#50FA7B"
    }
    audio = !audio
}