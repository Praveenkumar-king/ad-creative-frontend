import { useParams } from "react-router-dom";
import { useEffect } from "react";
import API from "../services/api";

export default function VerifyEmail(){

  const { token } = useParams();

  useEffect(()=>{

    API.get(`/auth/verify/${token}`)
      .then(()=>{
        window.location.href="/verify-success";
      })
      .catch(()=>{
        alert("Verification failed");
      });

  },[]);

  return(
    <div className="centerPage">
      Verifying Email...
    </div>
  );

}