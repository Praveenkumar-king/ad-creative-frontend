import { useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/changePassword.css";
import "../styles/dashboard.css";
import API from "../config/api";

export default function ChangePassword(){

const [oldPassword,setOldPassword]=useState("");
const [newPassword,setNewPassword]=useState("");
const [confirm,setConfirm]=useState("");

const [otp,setOtp]=useState(["","","","","",""]);

const [timer,setTimer]=useState(0);
const [loading,setLoading]=useState(false);
const [success,setSuccess]=useState(false);

/* ✅ NEW */
const [menuOpen,setMenuOpen]=useState(false);

const inputs=useRef([]);

const [showOld,setShowOld]=useState(false);
const [showNew,setShowNew]=useState(false);
const [showConfirm,setShowConfirm]=useState(false);

/* PASSWORD STRENGTH */

const getStrength=()=>{

if(newPassword.length<6) return "weak";

if(/[A-Z]/.test(newPassword) && /\d/.test(newPassword))
return "strong";

return "medium";

};

/* SEND OTP */

const sendOTP=async()=>{

if(!oldPassword){
alert("Enter old password");
return;
}

try{

await axios.post(
`${API}/change-password/send-otp`,
{oldPassword},
{withCredentials:true}
);

alert("OTP sent to email ✅");

startTimer();

}catch(err){

alert(
err.response?.data?.error ||
"Failed to send OTP"
);

}

};

/* TIMER */

const startTimer=()=>{

setTimer(60);

const interval=setInterval(()=>{

setTimer((t)=>{
if(t<=1){
clearInterval(interval);
return 0;
}
return t-1;
});

},1000);

};

/* OTP */

const handleOtpChange=(value,index)=>{

if(!/^[0-9]?$/.test(value)) return;

const newOtp=[...otp];
newOtp[index]=value;
setOtp(newOtp);

if(value && index<5){
inputs.current[index+1].focus();
}

const code=newOtp.join("");

if(code.length===6){
verifyOTP(code);
}

};

/* VERIFY */

const verifyOTP=async(code)=>{

if(newPassword!==confirm){
alert("Passwords not match");
return;
}

try{

setLoading(true);

await axios.post(
`${API}/change-password/verify-otp`,
{ otp:code, newPassword },
{withCredentials:true}
);

setLoading(false);
setSuccess(true);

setTimeout(()=>{
window.location.href="/login";
},2500);

}catch(err){

setLoading(false);

alert(
err.response?.data?.error ||
"OTP verification failed"
);

}

};

/* SUCCESS PAGE */

if(success){
return(
<div className="successPage">
<div className="successBox">
<h2>🎉 Password Changed</h2>
<p>Your password has been updated successfully</p>
</div>
</div>
);
}

return(

<div className="dashboard">

{/* ✅ HAMBURGER */}
<button 
className="menuToggle"
onClick={()=>setMenuOpen(!menuOpen)}
>
☰
</button>

{/* ✅ SIDEBAR */}
<div className={`sidebarWrapper ${menuOpen ? "open" : ""}`}>
<Sidebar/>
</div>

<div className="content">

<div className="changePasswordPage">

<div className="changePasswordCard">

<h2>Change Password</h2>

<div className="inputBox">
<input
type={showOld?"text":"password"}
placeholder="Old Password"
value={oldPassword}
onChange={(e)=>setOldPassword(e.target.value)}
/>
<span onClick={()=>setShowOld(!showOld)}>
{showOld?"🙈":"👁"}
</span>
</div>

<div className="inputBox">
<input
type={showNew?"text":"password"}
placeholder="New Password"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
/>
<span onClick={()=>setShowNew(!showNew)}>
{showNew?"🙈":"👁"}
</span>
</div>

<p className={`strength ${getStrength()}`}>
Password Strength: {getStrength()}
</p>

<div className="inputBox">
<input
type={showConfirm?"text":"password"}
placeholder="Confirm Password"
value={confirm}
onChange={(e)=>setConfirm(e.target.value)}
/>
<span onClick={()=>setShowConfirm(!showConfirm)}>
{showConfirm?"🙈":"👁"}
</span>
</div>

<button
className="sendBtn"
onClick={sendOTP}
disabled={timer>0}
>
{timer>0 ? `Resend OTP (${timer}s)` : "Send OTP"}
</button>

<div className="otpContainer">
{otp.map((digit,index)=>(
<input
key={index}
ref={(el)=>inputs.current[index]=el}
value={digit}
onChange={(e)=>handleOtpChange(e.target.value,index)}
maxLength="1"
className="otpBox"
/>
))}
</div>

{loading && <div className="loader"></div>}

</div>

</div>

</div>

</div>

);

}