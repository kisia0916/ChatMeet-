let userId = document.getElementById("userId").textContent
window.sessionStorage.setItem(["userId"],userId)
console.log(userId)
Socket.emit("createdSocketConnection",{userId:userId,page:"/main"})

const initPage = (roomList)=>{
    let listWarpp = document.querySelector(".publicRoomList")
    listWarpp.innerHTML = roomListDom(roomList.reverse())
}
const moveCreatet = ()=>{
    location.href = "/mkcall"
}
const copyId = (Id,event)=>{

    console.log("un")
    let content = document.getElementById('roomIdAria'+Id);
    console.log(content)
    console.log(Id)
    navigator.clipboard.writeText(content.value).then()
    // content.select();
    // document.execCommand('copy');
}