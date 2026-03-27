import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/generator.css";
import "../styles/dashboard.css";
import API from "../config/api";

export default function Generator(){

const [prompt,setPrompt]=useState("");
const [voice,setVoice]=useState("Professional");

const [loading,setLoading]=useState(false);
const [progress,setProgress]=useState(0);

const [result,setResult]=useState(null);
const [typedCaption,setTypedCaption]=useState("");

/* ========================
   TYPING ANIMATION
======================== */

const typeCaption=(text)=>{

let index=0;

setTypedCaption("");

const interval=setInterval(()=>{

setTypedCaption((prev)=>prev+text.charAt(index));

index++;

if(index>=text.length){
clearInterval(interval);
}

},25);

};

/* ========================
   GENERATE AD
======================== */

const generateAd = async()=>{

if(!prompt.trim()){
alert("Enter prompt");
return;
}

setLoading(true);
setProgress(10);

const timer=setInterval(()=>{
setProgress((p)=>{
if(p>=90) return p;
return p+10;
});
},500);

try{

const res=await axios.post(
`${API}/generate`,
{prompt,voice},
{withCredentials:true}
);

clearInterval(timer);
setProgress(100);

setResult(res.data);

typeCaption(res.data.caption);

}catch(err){

console.error(err);
alert("Generation failed");

}finally{

setLoading(false);

}

};

/* ========================
   DOWNLOAD POSTER
======================== */

const downloadPoster=()=>{

if(!result?.imageUrl) return;

const filename=result.imageUrl.split("/").pop();

window.open(`${API}/generate/download/${filename}`);

};

/* ========================
   COPY AI CAPTION
======================== */

const copyCaption=()=>{

if(!result?.caption) return;

navigator.clipboard.writeText(result.caption);

alert("Caption copied");

};

return(

<div className="dashboard">

<Sidebar/>

<div className="content">

<div className="generatorMain">

{/* LEFT PANEL */}

<div className="generatorLeft">

<h2>Create Campaign</h2>

<textarea
placeholder="Describe your ad idea..."
value={prompt}
onChange={(e)=>setPrompt(e.target.value)}
/>

<h3>Brand Voice</h3>

<div className="voiceOptions">

<button onClick={()=>setVoice("Witty")}>Witty</button>
<button onClick={()=>setVoice("Professional")}>Professional</button>
<button onClick={()=>setVoice("Inspirational")}>Inspirational</button>
<button onClick={()=>setVoice("Urgent")}>Urgent</button>

</div>

<button className="generateBtn" onClick={generateAd}>
Generate Ad
</button>

{result && (

<button
className="regenBtn"
onClick={generateAd}
>
Regenerate
</button>

)}

{loading && (

<div className="progressContainer">

<div
className="progressBar"
style={{width:`${progress}%`}}
></div>

<p>Generating AI Creative...</p>

</div>

)}

</div>


{/* RIGHT PANEL */}

<div className="generatorRight">

<h3>Preview</h3>

<div className="previewBox">

{result?.imageUrl ? (

<img
src={`http://localhost:8080${result.imageUrl}`}
className="previewImage"
alt="Generated Poster"
/>

):(

<p className="placeholder">
Image preview will appear here
</p>

)}

</div>


<h3>AI Copy</h3>

<div className="copyBox">

{result?.caption ? (

<div className="captionText">
{typedCaption}
</div>

):(

<p className="placeholder">
Your generated ad copy will appear here.
</p>

)}

</div>


{/* BUTTONS */}

{result?.imageUrl && (

<div className="generatorButtons">

<button
className="downloadBtn"
onClick={downloadPoster}
>
Download Poster
</button>

<button
className="copyBtn"
onClick={copyCaption}
>
Copy Caption
</button>

</div>

)}

</div>

</div>

</div>

</div>

);

}