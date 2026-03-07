import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

const API_BASE = "http://localhost:8080/api";

export default function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [stats,setStats] = useState(null);

  useEffect(()=>{
    fetchStats();
  },[]);

  const fetchStats = async ()=>{

    try{

      const res = await axios.get(
        `${API_BASE}/dashboard/stats`,
        {withCredentials:true}
      );

      setStats(res.data);

    }catch{

      console.log("Stats load failed");

    }

  };

  /* ======================
     RAZORPAY BUY CREDITS
  ====================== */

  const buyCredits = async () => {

    try{

      const res = await axios.post(
        `${API_BASE}/payment/create-order`,
        {},
        {withCredentials:true}
      );

      const options = {

        key:"RAZORPAY_KEY",

        amount:res.data.amount,

        currency:"INR",

        name:"AdVantage Gen",

        description:"Buy AI Credits",

        order_id:res.data.id,

        handler:function(response){

          alert("Payment Successful 🎉");

          fetchStats();

        },

        theme:{
          color:"#6366f1"
        }

      };

      const rzp = new window.Razorpay(options);

      rzp.open();

    }catch(err){

      alert("Payment failed");

    }

  };

  if(!stats){
    return <p style={{padding:"40px"}}>Loading dashboard...</p>;
  }

  return(

    <div className="dashboard">

      <Sidebar/>

      <div className="content">

        {/* WELCOME */}

        <div className="topBar">

          <h2>Welcome, {user?.name || "User"}</h2>

          {/* NEW UPGRADE PLAN BUTTON */}

          <button
            onClick={()=>window.location.href="/subscription"}
            className="buyCreditsBtn"
          >
            Upgrade Plan
          </button>

        </div>


        {/* CREDITS BOX */}

        <div className="creditsBox">

          <span>
            Credits Left: <b>{stats.creditsLeft}</b>
          </span>

          <button
            className="buyCreditsBtn"
            onClick={buyCredits}
          >
            Buy Credits
          </button>

        </div>


        {/* PLAN EXPIRY COUNTDOWN */}

        {stats.planExpire && (

          <div className="planExpireBox">

            Plan expires on: {new Date(stats.planExpire).toDateString()}

          </div>

        )}


        {/* STATS */}

        <div className="statsGrid">

          <div className="statCard">
            <h3>{stats.adsGenerated}</h3>
            <p>Ads Generated</p>
          </div>

          <div className="statCard">
            <h3>{stats.creditsLeft}</h3>
            <p>Credits Left</p>
          </div>

          <div className="statCard">
            <h3>{stats.adsToday}</h3>
            <p>Ads Today</p>
          </div>

          <div className="statCard">
            <h3>{stats.adsMonth}</h3>
            <p>This Month</p>
          </div>

          <div className="statCard">
            <h3>{stats.mostUsedTone}</h3>
            <p>Most Used Tone</p>
          </div>

          <div className="statCard">
            <h3>{stats.mostUsedSize}</h3>
            <p>Most Used Size</p>
          </div>

        </div>

      </div>

    </div>

  );

}