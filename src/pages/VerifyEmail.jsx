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

        // ✅ SUCCESS → redirect with status
        navigate("/verify-success?status=success");

      }catch(err){

        // ❌ ERROR → redirect with error message
        const errorMsg =
          err.response?.data?.error || "Verification failed";

        navigate(`/verify-success?status=error&msg=${encodeURIComponent(errorMsg)}`);

      }

    };

    verify();

  },[token,navigate]);

  return(

    <div style={{padding:"40px", textAlign:"center"}}>
      <h2>Verifying your email...</h2>
    </div>

  );

}