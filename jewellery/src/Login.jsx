import { useState } from "react"
import axios from "axios"
import "./Login.css"

function Login() {
    const [phone,SetPhone] = useState("")
    const [message,SetMessage] = useState("")
    const [showOTP, setShowOTP] = useState(false)
    const [otp,setOtp] = useState("") 
    const [backendOTP, SetBackendOTP] = useState("")

    function handleOTP() {
        if(phone.length === 10) {
            setShowOTP(true)
            SetMessage("OTP Sent Sucessfully");
            axios.post("http://localhost:5000/send-otp",{
                phone:phone
            })
            .then((response)=> {
                console.log(response.data)
                SetBackendOTP(response.data.otp)
            })
            

        } else {
            setShowOTP(false)
            SetMessage("Enter Correct Number");
        }

     
    }
    function submitOTP() {
        if (otp === backendOTP) {
            alert("Login Sucess")
        } else {
            alert("Invalid Otp")
        }
    }
    function resendOTP() {
                   axios.post("http://localhost:5000/send-otp",{
                    phone:phone
                   })
            .then((response)=> {
                console.log(response.data)
                SetBackendOTP(response.data.otp)
                alert("OTP Resent")

    })
}
  return (
    <div className="login-container">
        <div className="login-card">
            <h1 className="title">kundanam jewellery</h1>
            <h3>Welcome!</h3>
            <form>
                   <label>Enter your Mobile Number </label><br/>
                <input className="phone-input" type="tel" placeholder="Enter mobile number" maxLength="10" value={phone} onChange={(e)=>{
                   
                    SetPhone(e.target.value)
                    SetMessage("")}} />
                    <p>{message}</p>

            </form>
            {
                !showOTP && (
                <button className="otp-button" onClick={handleOTP}>Send OTP</button>
            )
            } 
                {
                    showOTP &&(
                        <div className = "otp-section">
                        <input className = "otp-input" type="text" placeholder="Enter OTP" maxLength={6} value={otp} onChange={(e)=>setOtp(e.target.value)} />
                        <div className="otp-actions">
                        <button className="resend-btn"onClick={resendOTP}>Resend OTP</button>
                        <button className="submit-btn"onClick={submitOTP}>Submit OTP</button>
                        </div>
                        </div>
                    )
                }
            <p>By continuing,your agree to our</p>
            <p>Terms & Privacy Policy </p>
         


        </div>
    </div>
  )
}

export default Login