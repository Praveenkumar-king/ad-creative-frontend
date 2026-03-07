import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

export default function ResetPassword(){

  const { token } = useParams();

  const navigate = useNavigate();

  const [password,setPassword] = useState("");

  const reset = async () => {

    try{

      await API.post(`/auth/reset-password/${token}`,{
        password
      });

      alert("Password reset successful");

      navigate("/login");

    }catch(err){

      alert(err.response?.data?.error || "Reset failed");

    }

  };

  return(

    <div className="authPage">

      <div className="leftHero">

        <h1>Reset Password</h1>

        <p>
          Enter your new password
        </p>

      </div>


      <div className="authCard">

        <div>

          <h2>Create New Password</h2>

          <input
            type="password"
            placeholder="New Password"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button onClick={reset}>
            Reset Password
          </button>

        </div>

      </div>

    </div>

  );

}