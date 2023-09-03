function replaceArrayElements(array, targetId, sourceId) {

}
const videoWindow = (userList,userId,style1,style2,style3)=>{
    userList.reverse()
    let html = userList.map((i,index)=>{
        if(i.userId == userId){
            if(index == 0){
                return`
                    <div class="videoWindowMain firstVideo">
                        <div class="videoWindowWarpp" id="3video:My">
                            <video id = "myVideo" class="videoMainWindow" muted="muted" autoplay></video>
                        </div>

                        <div class="videoWindowNameWarpp">
                            <div class="videoNameSSS">
                                <span class="videoWindowName">${i.name}</span><i class="ri-camera-off-fill meetPageCamIcon2 stateCam" style="display:${style1}" id="camStateMy"></i><i class="ri-mic-off-fill meetPageCamIcon2 stateMk" style="display:${style2}" id="mkStateMy"></i><span class="material-symbols-outlined audioIcon4 stateHead" style="display:${style3}" id="headStateMy">
                                headset_off
                            </span>
                            </div>
                        </div>
                    </div>
                `
            }else{
                return`
                    <div class="videoWindowMain">
                        <div class="videoWindowWarpp" id="3video:My">
                            <video id = "myVideo"  class="videoMainWindow" muted="muted" width="600" height="500" autoplay></video>
                        </div>
                        <div class="videoWindowNameWarpp">
                        <div class="videoNameSSS">
                        <span class="videoWindowName">${i.name}</span><i class="ri-camera-off-fill meetPageCamIcon2 stateCam" style="display:${style1}" id="camStateMy"></i><i class="ri-mic-off-fill meetPageCamIcon2 stateMk" style="display:${style2}" id="mkStateMy"></i><span class="material-symbols-outlined audioIcon4 stateHead" style="display:${style3}" id="headStateMy">
                        headset_off
                    </span>
                    </div>
                        </div>
                    </div>
                `
            }
        }else{
            if(index == 0){
                return`
                    <div class="videoWindowMain firstVideo" id="2video:${i.userId}">
                    <div class="videoWindowWarpp" id="3video:${i.userId}">
                        <video id = "video:${i.userId}" class="videoMainWindow" muted="muted" width="600" height="500" autoplay></video>
                    </div>
                    <div class="videoWindowNameWarpp">
                    <div class="videoNameSSS">
                    <span class="videoWindowName">${i.name}</span><i class="ri-camera-off-fill meetPageCamIcon2 stateCam" style="display:none" id="camState${i.userId}"></i><i class="ri-mic-off-fill meetPageCamIcon2 stateMk" style="display:none" id="mkState${i.userId}"></i><span class="material-symbols-outlined audioIcon4 stateHead" style="display:none" id="headState${i.userId}">
                    headset_off
                </span>
                </div>
                    </div>
                    </div>
                `
            }else{
                return`
                    <div class="videoWindowMain" id="2video:${i.userId}">
                    <div class="videoWindowWarpp" id="3video:${i.userId}">
                        <video id = "video:${i.userId}" muted="muted" class="videoMainWindow" width="600" height="500" autoplay></video>
                    </div>
                    <div class="videoWindowNameWarpp">
                    <div class="videoNameSSS">
                    <span class="videoWindowName">${i.name}</span><i class="ri-camera-off-fill meetPageCamIcon2 stateCam" style="display:none" id="camState${i.userId}"></i><i class="ri-mic-off-fill meetPageCamIcon2 stateMk" style="display:none" id="mkState${i.userId}"></i><span class="material-symbols-outlined audioIcon4 stateHead" style="display:none" id="headState${i.userId}">
                    headset_off
                </span>
                </div>
                    </div>
                    </div>
                `
            }
        }
    })
    return html
}
const videoWindow2 = (userId,un,style1,style2,style3)=>{
    console.log("klppl@l@l@")
    let html = `
        <div class="videoWindowMain firstVideo" id="2video:${userId}">
        <div class="videoWindowWarpp" id="3video:${userId}">
            <video id = "video:${userId}" class="videoMainWindow" muted="muted" width="600" height="500" autoplay></video>
        </div>
        <div class="videoWindowNameWarpp">
        <div class="videoNameSSS">
        <span class="videoWindowName">${un}</span><i class="ri-camera-off-fill meetPageCamIcon2 stateCam" style="display:none" id="camState${userId}"></i><i class="ri-mic-off-fill meetPageCamIcon2 stateMk" style="display:none" id="mkState${userId}"></i><span class="material-symbols-outlined audioIcon4 stateHead" style="display:none" id="headState${userId}">
        headset_off
    </span>
    </div>
        </div>
        </div>
    `
    return html
}