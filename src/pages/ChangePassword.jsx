import { useState, useRef } from "react";
import axios from "axios";
import "../styles/changePassword.css";

const API="http://localhost:8080/api/change-password";

export default function ChangePassword(){

const [oldPassword,setOldPassword]=useState("");
const [newPassword,setNewPassword]=useState("");
const [confirm,setConfirm]=useState("");

const [otp,setOtp]=useState(["","","","","",""]);

const [timer,setTimer]=useState(0);
const [loading,setLoading]=useState(false);
const [success,setSuccess]=useState(false);

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

try{

await axios.post(
`${API}/send-otp`,
{oldPassword},
{withCredentials:true}
);

alert("OTP sent to email");

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


/* OTP INPUT */

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


/* VERIFY OTP */

const verifyOTP=async(code)=>{

if(newPassword!==confirm){
alert("Passwords not match");
return;
}

try{

setLoading(true);

await axios.post(
`${API}/verify-otp`,
{
otp:code,
newPassword
},
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

<div className="changePasswordPage">

<div className="changePasswordCard">

<h2>Change Password</h2>


{/* OLD PASSWORD */}

<div className="inputBox">

<input
type={showOld?"text":"password"}
placeholder="Old Password"
onChange={(e)=>setOldPassword(e.target.value)}
/>

<span onClick={()=>setShowOld(!showOld)}>
{showOld?"🙈":"👁"}
</span>

</div>


{/* NEW PASSWORD */}

<div className="inputBox">

<input
type={showNew?"text":"password"}
placeholder="New Password"
onChange={(e)=>setNewPassword(e.target.value)}
/>

<span onClick={()=>setShowNew(!showNew)}>
{showNew?"🙈":"👁"}
</span>

</div>


<p className={`strength ${getStrength()}`}>
Password Strength: {getStrength()}
</p>


{/* CONFIRM PASSWORD */}

<div className="inputBox">

<input
type={showConfirm?"text":"password"}
placeholder="Confirm Password"
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


{/* OTP BOXES */}

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

);

}