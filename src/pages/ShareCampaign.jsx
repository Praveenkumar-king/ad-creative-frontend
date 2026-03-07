import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API="http://localhost:8080/api";

export default function ShareCampaign(){

const {id}=useParams();

const [data,setData]=useState(null);

useEffect(()=>{

fetchCampaign();

},[]);

const fetchCampaign=async()=>{

const res=await axios.get(`${API}/campaign/share/${id}`);

setData(res.data);

};

if(!data){
return <p>Loading...</p>;
}

return(

<div style={{padding:"40px",textAlign:"center"}}>

<h1>AI Campaign</h1>

<img
src={`http://localhost:8080${data.imageUrl}`}
style={{width:"400px"}}
/>

<h3>{data.prompt}</h3>

<p>{data.caption}</p>

</div>

);

}