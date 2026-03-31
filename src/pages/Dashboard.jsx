import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import API from "../config/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {

  const { user, token } = useAuth();

  const [stats,setStats] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [greeting,setGreeting] = useState("");
  const [time,setTime] = useState("");

  const [menuOpen,setMenuOpen] = useState(false);

  useEffect(()=>{

    if(!token) return;

    fetchStats();
    setGreeting(getGreeting());
    updateClock();

    const clockTimer = setInterval(updateClock,1000);
    const statsTimer = setInterval(fetchStats,30000);

    return ()=>{
      clearInterval(clockTimer);
      clearInterval(statsTimer);
    };

  },[token]);

  const fetchStats = async ()=>{

    try{

      setError("");

      const res = await axios.get(
        `${API}/dashboard/stats`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setStats(res.data);
      setLoading(false);

    }catch(err){

      setLoading(false);
      setError("⚠️ Failed to load dashboard");

      console.log("Stats error:", err?.response?.data || err.message);

    }

  };

  const getGreeting = ()=>{

    const hour = new Date().getHours();

    if(hour < 12) return "🌞 Good Morning";
    if(hour < 17) return "🌞 Good Afternoon";
    if(hour < 21) return "🌆 Good Evening";

    return "🌙 Good Night";

  };

  const updateClock = ()=>{

    const now = new Date();

    const formattedTime = now.toLocaleTimeString("en-US",{
      hour:"numeric",
      minute:"2-digit",
      hour12:true
    });

    setTime(formattedTime);

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

      <div className={`sidebarWrapper ${menuOpen ? "open" : ""}`}>
        <Sidebar/>
      </div>

      <div className="content">

        {/* 🔥 ERROR */}
        {error && (
          <div className="toastError">
            {error}
          </div>
        )}

        {/* HEADER */}
        <div className="greetingHeader">

          <h2>
            Welcome, {user?.name || "User"}
            <span className="wave"> 👋</span>
          </h2>

          <p className="greetingLine">
            {greeting} <span className="dot">•</span> 🕒 {time}
          </p>

        </div>

        <div className="topBar">

          <button
            onClick={()=>alert("Subscription coming soon 🚀")}
            className="buyCreditsBtn"
          >
            Upgrade Plan
          </button>

        </div>

        {/* 🔥 LOADING */}
        {loading ? (
          <div className="skeletonGrid">
            {Array(6).fill().map((_,i)=>(
              <div key={i} className="skeletonCard"></div>
            ))}
          </div>
        ) : stats ? (

          <>
            <div className="creditsBox">

              <span>
                Credits Left: <b>{stats.creditsLeft}</b>
              </span>

              <button className="buyCreditsBtn">
                Buy Credits
              </button>

            </div>

            {stats.planExpire && (
              <div className="planExpireBox">
                Plan expires on: {new Date(stats.planExpire).toDateString()}
              </div>
            )}

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
          </>

        ) : (

          <p style={{padding:"20px"}}>No data available</p>

        )}

      </div>

    </div>

  );

}