import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";

const API_BASE = "http://localhost:8080/api";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const [active, setActive] = useState("generate");
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("instagram");
  const [tone, setTone] = useState("professional");
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const token = user?.token;

  /* =========================
     Fetch History From Backend
  ========================= */
  useEffect(() => {
    if (active === "history") {
      fetchHistory();
    }
  }, [active]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_BASE}/generate/history`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setHistory(res.data);
    } catch {
      alert("Failed to load history");
    }
  };

  /* =========================
     Generate Poster
  ========================= */
  const handleGenerate = async () => {
    if (!prompt.trim()) return alert("Enter prompt");

    try {
      setLoading(true);
      setResult(null);

      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("size", size);
      formData.append("tone", tone);
      if (logoFile) formData.append("logo", logoFile);

      const res = await axios.post(
        `${API_BASE}/generate`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setResult(res.data);
      setActive("generate");

    } catch {
      alert("Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const filename = result.imageUrl.split("/").pop();
    window.open(`${API_BASE}/generate/download/${filename}`);
  };

  return (
    <div className="dashboard">

      <Sidebar active={active} setActive={setActive} />

      <div className="content">

        {/* WELCOME HEADER */}
        <div className="topBar">
          <h2>Welcome, {user?.name}</h2>
        </div>

        {/* GENERATE TAB */}
        {active === "generate" && (
          <div className="card">

            <h1>AI Ad Creative Generator</h1>

            <textarea
              placeholder="Enter marketing prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <div className="controls">

              <select value={size} onChange={(e)=>setSize(e.target.value)}>
                <option value="instagram">Instagram</option>
                <option value="story">Story</option>
                <option value="a4">A4</option>
              </select>

              <select value={tone} onChange={(e)=>setTone(e.target.value)}>
                <option value="professional">Professional</option>
                <option value="witty">Witty</option>
                <option value="urgent">Urgent</option>
                <option value="inspirational">Inspirational</option>
              </select>

              <input
                type="file"
                accept="image/png,image/jpeg"
                onChange={(e)=>setLogoFile(e.target.files[0])}
              />

              <button onClick={handleGenerate}>
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>

            {loading && <div className="spinner"></div>}

            {result && (
              <div className="result">
                <img
                  src={`http://localhost:8080${result.imageUrl}`}
                  className="poster"
                />
                <div className="captionSection">
                  <p>{result.caption}</p>
                  <button onClick={handleDownload}>Download</button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* HISTORY TAB */}
        {active === "history" && (
          <div className="card">
            <h2>Your Recent Campaigns</h2>

            {history.map((item) => (
              <div key={item._id} className="historyItem">
                <img
                  src={`http://localhost:8080${item.imageUrl}`}
                />
                <div>
                  <strong>{item.prompt}</strong>
                  <p>{item.caption}</p>
                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}