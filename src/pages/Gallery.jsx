import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/gallery.css";
import API from "../config/api";

export default function Gallery(){

const [campaigns,setCampaigns] = useState([]);

useEffect(()=>{
fetchCampaigns();
},[]);

const fetchCampaigns = async()=>{

try{

const res = await axios.get(
`${API}/campaign/my-campaigns`,
{withCredentials:true}
);

setCampaigns(res.data);

}catch{

alert("Failed to load campaigns");

}

};

return(

<div className="dashboard">

<Sidebar/>

<div className="content">

<h1 className="galleryTitle">
AI Campaign Gallery
</h1>

<div className="galleryGrid">

{campaigns.map((item)=>(

<div key={item._id} className="galleryCard">

<img
src={`http://localhost:8080${item.imageUrl}`}
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
href={`http://localhost:8080${item.imageUrl}`}
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

</div>

</div>

);

}