import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  const [userId, setUserId] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  const loadEmployees = async () => {
    const res = await API.get("/employees/");
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const createEmployee = async () => {
    if (
      !userId ||
      !department ||
      !designation ||
      !joiningDate
    ) {
      alert("Please fill all fields");
      return;
    }

    await API.post("/employees/", {
      user_id: Number(userId),
      department,
      designation,
      joining_date: joiningDate,
    });

    setUserId("");
    setDepartment("");
    setDesignation("");
    setJoiningDate("");

    loadEmployees();
  };

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this employee?"
    );

    if (!confirmDelete) return;

    await API.delete(`/employees/${id}`);

    loadEmployees();
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
          padding: "30px",
          background: "#f5f7fb",
        }}
      >
        <h1>👨 Employee Management</h1>

        {/* FORM */}

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
            placeholder="User ID"
            value={userId}
            onChange={(e) =>
              setUserId(e.target.value)
            }
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          />

          <input
            placeholder="Department"
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          />

          <input
            placeholder="Designation"
            value={designation}
            onChange={(e) =>
              setDesignation(e.target.value)
            }
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          />

          <input
            type="date"
            value={joiningDate}
            onChange={(e) =>
              setJoiningDate(e.target.value)
            }
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          />

          <button
            onClick={createEmployee}
            style={{
              background: "#4f46e5",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ➕ Add Employee
          </button>
        </div>

        {/* TABLE */}

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
                <th>User ID</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Joining Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>

                  <td>{emp.user_id}</td>

                  <td>{emp.department}</td>

                  <td>{emp.designation}</td>

                  <td>{emp.joining_date}</td>

                  <td>
                    <button
                      onClick={() =>
                        deleteEmployee(emp.id)
                      }
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