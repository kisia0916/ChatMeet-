// const createRoomData = (host,pass)=>{
//     let roomId = "test"
//     return {roomId:roomId,host:host,pass:pass,userList:[]}
// }   
// const createUserData = (userId,state)=>{
//     return {userId:userId,state:state}
// }
// const createRoomUser = (roomId,userId,name,state)=>{
//     return {roomId:roomId,userId:userId,name:name,state:state}
// }
const { v4: uuidv4 } = require('uuid');

module.exports = {
    createRoomData:function(host,pass,name,public,max){
        let iconNum = Math.floor(Math.random()*15)
        console.log(iconNum)
        let roomId = uuidv4()
        return {roomId:roomId,roomName:name,host:host,pass:pass,userList:[],public:public,icon:`/public/icons/icon${iconNum}.png`,maxPlayer:max}
    },
    createUser:function(userId,page){
        return {userId:userId,page:page}
    },
    createRoomUser:function(roomId,userId,name,state){
        return {roomId:roomId,userId:userId,name:name,state:state}
    },
    test:function(){
        console.log("tset")
    }
}