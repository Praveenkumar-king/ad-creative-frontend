import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import API from "../config/api";


export default function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [stats,setStats] = useState(null);
  const [greeting,setGreeting] = useState("");
  const [time,setTime] = useState("");

  useEffect(()=>{

    fetchStats();
    setGreeting(getGreeting());
    updateClock();

    const timer = setInterval(updateClock,1000);

    return ()=>clearInterval(timer);

  },[]);

  const fetchStats = async ()=>{

    try{

      const res = await axios.get(
        `${API}/dashboard/stats`,
        {withCredentials:true}
      );

      setStats(res.data);

    }catch{

      console.log("Stats load failed");

    }

  };

  /* ======================
     GREETING
  ====================== */

  const getGreeting = ()=>{

    const hour = new Date().getHours();

    if(hour < 12) return "🌞 Good Morning";
    if(hour < 17) return "🌞 Good Afternoon";
    if(hour < 21) return "🌆 Good Evening";

    return "🌙 Good Night";

  };

  /* ======================
     LIVE CLOCK
  ====================== */

  const updateClock = ()=>{

    const now = new Date();

    const formattedTime = now.toLocaleTimeString("en-US",{
      hour:"numeric",
      minute:"2-digit",
      hour12:true
    });

    setTime(formattedTime);

  };

  if(!stats){
    return <p style={{padding:"40px"}}>Loading dashboard...</p>;
  }

  return(

    <div className="dashboard">

      <Sidebar/>

      <div className="content">

        {/* GRADIENT HEADER */}

        <div className="greetingHeader">

          <h2>
            Welcome, {user?.name || "User"}
            <span className="wave"> 👋</span>
          </h2>

          <p className="greetingLine">
            {greeting} <span className="dot">•</span> 🕒 {time}
          </p>

        </div>


        {/* TOP BUTTON */}

        <div className="topBar">

          <button
            onClick={()=>alert("Subscription coming soon 🚀")}
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
            onClick={()=>alert("Payment feature coming soon 🚀")}
          >
            Buy Credits
          </button>

        </div>


        {/* PLAN EXPIRY */}

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