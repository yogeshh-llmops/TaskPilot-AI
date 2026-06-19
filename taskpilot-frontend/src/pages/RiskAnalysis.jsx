import { useEffect, useState } from "react";
import API from "../api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function RiskAnalysis() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadRisks();
  }, []);

  const loadRisks = async () => {
    try {
      const res = await API.get(
        "/risk-analysis/"
      );

      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const highRisk = projects.filter(
    (p) => p.risk === "High Risk"
  ).length;

  const mediumRisk = projects.filter(
    (p) => p.risk === "Medium Risk"
  ).length;

  const lowRisk = projects.filter(
    (p) => p.risk === "Low Risk"
  ).length;

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main">
        <Navbar />

        <h1>
          🚨 Risk Detection Dashboard
        </h1>

        {/* KPI CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <div className="card">
            <h3>🔴 High Risk</h3>
            <h1>{highRisk}</h1>
          </div>

          <div className="card">
            <h3>🟠 Medium Risk</h3>
            <h1>{mediumRisk}</h1>
          </div>

          <div className="card">
            <h3>🟢 Low Risk</h3>
            <h1>{lowRisk}</h1>
          </div>

          <div className="card">
            <h3>📁 Total Projects</h3>
            <h1>{projects.length}</h1>
          </div>
        </div>

        {/* PROJECTS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "20px",
          }}
        >
          {projects.map((project) => {
            let borderColor = "#22c55e";

            if (
              project.risk ===
              "Medium Risk"
            ) {
              borderColor = "#f59e0b";
            }

            if (
              project.risk ===
              "High Risk"
            ) {
              borderColor = "#ef4444";
            }

            return (
              <div
                key={
                  project.project_id
                }
                className="card"
                style={{
                  borderLeft: `8px solid ${borderColor}`,
                }}
              >
                <h3>
                  {
                    project.project_name
                  }
                </h3>

                <p>
                  📅 End Date:
                  {" "}
                  {project.end_date}
                </p>

                <p>
                  ⏳ Days Left:
                  {" "}
                  {project.days_left}
                </p>

                <h3
                  style={{
                    color:
                      borderColor,
                  }}
                >
                  {project.risk}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}