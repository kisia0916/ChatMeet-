let userId = document.getElementById("userId").textContent
console.log(userId)

if(!userId){
    console.log(userId)
    location.href = "/catchpage"
}else{
    Socket.emit("createdSocketConnection",{userId:userId,page:"/main"})
}
if(!window.sessionStorage.getItem(["userId"])){
    window.sessionStorage.setItem(["userId"],userId)
}
const createRoom = ()=>{
    let roomName = document.getElementById("createRoomName").value
    let roomPass = document.getElementById("createRoomPass").value
    let maxNum = Number(document.querySelector(".createSelect").value)
    let private = document.querySelector(".privateBox").checked
    alert(private)
    if(roomName){
        Socket.emit("createRoom",{host:userId,roomName:roomName,pass:roomPass,max:maxNum,private:private})
    }
}

Socket.on("roomDatas",(data)=>{
    location.href = `/join/${data.id}`
})