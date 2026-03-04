import { useEffect, useState } from "react";
import API from "../services/api";

export default function History() {

  const [campaigns,setCampaigns] = useState([]);

  useEffect(()=>{

    const loadHistory = async ()=>{

      try{

        const res = await API.get("/generate/history");
        setCampaigns(res.data);

      }catch(err){

        console.log(err);

      }

    };

    loadHistory();

  },[]);

  return(

    <div className="pageContainer">

      <h2>Campaign History</h2>

      <div className="historyGrid">

        {campaigns.map((item)=>{

          return(

            <div className="historyCard" key={item._id}>

              <img
                src={`http://localhost:8080${item.imageUrl}`}
                alt="poster"
              />

              <p className="prompt">
                {item.prompt}
              </p>

              <p className="caption">
                {item.caption}
              </p>

              <a
                href={`http://localhost:8080/api/generate/download/${item.imageUrl.split("/").pop()}`}
                target="_blank"
              >
                Download
              </a>

            </div>

          );

        })}

      </div>

    </div>

  );

}