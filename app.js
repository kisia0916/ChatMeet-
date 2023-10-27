const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const io = require("socket.io")(server)
const ejs = require("ejs")
const body_pase = require("body-parser")
const session = require("express-session")
const fs = require("fs")
const path = require("path")
const { v4: uuidv4 } = require('uuid');

const indexPage = fs.readFileSync("./public/views/index.ejs","utf-8")
const mainPage = fs.readFileSync("./public/views/main.ejs","utf-8")
const callPage = fs.readFileSync("./public/views/call.ejs","utf-8")
const createPage = fs.readFileSync("./public/views/createRoom.ejs","utf-8")
const catchPage = fs.readFileSync("./public/views/catchPage.ejs","utf-8")
const joinPage = fs.readFileSync("./public/views/join.ejs","utf-8")
const notFound = fs.readFileSync("./public/views/notFound.ejs","utf-8")

const createData = require("./backSrc/createData")
const apiRouter = require("./public/api/apiRouter")

const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://fumiharuabe:20080916@cluster0.acrpymu.mongodb.net/chatmeetapi?retryWrites=true&w=majority").then(()=>console.log("connection DB")).catch((error)=>console.log(error))

let userList = []
let roomList = [ {
    roomId: 'f5934665-bf0d-4356-8777-6a9a25ed1000',
    roomName: 'seccamp23 Meet',
    host: '36019a51-1371-4d43-8521-76cde88c7a61',
    pass: 'aa',
    userList: [],
    public: true,
    icon:"/public/icons/icon1.png",
    maxPlayer:6
  }]


app.use(express.json())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
    httpOnly: true,
    secure: false,
    maxage: null
    }
  }))

app.use(body_pase.json());//////////////////////////////   ここ重要
app.use(body_pase.urlencoded({ extended: true }));//////
app.use(express.static(path.join(__dirname, "js")));
app.use("/public",express.static("public"))
function forceHttps(req, res, next){
    if (!process.env.PORT) {
      return next();
    };
  
    if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === "http") {
      res.redirect('https://' + req.headers.host + req.url);
    }else {
      return next();
    }
  };
  
app.all('*', forceHttps);

app.use("/api",apiRouter)
exports.createRoomApiFun = (token,roomName,max,private)=>{
    let co = 0
    roomList.forEach((i)=>{
        if(i.host == token){
            co+=1
        }
    })
    if(co == 0){
        if(max>=7){
            max = 6
        }
        let pass = "123"
        let createdRoomData = createData.createRoomData(token,pass,roomName,!private,max)
        roomList.push(createdRoomData)
        console.log(roomList)
        return {
            roomname:roomName,
            joinurl:`https://fumiapp.com/join/${createdRoomData.roomId}`
        }
    }else{
        return "Room can only be created"
    }
}
app.get("/",(req,res)=>{
    console.log("index")
    res.writeHead(302, {
        'Location': '/main'
    });
    res.end();
})

