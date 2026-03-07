import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function VerifyEmail(){

  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(()=>{

    const verify = async () => {

      try{

        await API.get(`/auth/verify/${token}`);

        alert("Email verified successfully");

        navigate("/login");

      }catch(err){

        alert(err.response?.data?.error || "Verification failed");

        navigate("/signup");

      }

    };

    verify();

  },[token,navigate]);

  return(

    <div style={{padding:"40px"}}>

      <h2>Email verification processing...</h2>

    </div>

  );

}