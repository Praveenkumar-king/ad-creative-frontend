import { useEffect,useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import API from "../config/api";

export default function Activity(){

const [logs,setLogs]=useState([]);

useEffect(()=>{

fetchLogs();

},[]);

const fetchLogs=async()=>{

try{

const res=await axios.get(
`${API}/activity`,
{withCredentials:true}
);

setLogs(res.data);

}catch{

alert("Failed to load activity");

}

};

return(

<div className="dashboard">

<Sidebar/>

<div className="content">

<h2>Security Activity</h2>

{logs.length===0 && <p>No activity yet</p>}

{logs.map((log)=>(
<div
key={log._id}
className="historyItem"
>

<div>

<strong>{log.action}</strong>

<p>{log.ip}</p>

<p>{log.userAgent}</p>

</div>

<div>

{new Date(log.createdAt).toLocaleString()}

</div>

</div>
))}

</div>

</div>

);

}