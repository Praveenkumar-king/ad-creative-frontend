import { useEffect,useState } from "react";
import axios from "axios";

const API="http://localhost:8080/api";

export default function Devices(){

const [devices,setDevices]=useState([]);

useEffect(()=>{

fetchDevices();

},[]);

const fetchDevices=async()=>{

const res=await axios.get(
`${API}/device`,
{withCredentials:true}
);

setDevices(res.data);

};

const logoutOthers=async()=>{

await axios.delete(
`${API}/device/logout-others`,
{withCredentials:true}
);

alert("Other devices logged out");

};

return(

<div>

<h2>Active Devices</h2>

{devices.map((d)=>(

<div key={d._id}>

<p>{d.ip}</p>

<p>{d.userAgent}</p>

</div>

))}

<button onClick={logoutOthers}>

Logout Other Devices

</button>

</div>

);

}