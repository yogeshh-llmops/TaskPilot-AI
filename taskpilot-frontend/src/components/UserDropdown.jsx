import { useState } from "react";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "#1f2937",
          color: "white",
          padding: "10px 15px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Profile ⬇
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 45,
            background: "#111827",
            padding: "10px",
            borderRadius: "10px",
            width: "150px",
          }}
        >
          <p style={{ color: "white", cursor: "pointer" }}>My Profile</p>
          <p style={{ color: "white", cursor: "pointer" }}>Settings</p>
          <p style={{ color: "red", cursor: "pointer" }}>Logout</p>
        </div>
      )}
    </div>
  );
}