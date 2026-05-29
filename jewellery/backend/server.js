const cors = require("cors");
const express = require("express") ;
const app = express();
app.use(cors())
app.use(express.json())
let otpStorage = {}
app.post("/send-otp",(req,res)=> {
    const phone = req.body.phone
    const generateOtp = Math.floor(1000+Math.random() * 9000).toString()
    otpStorage[phone] = generateOtp
    console.log(phone,generateOtp)
    res.json({
        message:"OTP Sent",
        otp:generateOtp
    })
})
app.get("/",(req,res) => {
    res.send("Backend Server hello")
})
app.listen(5000,() => {
    console.log("Server Started")
})