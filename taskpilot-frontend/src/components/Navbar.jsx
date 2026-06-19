import {
  FaBell,
  FaMoon,
  FaSun,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

export default function Navbar({
  darkMode,
  setDarkMode,
}) {
  return (
    <div className="navbar">
      <div className="search-box">
        <FaSearch />

        <input
          type="text"
          placeholder="Search employees, projects, tasks..."
        />
      </div>

      <div className="nav-right">
        <button className="icon-btn">
          <FaBell />
        </button>

        <button
          className="icon-btn"
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >
          {darkMode ? (
            <FaSun />
          ) : (
            <FaMoon />
          )}
        </button>

        <div className="profile">
          <FaUserCircle />

          <span>Admin</span>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem(
              "token"
            );
            window.location.href =
              "/login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}