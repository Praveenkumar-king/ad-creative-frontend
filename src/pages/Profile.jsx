import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import "../styles/profile.css";

const API_BASE = "http://localhost:8080/api";

export default function Profile(){

const [user,setUser] = useState(null);
const [stats,setStats] = useState(null);
const [loading,setLoading] = useState(true);

/* DELETE MODAL STATE */
const [showDeleteModal,setShowDeleteModal] = useState(false);
const [deletePassword,setDeletePassword] = useState("");

useEffect(()=>{
loadData();
},[]);

const loadData = async ()=>{

try{

const profileRes = await axios.get(
`${API_BASE}/user/profile`,
{withCredentials:true}
);

const statsRes = await axios.get(
`${API_BASE}/dashboard/stats`,
{withCredentials:true}
);

setUser(profileRes.data);
setStats(statsRes.data);

}catch(err){

console.error(err);
alert("Failed to load profile");

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
`${API_BASE}/avatar/upload`,
formData,
{withCredentials:true}
);

loadData();

}catch{

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
`${API_BASE}/account/delete-account`,
{password:deletePassword},
{withCredentials:true}
);

alert("Account deleted successfully");

localStorage.clear();

window.location.href="/";

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

<Sidebar/>

<div className="content">

<div className="profileCard">

{/* PROFILE HEADER */}

<div className="profileHeader">

<div className="avatar">

{user.avatar ? (
<img
src={`http://localhost:8080${user.avatar}`}
alt="avatar"
style={{
width:"60px",
height:"60px",
borderRadius:"50%",
objectFit:"cover"
}}
/>
) : (
"👤"
)}

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

{/* AVATAR UPLOAD */}

<div style={{marginBottom:"20px"}}>

<input
type="file"
accept="image/*"
onChange={uploadAvatar}
/>

</div>

{/* PROFILE STATS */}

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

{/* PROFILE DETAILS */}

<div className="profileDetails">

<p><b>Role:</b> User</p>

{user.isVerified && (
<p>✔ Email verified and secured</p>
)}

{/* ACTION BUTTONS */}

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

{/* DELETE ACCOUNT MODAL */}

{showDeleteModal && (

<div className="deleteModalOverlay">

<div className="deleteModal">

<h3>Delete Account</h3>

<p>
Enter your password to permanently delete your account.
</p>

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