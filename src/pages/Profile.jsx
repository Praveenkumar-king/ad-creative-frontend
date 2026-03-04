import { useEffect, useState } from "react";
import API from "../services/api";

export default function Profile(){

  const [user,setUser] = useState({});
  const [stats,setStats] = useState({
    ads:0,
    credits:120
  });

  useEffect(()=>{

    const loadProfile = async ()=>{

      try{

        const name = localStorage.getItem("name");

        setUser({
          name,
          email:"demo@user.com"
        });

        const history = await API.get("/generate/history");

        setStats({
          ads: history.data.length,
          credits:120
        });

      }catch(err){

        console.log(err);

      }

    };

    loadProfile();

  },[]);

  const logout = ()=>{

    localStorage.removeItem("token");
    localStorage.removeItem("name");

    window.location.href="/";

  };

  return(

    <div className="pageContainer">

      <div className="profileCard">

        <div className="avatar">
          {user.name?.charAt(0)}
        </div>

        <h2>{user.name}</h2>
        <p>{user.email}</p>

        <div className="stats">

          <div className="statBox">
            <h3>{stats.ads}</h3>
            <p>Ads Generated</p>
          </div>

          <div className="statBox">
            <h3>{stats.credits}</h3>
            <p>Credits Left</p>
          </div>

          <div className="statBox">
            <h3>2026</h3>
            <p>Member Since</p>
          </div>

        </div>

        <div className="profileActions">

          <button className="editBtn">
            Edit Profile
          </button>

          <button
            className="logoutBtn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  );

}