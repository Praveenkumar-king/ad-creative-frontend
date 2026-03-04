import { useNavigate } from "react-router-dom";

export default function VerifySuccess(){

  const navigate = useNavigate();

  return(

    <div className="centerPage">

      <h2>Email Verified Successfully ✅</h2>

      <button
        onClick={()=>navigate("/")}
      >
        Go to Login
      </button>

    </div>

  );

}