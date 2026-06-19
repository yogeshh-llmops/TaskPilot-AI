import {
  FaHome,
  FaUsers,
  FaProjectDiagram,
  FaTasks,
  FaChartBar,
  FaRobot,
  FaBell,
  FaTrophy,
  FaExclamationTriangle,
  FaBars,
} from "react-icons/fa";

import {
  Link,
  useLocation,
} from "react-router-dom";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Employees",
      path: "/employees",
      icon: <FaUsers />,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: <FaProjectDiagram />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <FaTasks />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <FaChartBar />,
    },
    {
      name: "Project Progress",
      path: "/project-progress",
      icon: <FaChartBar />,
    },
    {
      name: "Performance",
      path: "/performance",
      icon: <FaTrophy />,
    },
    {
      name: "Risk Analysis",
      path: "/risk-analysis",
      icon: <FaExclamationTriangle />,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: <FaBell />,
    },
    {
      name: "AI Insights",
      path: "/insights",
      icon: <FaRobot />,
    },
  ];

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() =>
          setSidebarOpen(
            !sidebarOpen
          )
        }
      >
        <FaBars />
      </button>

      <div
        className={`sidebar ${
          sidebarOpen
            ? "sidebar-open"
            : ""
        }`}
      >
        <h2 className="logo">
          🚀 TaskPilot
        </h2>

        <div className="menu">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`menu-item ${
                location.pathname ===
                item.path
                  ? "active"
                  : ""
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}