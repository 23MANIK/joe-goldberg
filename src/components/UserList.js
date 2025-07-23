import React from "react";

export default function UserList({ users, selectedIdx, onSelect }) {
  return (
    <aside
      style={{
        width: 220,
        background: "#222733", // dark sidebar background
        borderRight: "1px solid #333", // darker border
        padding: "1em",
        minHeight: "100vh",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        color: "#EDEDED", // light text
      }}
    >
      <h2 style={{ color: "#EDEDED" }}>Users</h2>
      <div style={{ marginBottom: 8, fontWeight: "bold", color: "#B0B3B8" }}>
        {users.length} {users.length === 1 ? "result" : "results"}
      </div>
      {users.length === 0 ? (
        <div style={{ color: "#888", fontStyle: "italic", marginTop: 20 }}>
          No users found.
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, flexGrow: 1, overflowY: "auto" }}>
          {users.map((u, idx) => (
            <li key={idx}>
              <button
                style={{
                  background: idx === selectedIdx ? "#5b6ee1" : "transparent",
                  color: idx === selectedIdx ? "#fff" : "#EDEDED",
                  border: 0,
                  padding: "8px 12px",
                  width: "100%",
                  textAlign: "left",
                  margin: "2px 0",
                  borderRadius: 4,
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onClick={() => onSelect(idx)}
              >
                {u.firstName || "—"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
