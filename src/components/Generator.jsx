import { useState } from "react";
import API from "../services/api";

export default function Generator() {

  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("instagram");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    if (!prompt) return alert("Enter prompt");

    try {
      setLoading(true);
      const res = await API.post("/generate", { prompt, size });
      setResult(res.data);
    } catch (err) {
      alert("Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const filename = result.imageUrl.split("/").pop();
    window.open(`http://localhost:8080/api/generate/download/${filename}`);
  };

  return (
    <div className="container">

      <h1>AI Ad Creative Generator</h1>

      <textarea
        placeholder="Enter your marketing prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="controls">
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="instagram">Instagram</option>
          <option value="a4">A4</option>
          <option value="story">Story</option>
        </select>

        <button onClick={handleGenerate}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {result && (
        <div className="result">

          <img
            src={`http://localhost:8080${result.imageUrl}`}
            alt="Poster"
          />

          <div className="caption-box">
            <h3>Generated Caption</h3>
            <p>{result.caption}</p>

            <button onClick={handleDownload}>
              Download Poster
            </button>
          </div>

        </div>
      )}

    </div>
  );
}