import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/gallery.css";
import "../styles/dashboard.css";
import API from "../config/api";
import { useAuth } from "../context/AuthContext";

export default function Gallery(){

const { token } = useAuth();

const [campaigns,setCampaigns] = useState([]);
const [menuOpen,setMenuOpen] = useState(false);
const [error,setError] = useState("");
const [loading,setLoading] = useState(true);

useEffect(()=>{
if(token){
  fetchCampaigns();
}
},[token]);

const fetchCampaigns = async()=>{

try{

setError("");

const res = await axios.get(
`${API}/campaign/my-campaigns`,
{
  headers:{
    Authorization:`Bearer ${token}`
  }
}
);

setCampaigns(res.data);
setLoading(false);

}catch(err){

console.log("Gallery error:",err?.response?.data);
setError("⚠️ Failed to load campaigns");
setLoading(false);

}

};

return(

<div className="dashboard">

{/* ☰ MENU */}
<button 
className="menuToggle"
onClick={()=>setMenuOpen(!menuOpen)}
>
☰
</button>

{/* SIDEBAR */}
<div className={`sidebarWrapper ${menuOpen ? "open" : ""}`}>
<Sidebar/>
</div>

<div className="content">

<h1 className="galleryTitle">
AI Campaign Gallery
</h1>

{/* 🔥 ERROR */}
{error && <div className="toastError">{error}</div>}

{/* 🔄 LOADING */}
{loading ? (
  <p style={{padding:"20px"}}>Loading campaigns...</p>
) : campaigns.length === 0 ? (
  <p>No campaigns yet</p>
) : (

<div className="galleryGrid">

{campaigns.map((item)=>(

<div key={item._id} className="galleryCard">

<img
src={`${API}${item.imageUrl}`}
alt="campaign"
/>

<div className="galleryInfo">

<h3>{item.prompt}</h3>

<p>{item.caption}</p>

<p className="date">
{new Date(item.createdAt).toDateString()}
</p>

<div className="galleryButtons">

<a
href={`${API}${item.imageUrl}`}
download
className="downloadBtn"
>
Download
</a>

<button
onClick={()=>{
navigator.clipboard.writeText(
`${window.location.origin}/campaign/${item._id}`
);
alert("Share link copied");
}}
className="downloadBtn"
>

Share

</button>

</div>

</div>

</div>

))}

</div>

)}

</div>

</div>

);

}