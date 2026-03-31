import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/VerifySuccess.css";

export default function VerifySuccess(){

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const status = searchParams.get("status");
  const msg = searchParams.get("msg");

  const [loading,setLoading] = useState(false);
  const [resendMsg,setResendMsg] = useState("");

  // 🎉 simple confetti effect (basic)
  useEffect(()=>{
    if(status === "success"){
      document.body.style.background = "#020617";
    }
  },[status]);

  const resendVerification = async () => {

    try{

      setLoading(true);

      await API.post("/auth/resend-verification");

      setResendMsg("📩 Verification email sent again!");

    }catch(err){

      setResendMsg(
        err.response?.data?.error || "Failed to resend email"
      );

    }finally{
      setLoading(false);
    }

  };

  return(

    <div className="verifyContainer">

      <div className="verifyCard">

        {/* ✅ SUCCESS */}
        {status === "success" && (
          <>
            <h2 className="successTitle">🎉 Email Verified!</h2>

            <p className="successText">
              Your account is now active 🚀
            </p>

            <button
              className="verifyBtn"
              onClick={()=>navigate("/login")}
            >
              Go to Login
            </button>
          </>
        )}

        {/* ❌ ERROR */}
        {status === "error" && (
          <>
            <h2 className="errorTitle">❌ Verification Failed</h2>

            <p className="errorText">
              {msg || "Invalid or expired token"}
            </p>

            <button
              className="verifyBtn"
              onClick={resendVerification}
              disabled={loading}
            >
              {loading ? "Sending..." : "Resend Verification"}
            </button>

            {resendMsg && (
              <p className="verifyText">{resendMsg}</p>
            )}

            <button
              className="secondaryBtn"
              onClick={()=>navigate("/signup")}
            >
              Back to Signup
            </button>
          </>
        )}

      </div>

    </div>

  );

}