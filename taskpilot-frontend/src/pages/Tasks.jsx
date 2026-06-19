import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");
  const [employeeId, setEmployeeId] = useState("");

  const loadTasks = async () => {
  try {
    const res = await API.get("/tasks/");

    console.log("TASKS RESPONSE:");
    console.log(res.data);

    setTasks(res.data);
  } catch (error) {
    console.error("TASK ERROR:", error);
  }
};

  const loadEmployees = async () => {
    const res = await API.get("/employees/");
    setEmployees(res.data);
  };

  useEffect(() => {
    loadTasks();
    loadEmployees();
  }, []);

  const createTask = async () => {
    if (!title) {
      alert("Enter task title");
      return;
    }

    await API.post("/tasks/", {
      title,
      status,
      employee_id: employeeId || null,
    });

    setTitle("");
    setStatus("Pending");
    setEmployeeId("");

    loadTasks();
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    await API.delete(`/tasks/${id}`);
    loadTasks();
  };

  const updateTaskStatus = async (
    taskId,
    newStatus
  ) => {
    await API.put(
      `/tasks/${taskId}?status=${encodeURIComponent(
        newStatus
      )}`
    );

    loadTasks();
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(
      (emp) => emp.id === employeeId
    );

    if (!employee) return "Not Assigned";

    return `${employee.designation} (${employee.department})`;
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          background: "#f5f7fb",
          padding: "40px",
        }}
      >
        <h1>📋 Task Management</h1>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "20px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <input
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <select
            value={employeeId}
            onChange={(e) =>
              setEmployeeId(e.target.value)
            }
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          >
            <option value="">
              Assign Employee
            </option>

            {employees.map((emp) => (
              <option
                key={emp.id}
                value={emp.id}
              >
                Employee #{emp.id}
              </option>
            ))}
          </select>

          <button
            onClick={createTask}
            style={{
              padding: "10px 20px",
              background: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ➕ Add Task
          </button>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "15px",
            padding: "20px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <table
            width="100%"
            cellPadding="12"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Employee</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>

                  <td>{task.title}</td>

                  <td>
                    <select
                      value={task.status}
                      onChange={(e) =>
                        updateTaskStatus(
                          task.id,
                          e.target.value
                        )
                      }
                      style={{
                        padding: "6px",
                        borderRadius: "6px",
                      }}
                    >
                      <option>
                        Pending
                      </option>
                      <option>
                        In Progress
                      </option>
                      <option>
                        Completed
                      </option>
                    </select>
                  </td>

                  <td>
                    {getEmployeeName(
                      task.employee_id
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        deleteTask(task.id)
                      }
                      style={{
                        background:
                          "#ef4444",
                        color: "white",
                        border: "none",
                        padding:
                          "8px 12px",
                        borderRadius:
                          "6px",
                        cursor:
                          "pointer",
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