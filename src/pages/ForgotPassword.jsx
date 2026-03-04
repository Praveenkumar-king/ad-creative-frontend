import { useState } from "react";
import API from "../services/api";

export default function ForgotPassword(){

  const [email,setEmail] = useState("");

  const send = async ()=>{

    try{

      await API.post("/auth/forgot-password",{email});
      alert("Reset email sent");

    }catch(err){

      alert(err.response?.data?.error);

    }

  };

  return(

    <div className="authPage">

      <div className="authCard">

        <h2>Forgot Password</h2>

        <input
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button onClick={send}>
          Send Reset Link
        </button>

      </div>

    </div>

  );

}