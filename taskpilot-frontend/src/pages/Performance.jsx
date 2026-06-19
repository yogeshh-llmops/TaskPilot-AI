import { useEffect, useState } from "react";
import API from "../api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Performance() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadPerformance();
  }, []);

  const loadPerformance = async () => {
    try {
      const res = await API.get(
        "/employee-performance/"
      );

      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main">
        <Navbar />

        <h1>🏆 Employee Performance</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {employees.map((emp) => (
            <div
              key={emp.employee_id}
              className="card"
            >
              <h3>
                Employee #{emp.employee_id}
              </h3>

              <p>
                Department:
                {" "}
                {emp.department}
              </p>

              <p>
                Designation:
                {" "}
                {emp.designation}
              </p>

              <p>
                Total Tasks:
                {" "}
                {emp.total_tasks}
              </p>

              <p>
                Completed:
                {" "}
                {emp.completed_tasks}
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
                      `${emp.performance_score}%`,
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
                Score:
                {" "}
                {emp.performance_score}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}