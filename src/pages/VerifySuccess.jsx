export default function VerifySuccess() {

  return (

    <div style={{
      height:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      background:"#020617",
      color:"white",
      flexDirection:"column"
    }}>

      <h1>Email Verified Successfully ✅</h1>

      <p>You can now login to your account.</p>

      <a href="/login" style={{
        marginTop:"20px",
        padding:"10px 20px",
        background:"#22c55e",
        color:"white",
        textDecoration:"none",
        borderRadius:"6px"
      }}>
        Go to Login
      </a>

    </div>

  );

}