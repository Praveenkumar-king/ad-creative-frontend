import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import "../styles/history.css";

export default function History(){

  const demoHistory = [
    { prompt:"Coffee ad creative", date:"2026-03-04" },
    { prompt:"Nike shoe campaign", date:"2026-03-03" },
    { prompt:"Mobile phone ad", date:"2026-03-02" }
  ];

  return(

    <div className="dashboard">

      <Sidebar/>

      <div className="content">

        <h1>Ad History</h1>

        <div className="historyList">

          {demoHistory.map((item,i)=>(

            <div key={i} className="historyCard">

              <h3>{item.prompt}</h3>

              <p>{item.date}</p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}