const router = require("express").Router()
const UserToken = require("./models/UserIpTokenModule")
const {v4: uuidv4} = require("uuid")
const appFuns = require("../../app")
router.get("/givetoken",async(req,res)=>{
    try{
        let userIPList = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        userIPList = userIPList.split(",")
        const userIP = userIPList[0]
        console.log(userIP)
        const token = uuidv4()
        const isMyIp = await UserToken.find({userIp:userIP})
        if(isMyIp.length==0){
            const newuser = await new UserToken({
                userIp:userIP,
                token:token
            })
            newuser.save()
            console.log(newuser)
            return res.status(200).json({
                yourIp:userIP,
                token:token,
            })
        }else{
            await UserToken.updateOne({userIp:userIP},{
                token:token
            })
            return res.status(200).json({
                yourIp:userIP,
                token:token
            })
        }
    }catch(error){
        return res.status(500).json("error")
    }
})
router.post("/createroom",async(req,res)=>{
    try{
        const token = req.body.token
        const roomNamereq = req.body.roomname
        const maxUser = Number(req.body.maxuser)
        const isPublick = !req.body.ispublick
        if(token && roomNamereq && maxUser && isPublick != undefined){
            const tokenUser = await UserToken.findOne({token:token})
            if(tokenUser){
                const response = appFuns.createRoomApiFun(token,roomNamereq,maxUser,isPublick)
                return res.status(200).json(response)
            }else{
                return res.status(404).json("Invalid token")
            }
        }else{
            return res.status(400).json("no feed")
        }
    }catch(error){
        return res.status(500).json("error")

    }
})
module.exports = router