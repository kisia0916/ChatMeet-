const CapON = async()=>{

    let displayMediaOptions = {
        video: {
          cursor: "always"
        },
      }
    let myVideoWindow = document.getElementById("myVideo")
    try{
      if(camFlg){
          camChange()


      }
      let capStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
      capFLG = true
      myVideoWindow.srcObject = capStream
      camStream = capStream
      backStream = capStream
      let icon1 = document.querySelector(".screenOnIcon")
      let icon2 = document.querySelector(".screenOffIcon")
      icon1.style.display = "none"
      icon2.style.display = "block"
      if(firstFlg){
        sendState("cam",true)
        Socket.emit("camState",{userId:p2pID,roomId:roomId,flg:false})
        sendVideo(camStream)
      }
      capStream.getTracks()[0].addEventListener("ended",()=>{
        CapOFF()
      })
    }catch{}
}
const CapOFF = ()=>{
  let icon1 = document.querySelector(".screenOnIcon")
  let icon2 = document.querySelector(".screenOffIcon")
  icon1.style.display = "block"
  icon2.style.display = "none"
  capFLG = false
  if(camFlg){
    camChange()
  }else{
    camFlg = true
    camChange()
  }
}
const changeCap = ()=>{
  if(capFLG){
    CapOFF()
  }else{
    CapON()
  }
}