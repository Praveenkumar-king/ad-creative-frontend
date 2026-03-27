import { useEffect,useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import API from "../config/api";

export default function Admin(){

const [users,setUsers]=useState([]);
const [campaigns,setCampaigns]=useState([]);

useEffect(()=>{
fetchData();
},[]);

const fetchData = async ()=>{

const u = await axios.get(
`${API}/admin/users`,
{withCredentials:true}
);

const c = await axios.get(
`${API}/admin/campaigns`,
{withCredentials:true}
);

setUsers(u.data);
setCampaigns(c.data);

};

return(

<div className="dashboard">

<Sidebar/>

<div className="content">

<h2>Admin Panel</h2>

<h3>Users</h3>

{users.map(u=>(

<p key={u._id}>
{u.name} - {u.email}
</p>

))}

<h3>Campaigns</h3>

{campaigns.map(c=>(

<p key={c._id}>
{c.prompt}
</p>

))}

</div>

</div>

);

}