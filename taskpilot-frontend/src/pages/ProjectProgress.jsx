import { useEffect, useState } from "react";
import API from "../api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function ProjectProgress() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await API.get("/project-progress/");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main">
        <Navbar />

        <h1>📊 Project Progress</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {projects.map((project) => (
            <div
              key={project.project_id}
              className="card"
            >
              <h3>{project.project_name}</h3>

              <p>
                Total Tasks:
                {" "}
                {project.total_tasks}
              </p>

              <p>
                Completed:
                {" "}
                {project.completed_tasks}
              </p>

              <div
                style={{
                  background: "#e2e8f0",
                  height: "12px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  marginTop: "15px",
                }}
              >
                <div
                  style={{
                    width:
                      `${project.progress_percentage}%`,
                    height: "100%",
                    background:
                      "#22c55e",
                  }}
                />
              </div>

              <p
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                }}
              >
                {project.progress_percentage}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}