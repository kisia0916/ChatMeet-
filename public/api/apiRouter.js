const router = require("express").Router()
const UserToken = require("./models/UserIpTokenModule")
const {uuidv4} = require("uuid")
router.get("/givetoken",async(req,res)=>{
    const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    try{
        const isMyIp = await UserToken.find({userIp:userIP})
        if(!isMyIp){
            const token = uuidv4()
            const newuser = await new UserToken({
                userIp:userIP,
                token:token
            })
            newuser.save()
            console.log(newuser)
            return res.status(200).json({
                yourIp:userIP,
                token:token
            })
        }else{
            return res.status(400).json({mess:"finded your ip"})
        }
    }catch{
        return res.status(500).json("error")
    }
})
module.exports = router