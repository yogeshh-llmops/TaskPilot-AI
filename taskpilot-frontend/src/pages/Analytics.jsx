import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const res = await API.get("/analytics/summary");
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) {
    return (
      <div style={{ padding: "50px" }}>
        Loading Analytics...
      </div>
    );
  }

  const totalTasks =
    data.pending +
    data.progress +
    data.completed;

  const productivity =
    totalTasks === 0
      ? 0
      : Math.round(
          (data.completed / totalTasks) * 100
        );

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main">
        <Navbar />

        <h1>🤖 AI Analytics Dashboard</h1>

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
            <h3>Pending Tasks</h3>
            <h1>{data.pending}</h1>
          </div>

          <div className="card">
            <h3>In Progress</h3>
            <h1>{data.progress}</h1>
          </div>

          <div className="card">
            <h3>Completed</h3>
            <h1>{data.completed}</h1>
          </div>

          <div className="card">
            <h3>Productivity</h3>
            <h1>{productivity}%</h1>
          </div>
        </div>

        <div
          className="card"
          style={{ marginTop: "20px" }}
        >
          <h2>🧠 AI Recommendations</h2>

          {data.pending > 5 && (
            <p>
              ⚠ High number of pending tasks.
            </p>
          )}

          {data.progress > 0 && (
            <p>
              📈 Team is actively working on
              projects.
            </p>
          )}

          {data.completed > 0 && (
            <p>
              ✅ Tasks are being completed
              successfully.
            </p>
          )}

          {totalTasks === 0 && (
            <p>
              📋 No tasks available in the
              system.
            </p>
          )}
        </div>

        <div
          className="card"
          style={{ marginTop: "20px" }}
        >
          <h2>👨 Employee Workload</h2>

          {Object.entries(data.workload).map(
            ([employeeId, count]) => (
              <p key={employeeId}>
                Employee #{employeeId}: {count} task(s)
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}