import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";

import "../styles/dashboard.css";
import "../styles/history.css";

const API = "http://localhost:8080/api";

export default function History(){

  const [history,setHistory] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    loadHistory();

  },[]);


  const loadHistory = async ()=>{

    try{

      const res = await axios.get(
        `${API}/generate/history`,
        {withCredentials:true}
      );

      setHistory(res.data);

    }catch(err){

      console.error(err);
      alert("Failed to load history");

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
        {withCredentials:true}
      );

      setHistory(
        history.filter(item => item._id !== id)
      );

    }catch(err){

      console.error(err);
      alert("Delete failed");

    }

  };


  if(loading){
    return(
      <div className="dashboard">
        <Sidebar/>
        <div className="content">
          <h1>Ad History</h1>
          <p>Loading history...</p>
        </div>
      </div>
    );
  }


  return(

    <div className="dashboard">

      <Sidebar/>

      <div className="content">

        <h1>Ad History</h1>

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
                      src={item.imageUrl}
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