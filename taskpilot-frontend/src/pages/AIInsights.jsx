import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AIInsights() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    const res = await API.get("/analytics/summary");
    setData(res.data);
  };

  if (!data) return <h2>Loading...</h2>;

  const total =
    data.pending +
    data.progress +
    data.completed;

  const productivity =
    total === 0
      ? 0
      : Math.round(
          (data.completed / total) * 100
        );

  const warnings = [];

  if (data.pending > 5) {
    warnings.push(
      "High number of pending tasks."
    );
  }

  if (productivity < 50) {
    warnings.push(
      "Team productivity is below target."
    );
  }

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main">
        <Navbar />

        <h1>🤖 AI Insights</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div className="card">
            <h3>Productivity Score</h3>
            <h1>{productivity}%</h1>
          </div>

          <div className="card">
            <h3>Pending Tasks</h3>
            <h1>{data.pending}</h1>
          </div>

          <div className="card">
            <h3>Completed Tasks</h3>
            <h1>{data.completed}</h1>
          </div>
        </div>

        <div
          className="card"
          style={{ marginTop: "20px" }}
        >
          <h2>AI Recommendations</h2>

          {warnings.length === 0 ? (
            <p>
              ✅ Team performance looks good.
            </p>
          ) : (
            warnings.map((item, index) => (
              <p key={index}>
                ⚠ {item}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}