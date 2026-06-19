import { useEffect, useState } from "react";
import API from "../api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import ActivityFeed from "../components/ActivityFeed";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState(null);

  const [darkMode, setDarkMode] =
    useState(false);

  const [time, setTime] = useState(
    new Date().toLocaleTimeString()
  );

  const loadDashboard = async () => {
    try {
      const res = await API.get(
        "/analytics/summary"
      );

      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadDashboard();

    const refresh = setInterval(() => {
      loadDashboard();
    }, 5000);

    return () => clearInterval(refresh);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString()
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!data) {
    return (
      <div style={{ padding: "50px" }}>
        Loading Dashboard...
      </div>
    );
  }

  const completionRate =
    data.total_tasks === 0
      ? 0
      : Math.round(
          (data.completed /
            data.total_tasks) *
            100
        );

  const pieData = [
    {
      name: "Pending",
      value: data.pending,
    },
    {
      name: "In Progress",
      value: data.progress,
    },
    {
      name: "Completed",
      value: data.completed,
    },
  ];

  const productivityData = [
    {
      name: "Completion %",
      value: completionRate,
    },
  ];

  const COLORS = [
    "#f59e0b",
    "#3b82f6",
    "#10b981",
  ];

  return (
    <div
      className={`app-container ${
        darkMode ? "dark" : ""
      }`}
    >
      <Sidebar />

      <div className="main">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* PAGE TITLE */}

        <div className="page-title">
          <h1>Welcome Back 👋</h1>

          <p>
            Live TaskPilot Dashboard
          </p>
        </div>

        {/* KPI CARDS */}

        <div className="cards-grid">
          <StatCard
            title="Employees"
            value={
              data.total_employees
            }
            color="#3b82f6"
          />

          <StatCard
            title="Projects"
            value={
              data.total_projects
            }
            color="#8b5cf6"
          />

          <StatCard
            title="Tasks"
            value={
              data.total_tasks
            }
            color="#10b981"
          />

          <StatCard
            title="Completion Rate"
            value={`${completionRate}%`}
            color="#22c55e"
          />

          <StatCard
            title="System Time"
            value={time}
            color="#f97316"
          />
        </div>

        {/* CHARTS */}

        <div className="chart-grid">
          <div className="card">
            <h3>
              Task Distribution
            </h3>

            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={110}
                  label
                >
                  {pieData.map(
                    (
                      entry,
                      index
                    ) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[index]
                        }
                      />
                    )
                  )}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3>
              Productivity
            </h3>

            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <BarChart
                data={
                  productivityData
                }
              >
                <XAxis
                  dataKey="name"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#6366f1"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ACTIVITY FEED */}

        <ActivityFeed />

        {/* QUICK SUMMARY */}

        <div
          className="card"
          style={{
            marginTop: "20px",
          }}
        >
          <h3>
            📊 Quick Summary
          </h3>

          <div
            style={{
              display: "grid",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <p>
              👨 Employees :
              {
                data.total_employees
              }
            </p>

            <p>
              📁 Projects :
              {
                data.total_projects
              }
            </p>

            <p>
              📋 Tasks :
              {
                data.total_tasks
              }
            </p>

            <p>
              🎯 Completion Rate :
              {completionRate}%
            </p>
          </div>

          <br />

          <hr />

          <div
            style={{
              display: "grid",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <p>
              ⏳ Pending :
              {data.pending}
            </p>

            <p>
              🚀 In Progress :
              {data.progress}
            </p>

            <p>
              ✅ Completed :
              {data.completed}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}