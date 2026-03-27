import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/subscription.css";

import API from "../config/api";

export default function Subscription(){

const buyPlan = async(planId)=>{

try{

const res = await axios.post(
`${API}/payment/create-order`,
{planId},
{withCredentials:true}
);

const options={

key:"RAZORPAY_KEY",

amount:res.data.amount,

order_id:res.data.orderId,

name:"Ad Creative",

description:`${res.data.plan.name} Plan`,

handler:async()=>{

await axios.post(
`${API}/payment/verify-payment`,
{planId},
{withCredentials:true}
);

alert("Subscription Activated 🎉");

window.location.reload();

}

};

const rzp = new window.Razorpay(options);

rzp.open();

}catch(err){

alert("Payment failed");

}

};

return(

<div className="dashboard">

<Sidebar/>

<div className="content">

<h1 className="planTitle">Subscription Plans</h1>

<div className="plansGrid">

{/* STARTER */}

<div className="planCard">

<h2>Starter</h2>

<h3>₹199</h3>

<ul>
<li>100 AI Credits</li>
<li>Basic AI Generation</li>
<li>Campaign History</li>
</ul>

<button onClick={()=>buyPlan("starter")}>
Choose Plan
</button>

</div>

{/* PRO */}

<div className="planCard popular">

<h2>Pro</h2>

<h3>₹499</h3>

<ul>
<li>300 AI Credits</li>
<li>Priority Generation</li>
<li>Advanced Analytics</li>
</ul>

<button onClick={()=>buyPlan("pro")}>
Choose Plan
</button>

</div>

{/* BUSINESS */}

<div className="planCard">

<h2>Business</h2>

<h3>₹999</h3>

<ul>
<li>800 AI Credits</li>
<li>Fast Generation</li>
<li>Premium Support</li>
</ul>

<button onClick={()=>buyPlan("business")}>
Choose Plan
</button>

</div>

</div>

</div>

</div>

);

}