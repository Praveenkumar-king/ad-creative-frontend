import { useEffect,useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import API from "../config/api";

export default function AdminDashboard(){

const [stats,setStats]=useState(null);

useEffect(()=>{
fetchStats();
},[]);

const fetchStats = async ()=>{

try{

const res = await axios.get(
`${API}/admin-dashboard/stats`,
{withCredentials:true}
);

setStats(res.data);

}catch{

alert("Admin access required");

}

};

if(!stats){
return <p style={{padding:"40px"}}>Loading admin dashboard...</p>;
}

return(

<div className="dashboard">

<Sidebar/>

<div className="content">

<h2>Admin Dashboard</h2>

<div className="statsGrid">

<div className="statCard">
<h3>{stats.totalUsers}</h3>
<p>Total Users</p>
</div>

<div className="statCard">
<h3>{stats.totalCampaigns}</h3>
<p>Total Campaigns</p>
</div>

<div className="statCard">
<h3>{stats.activeSubscriptions}</h3>
<p>Active Subscriptions</p>
</div>

<div className="statCard">
<h3>₹{stats.revenue}</h3>
<p>Revenue</p>
</div>

</div>

</div>

</div>

);

}