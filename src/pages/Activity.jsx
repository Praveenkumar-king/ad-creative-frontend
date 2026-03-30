import { useEffect,useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import "../styles/activity.css";
import API from "../config/api";

export default function Activity(){

const [logs,setLogs]=useState([]);
const [menuOpen,setMenuOpen]=useState(false);

useEffect(()=>{
fetchLogs();
},[]);

const fetchLogs=async()=>{
try{
const res=await axios.get(`${API}/activity`,{withCredentials:true});
setLogs(res.data);
}catch{
alert("Failed to load activity");
}
};

/* 🔐 ICON */

const getIcon=(action)=>{
if(action.toLowerCase().includes("login")) return "🔐";
if(action.toLowerCase().includes("logout")) return "🚪";
if(action.toLowerCase().includes("delete")) return "🗑";
return "⚡";
};

/* 💻 BROWSER DETECTION */

const getBrowser=(ua)=>{

if(!ua) return "Unknown";

if(ua.includes("Chrome")) return "🌐 Chrome";
if(ua.includes("Edg")) return "🟦 Edge";
if(ua.includes("Firefox")) return "🦊 Firefox";
if(ua.includes("Safari")) return "🧭 Safari";

return "🌍 Browser";

};

/* 📍 SIMPLE LOCATION (FAKE STYLE FROM IP) */

const getLocation=(ip)=>{
if(!ip) return "Unknown";

/* just for UI look 😎 */
if(ip.startsWith("192") || ip.startsWith("127")) return "🏠 Localhost";
return "🌍 Internet";
};

/* 🎨 COLOR */

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

{logs.length===0 && <p>No activity yet</p>}

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