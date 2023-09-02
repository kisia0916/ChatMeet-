const domain = "https://chatm-dffac3792890.herokuapp.com/join/"
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
const roomListDom = (roomList)=>{
    console.log(roomList)
    let html = roomList.map((i)=>{
        i.roomName = sanitizeInput(i.roomName)
        return `
        <div class="topSpace"></div>
            <div class="roomCard">
                <a href="/join/${i.roomId}" class="link">
                </a>
                <div class="roomCardLeft">
                    <img src="${i.icon}" class="roomIcon" />
                </div>
                <div class="roomCardRight">
                    <div class="roomCardText">
                        <span class="roomTitle">${i.roomName}</span>
                    </div>
                    <div class="roomCardInfos">
                        <span class="material-symbols-outlined roomPersonIcon">
                            person
                        </span>
                        <span class="roomCardNum">${i.userList.length}</span>
                        <textarea id="roomIdAria${i.roomId}" style="display:none">${domain+i.roomId}</textarea>
                        <button id="${i.roomId}" class="RoomListlinkCopyButton" onclick="copyId(this.id,event)"><span class="material-symbols-outlined">
                        link
                    </span></button>
                    </div>
                </div>
            </div>                        

        `
    }).join("")
    if(roomList.length == 0){
        html = `
        <div class="topSpace"></div>
            <div class="noRoomDom">
            <span class="noRoomText">No Room</span>
            </div>
        `
    }
    return html
}