app.get("/joinset/:id",(req,res)=>{

    console.log("joinset")

})
app.get("/mkcall",(req,res)=>{
    try{
        if(!req.session.userId){
            req.session.userId = uuidv4()
        }
        let renderPage = ejs.render(createPage,{
            userId:req.session.userId
        })
        res.writeHead(200,{"Content-Type":"text/html"})
        res.write(renderPage)
        res.end()
    }catch(error){console.log(error)}
})
app.get("/join/:id",(req,res)=>{
    try{
        let roomFlg = false
        roomList.forEach((i)=>{
            if(i.roomId == req.params.id){
                roomFlg = true
            }
        })
        if(roomFlg){
            let roomId = req.params.id
            let userId = ""
            let roomName;
            roomList.forEach((i)=>{
                if(i.roomId == roomId){
                    roomName = i.roomName
                }
            })
            if(!req.session.userId){
                req.session.userId = uuidv4()
                userId = req.session.userId
            }else{
                userId = req.session.userId
            }
            req.session.callFlg = true
            console.log("gg")
            console.log(roomId)
            let renderPage = ejs.render(joinPage,{
                roomName:roomName,
                roomId:roomId,
                userId:userId
            })
            res.writeHead(200,{"Content-Type":"text/html"})
            res.write(renderPage)
            res.end()
        }else{
            res.writeHead(302, {
                'Location': '/main'
            });
            res.end();
        }
    }catch(error){console.log(error)}
})
app.get("/call/:id",(req,res)=>{
    try{
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        let isRoom = true
        let isPNum = true
        let room = null
        roomList.forEach((i)=>{
            if(i.roomId == req.params.id){
                room = i.userList
                if(i.userList.length>=i.maxPlayer){
                    isPNum = false
                }
            }
        })
        console.log(room)
        if(room){
            room.forEach((i)=>{
                if(i.userId == req.session.userId){
                    isRoom = false
                }
            })
        }
        if(req.session.userId && req.session.callFlg && isRoom && isPNum){
            req.session.callFlg = false
            let roomId = req.params.id
            console.log(roomId)
            let co = 0
            let roomName;
            roomList.forEach((i)=>{
                if(i.roomId == roomId){
                    roomName = i.roomName
                }
            })
            console.log("ggggggggggggg")
            console.log(roomList)
            roomList.forEach((i)=>{
                if(i.roomId == roomId){
                    co+=1
                }
            })
            if(co != 0){
                console.log("a")
                if(req.session.userId){
                    let renderPage = ejs.render(callPage,{
                        userId:req.session.userId,
                        roomId:roomId,
                        flg:false,
                        roomName:roomName
                    })
                    res.writeHead(200,{"Content-Type":"text/html"})
                    res.write(renderPage)
                    res.end()
                }else{
                    console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
                    req.session.userId = uuidv4()
                    let renderPage = ejs.render(callPage,{
                        userId:req.session.userId,
                        roomId:roomId,
                        flg:true
                    })
                    res.writeHead(200,{"Content-Type":"text/html"})
                    res.write(renderPage)
                    res.end()
                }
            }else{
                console.log("koxa")
                res.writeHead(302, {
                    'Location': '/main'
                });
                res.end();
            }
        }else{
            console.log("b")
            res.writeHead(302, {
                'Location': '/main'
            });
            res.end();
        }
    }catch(error){console.log(error)}
})
app.get("/catchpage",(req,res)=>{
    try{
        let renderPage = ejs.render(catchPage,{

        })
        res.writeHead(200,{"Content-Type":"text/html"})
        res.write(renderPage)
        res.end()
    }catch(error){console.log(error)}
})
app.get("/main",(req,res)=>{
    try{
        console.log(req.session.userId)
        if(!req.session.userId){
            req.session.userId = uuidv4()
        }
        let sendRoomList = roomList.map((i)=>{
            if(i.public){
                return i
            }
        })
        let renderPage = ejs.render(mainPage,{
            userId:req.session.userId,
        })
        res.writeHead(200,{"Content-Type":"text/html"})
        res.write(renderPage)
        res.end()
    }catch(error){console.log(error)}
}) 

app.use((req, res, next) => {
    let renderPage = ejs.render(notFound,{

    })
    res.writeHead(200,{"Content-Type":"text/html"})
    res.write(renderPage)
    res.end()
  });
