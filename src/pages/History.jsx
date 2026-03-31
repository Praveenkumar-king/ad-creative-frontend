import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";

import "../styles/dashboard.css";
import "../styles/history.css";

import API from "../config/api";
import { useAuth } from "../context/AuthContext";

export default function History(){

  const { token } = useAuth();

  const [history,setHistory] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");

  const [menuOpen,setMenuOpen] = useState(false);

  useEffect(()=>{
    if(token){
      loadHistory();
    }
  },[token]);

  const loadHistory = async ()=>{

    try{

      setError("");

      const res = await axios.get(
        `${API}/generate/history`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setHistory(res.data);

    }catch(err){

      console.log("History error:",err?.response?.data);
      setError("⚠️ Failed to load history");

    }finally{

      setLoading(false);

    }

  };

  const deleteCampaign = async (id)=>{

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this campaign?"
    );

    if(!confirmDelete) return;

    try{

      await axios.delete(
        `${API}/generate/campaign/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setHistory(
        history.filter(item => item._id !== id)
      );

    }catch(err){

      console.log("Delete error:",err?.response?.data);
      alert("Delete failed");

    }

  };

  if(loading){
    return(
      <div className="dashboard">

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
          <h1>Ad History</h1>
          <p>Loading history...</p>
        </div>

      </div>
    );
  }

  return(

    <div className="dashboard">

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

        <h1>Ad History</h1>

        {/* 🔥 ERROR */}
        {error && <div className="toastError">{error}</div>}

        {history.length === 0 ?(

          <p>No ads generated yet</p>

        ):(

          <div className="historyList">

            {history.map((item)=>{

              const date = new Date(item.createdAt)
              .toLocaleDateString("en-CA");

              return(

                <div key={item._id} className="historyCard">

                  {item.imageUrl && (

                    <img
                      src={`${API}${item.imageUrl}`}
                      alt="Ad"
                      className="historyImage"
                    />

                  )}

                  <h3>{item.prompt}</h3>

                  <p>{date}</p>

                  <button
                    className="deleteBtn"
                    onClick={()=>deleteCampaign(item._id)}
                  >
                    Delete Ad
                  </button>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>

  );

}