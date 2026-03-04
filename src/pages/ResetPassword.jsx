import { useParams } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

export default function ResetPassword(){

  const { token } = useParams();

  const [password,setPassword] = useState("");

  const reset = async ()=>{

    try{

      await API.post(`/auth/reset-password/${token}`,{
        password
      });

      alert("Password Reset Successful");

    }catch(err){

      alert(err.response?.data?.error);

    }

  };

  return(

    <div className="authPage">

      <div className="authCard">

        <h2>Reset Password</h2>

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

  );

}