io.on("connection",(socket)=>{
    let userId = ""
    let roomID = ""
    socket.on("createdSocketConnection",(data)=>{////////////////socketに接続したら最初はこの処理を行う
        try{
            socket.join(data.userId)
            userId = data.userId
            let co = 0
            userList.forEach((i)=>{
                if(i.userId == userId){
                    co+=1
                }
            })
            if(co == 0){
                console.log("debug")
                userList.push(createData.createUser(userId,data.page))
                console.log(userList)
            }
            if(data.page == "/main"){
                let publicRoomList = roomList.map((i)=>{
                    if(i.public || i.host == userId){
                        return i
                    }
                })
                publicRoomList.forEach((i,index)=>{
                    if(i == null){
                        publicRoomList.splice(index,1)
                    }
                })
                io.to(data.userId).emit("conMain",{roomList:publicRoomList})
            }
        }catch(error){console.log(error)}
    })
    socket.on("createRoom",(data)=>{
        try{
            let host = data.host
            let roomName = data.roomName
            let pass = data.pass
            let max = data.max
            let private = data.private
            let co = 0
            let userName = ""
            roomList.forEach((i)=>{
                if(i.host == userId){
                    co+=1
                }
            })
            if(co == 0){
                if(max>=7){
                    max = 6
                }
                roomList.push(createData.createRoomData(host,pass,roomName,!private,max))
                io.to(userId).emit("roomDatas",{id:roomList[roomList.length-1].roomId})
                console.log(roomList)
            }else{
                io.to(userId).emit("createError","error1")
            }
        }catch(error){console.log(error)}
    })
    socket.on("connectionMeet",(data)=>{
        try{
            console.log("debug23")
            console.log(data.roomId)
            io.to(data.roomId).emit("joinUser",{userId:userId,listData:createData.createRoomUser(data.roomId,userId,userName,null)})
            socket.join(data.roomId)
            userList.forEach((i)=>{
                if(i.userId == userId){
                    i.page = `/call/${data.roomId}`
                }
                console.log(userList)
            })
            roomList.forEach((i)=>{
                if(i.roomId == data.roomId){
                    roomID = data.roomId
                    i.userList.push(createData.createRoomUser(data.roomId,userId,userName,null))
                    console.log(i.userList)
                    io.to(userId).emit("setUserNew",{userId:userId,userList:i.userList})
                }
            })
        }catch(error){console.log(error)}
    })
    socket.on("camState",(data)=>{
        try{
            let userId = data.userId
            let roomId = data.roomId
            if(data.flg){
                io.to(roomId).emit("camState",{userId:data.userId,flg:true})
            }else{
                io.to(roomId).emit("camState",{userId:data.userId,flg:false})
            }
        }catch(error){console.log(error)}
    })
    socket.on("mikeState",(data)=>{
        
    })
    socket.on("joinUser",(data)=>{
        try{
            userName = data.userName
            io.to(userId).emit("moveCall",{})
        }catch(error){console.log(error)}
    })
    socket.on("soundAudio",(data)=>{
        
    })
    socket.on("mediaState",(data)=>{
        console.log("socketlllllll")
        try{
            console.log(data.roomId)
            io.to(data.roomId).emit("mediaChange",data)
        }catch(error){console.log(error)}
    })
    socket.on("sendMedias",(data)=>{
        try{
            io.to(roomID).emit("sendMediaReturn",data)
        }catch(error){console.log(error)}
    })
    socket.on("sendMedias2",(data)=>{
        try{
            io.to(data.userId).emit("sendMediaReturn",data)
        }catch(error){console.log(error)}
    })
    socket.on("disconnect",()=>{
        roomId = ""
        try{
            userList.forEach((i,index)=>{
                if(i.userId == userId){
                    userList.splice(index,1)
                    console.log(userList)
                }
            })
            if(roomID){
                roomList.forEach((i,index)=>{
                    if(i.roomId == roomID){
                        i.userList.forEach((h,index2)=>{
                            if(h.userId == userId){
                                i.userList.splice(index2,1)
                                
                                console.log(i.userList)
                                if(i.userList.length<=0){
                                    roomList.splice(index,1)
                                    console.log(roomList)
                                }else{
                                    io.to(i.roomId).emit("userDiscon",{data:userId})
                                }
                            }
                        })
                    }
                })
            }
        }catch(error){console.log(error)}
    })
        // console.log("aaasasa")
        // console.log(roomList)
})
server.listen(process.env.PORT||3000,()=>{
    console.log("server run")
})