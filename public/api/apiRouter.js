const router = require("express").Router()
router.get("/givetoken",(req,res)=>{
    res.send("hello")
})
module.exports = router