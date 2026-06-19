import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("Active");

  const [editingId, setEditingId] = useState(null);

  const loadProjects = async () => {
    const res = await API.get("/projects/");
    setProjects(res.data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const resetForm = () => {
    setProjectName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setStatus("Active");
    setEditingId(null);
  };

  const createProject = async () => {
    if (!projectName) {
      alert("Enter Project Name");
      return;
    }

    await API.post("/projects/", {
      project_name: projectName,
      description,
      start_date: startDate,
      end_date: endDate,
      status,
    });

    resetForm();
    loadProjects();
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    await API.delete(`/projects/${id}`);

    loadProjects();
  };

  const editProject = (project) => {
    setEditingId(project.id);

    setProjectName(project.project_name);
    setDescription(project.description);
    setStartDate(project.start_date);
    setEndDate(project.end_date);
    setStatus(project.status);
  };

  const updateProject = async () => {
    await API.put(`/projects/${editingId}`, {
      project_name: projectName,
      description,
      start_date: startDate,
      end_date: endDate,
      status,
    });

    resetForm();
    loadProjects();
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "40px",
          background: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <h1>📁 Project Management</h1>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "20px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <input
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              padding: "10px",
              width: "250px",
              marginRight: "10px",
            }}
          />

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          >
            <option>Active</option>
            <option>Completed</option>
            <option>On Hold</option>
          </select>

          {editingId ? (
            <button
              onClick={updateProject}
              style={{
                background: "#f59e0b",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Update Project
            </button>
          ) : (
            <button
              onClick={createProject}
              style={{
                background: "#4f46e5",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              ➕ Add Project
            </button>
          )}
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "15px",
            padding: "20px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <table width="100%" cellPadding="12">
            <thead>
              <tr>
                <th>ID</th>
                <th>Project Name</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.id}</td>

                  <td>{project.project_name}</td>

                  <td>{project.description}</td>

                  <td>{project.start_date}</td>

                  <td>{project.end_date}</td>

                  <td>{project.status}</td>

                  <td>
                    <button
                      onClick={() => editProject(project)}
                      style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        marginRight: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProject(project.id)}
                      style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}