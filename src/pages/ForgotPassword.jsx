import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

export default function ForgotPassword(){

  const [email,setEmail] = useState("");

  const sendReset = async () => {

    try{

      await API.post("/auth/forgot-password",{ email });

      alert("Reset email sent. Check your inbox.");

    }catch(err){

      alert(err.response?.data?.error || "Failed");

    }

  };

  return(

    <div className="authPage">

      <div className="leftHero">

        <h1>Password Reset</h1>

        <p>
          Enter your email to reset password
        </p>

      </div>


      <div className="authCard">

        <div>

          <h2>Forgot Password</h2>

          <input
            placeholder="Email Address"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <button onClick={sendReset}>
            Send Reset Link
          </button>

          <p className="switchText">
            <Link to="/login">Back to Login</Link>
          </p>

        </div>

      </div>

    </div>

  );

}