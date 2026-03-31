import { useEffect,useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import "../styles/activity.css";
import API from "../config/api";
import { useAuth } from "../context/AuthContext";

export default function Activity(){

const { token } = useAuth();

const [logs,setLogs]=useState([]);
const [menuOpen,setMenuOpen]=useState(false);
const [error,setError]=useState("");

useEffect(()=>{
if(token){
  fetchLogs();
}
},[token]);

const fetchLogs=async()=>{
try{

const res=await axios.get(`${API}/activity`,{
  headers:{
    Authorization:`Bearer ${token}`
  }
});

setLogs(res.data);

}catch(err){

console.log("Activity error:",err?.response?.data);
setError("⚠️ Failed to load activity");

}
};

/* 🔐 ICON */

const getIcon=(action)=>{
if(action.toLowerCase().includes("login")) return "🔐";
if(action.toLowerCase().includes("logout")) return "🚪";
if(action.toLowerCase().includes("delete")) return "🗑";
return "⚡";
};

/* 💻 BROWSER */

const getBrowser=(ua)=>{

if(!ua) return "Unknown";

if(ua.includes("Chrome")) return "🌐 Chrome";
if(ua.includes("Edg")) return "🟦 Edge";
if(ua.includes("Firefox")) return "🦊 Firefox";
if(ua.includes("Safari")) return "🧭 Safari";

return "🌍 Browser";

};

/* 📍 LOCATION */

const getLocation=(ip)=>{
if(!ip) return "Unknown";

if(ip.startsWith("192") || ip.startsWith("127")) return "🏠 Localhost";
return "🌍 Internet";
};

/* 🎨 TYPE */

const getType=(action)=>{
if(action.toLowerCase().includes("delete")) return "danger";
if(action.toLowerCase().includes("login")) return "success";
if(action.toLowerCase().includes("logout")) return "warning";
return "";
};

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

<h2 className="activityTitle">Security Activity</h2>

{/* 🔥 ERROR */}
{error && <div className="toastError">{error}</div>}

{logs.length===0 && !error && <p>No activity yet</p>}

<div className="timeline">

{logs.map((log)=>(

<div
key={log._id}
className={`timelineItem ${getType(log.action)}`}
>

<div className="timelineDot">
{getIcon(log.action)}
</div>

<div className="timelineContent">

<div className="activityHeader">
<strong>{log.action}</strong>
<span className="time">
{new Date(log.createdAt).toLocaleString()}
</span>
</div>

<p>{log.ip}</p>

<p className="meta">
{getBrowser(log.userAgent)} • {getLocation(log.ip)}
</p>

</div>

</div>

))}

</div>

</div>

</div>

);

}