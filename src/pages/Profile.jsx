import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import "../styles/profile.css";
import API from "../config/api";
import { useAuth } from "../context/AuthContext";

export default function Profile(){

const { user: authUser, token, logout } = useAuth();

const [user,setUser] = useState(null);
const [stats,setStats] = useState(null);
const [loading,setLoading] = useState(true);
const [error,setError] = useState("");

const [showDeleteModal,setShowDeleteModal] = useState(false);
const [deletePassword,setDeletePassword] = useState("");

const [menuOpen,setMenuOpen] = useState(false);

useEffect(()=>{
if(token){
  loadData();
}
},[token]);

const loadData = async ()=>{

try{

setError("");

const profileRes = await axios.get(
`${API}/user/profile`,
{
  headers:{
    Authorization:`Bearer ${token}`
  }
}
);

const statsRes = await axios.get(
`${API}/dashboard/stats`,
{
  headers:{
    Authorization:`Bearer ${token}`
  }
}
);

setUser(profileRes.data);
setStats(statsRes.data);

}catch(err){

console.log("Profile error:",err?.response?.data);
setError("⚠️ Failed to load profile");

}finally{

setLoading(false);

}

};

/* AVATAR UPLOAD */

const uploadAvatar = async (e)=>{

const formData = new FormData();
formData.append("avatar",e.target.files[0]);

try{

await axios.post(
`${API}/avatar/upload`,
formData,
{
  headers:{
    Authorization:`Bearer ${token}`
  }
}
);

loadData();

}catch(err){

console.log("Avatar error:",err?.response?.data);
alert("Avatar upload failed");

}

};

/* DELETE ACCOUNT */

const deleteAccount = async ()=>{

if(!deletePassword){
alert("Enter password");
return;
}

try{

await axios.post(
`${API}/account/delete-account`,
{password:deletePassword},
{
  headers:{
    Authorization:`Bearer ${token}`
  }
}
);

alert("Account deleted successfully");

logout(); // 🔥 clean logout

}catch(err){

alert(
err.response?.data?.error ||
"Delete account failed"
);

}

};

if(loading){
return <div className="content">Loading...</div>;
}

if(!user){
return <div className="content">Profile not found</div>;
}

const joinedDate = new Date(user.createdAt)
.toLocaleString("en-US",{month:"short",year:"numeric"});

return(

<div className="dashboard">

<button 
className="menuToggle"
onClick={()=>setMenuOpen(!menuOpen)}
>
☰
</button>

<div className={`sidebarWrapper ${menuOpen ? "open" : ""}`}>
<Sidebar/>
</div>

<div className="content">

{/* 🔥 ERROR */}
{error && <div className="toastError">{error}</div>}

<div className="profileCard">

<div className="profileHeader">

<div className="avatar">

{user.avatar ? (
<img
src={`${API}${user.avatar}`}
alt="avatar"
style={{
width:"60px",
height:"60px",
borderRadius:"50%",
objectFit:"cover"
}}
/>
) : ("👤")}

</div>

<div className="profileInfo">
<h2>{user.name}</h2>
<p>{user.email}</p>
</div>

{user.isVerified && (
<span className="verified">
✔ Verified
</span>
)}

</div>

<div style={{marginBottom:"20px"}}>
<input
type="file"
accept="image/*"
onChange={uploadAvatar}
/>
</div>

<div className="profileStats">

<div className="statBox">
<h3>{stats?.adsGenerated || 0}</h3>
<p>Ads Generated</p>
</div>

<div className="statBox">
<h3>{stats?.creditsLeft || 0}</h3>
<p>Credits Left</p>
</div>

<div className="statBox">
<h3>{joinedDate}</h3>
<p>Member Since</p>
</div>

</div>

<div className="profileDetails">

<p><b>Role:</b> {authUser?.role || "User"}</p>

{user.isVerified && (
<p>✔ Email verified and secured</p>
)}

<div className="profileActions">

<button
className="changePassBtn"
onClick={()=>window.location.href="/change-password"}
>
Change Password
</button>

<button
className="deleteBtn"
onClick={()=>setShowDeleteModal(true)}
>
Delete Account
</button>

</div>

</div>

</div>

</div>

{/* DELETE MODAL */}

{showDeleteModal && (

<div className="deleteModalOverlay">

<div className="deleteModal">

<h3>Delete Account</h3>

<p>Enter your password to permanently delete your account.</p>

<input
type="password"
placeholder="Enter password"
value={deletePassword}
onChange={(e)=>setDeletePassword(e.target.value)}
/>

<div className="deleteActions">

<button
className="cancelBtn"
onClick={()=>setShowDeleteModal(false)}
>
Cancel
</button>

<button
className="confirmDeleteBtn"
onClick={deleteAccount}
>
Delete
</button>

</div>

</div>

</div>

)}

</div>

);

}