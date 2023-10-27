const mongoose = require("mongoose")
const userTokenSchma = new mongoose.Schema({
    userIp:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("UserToken",userTokenSchma)
