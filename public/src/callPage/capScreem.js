const CapON = async()=>{
    let displayMediaOptions = {
        video: {
          cursor: "always"
        },
      }
    let myVideoWindow = document.getElementById("myVideo")
    try{
      if(camFlg){
        console.log("tsetestet23f2")
          camChange()
      }
      let capStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
      capFLG = true
      myVideoWindow.srcObject = capStream
      camStream = capStream
    }catch{}
}
const CapOFF = ()=>{
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