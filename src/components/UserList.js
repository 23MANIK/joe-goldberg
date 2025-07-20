import React from "react";

export default function UserList({ users, selectedIdx, onSelect }) {
  return (
    <aside
      style={{
        width: 220,
        background: "#f6f6fa",
        borderRight: "1px solid #ccc",
        padding: "1em",
        minHeight: "100vh",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2>Users</h2>
      <div style={{ marginBottom: 8, fontWeight: "bold" }}>
        {users.length} {users.length === 1 ? "result" : "results"}
      </div>
      {users.length === 0 ? (
        <div style={{ color: "#666", fontStyle: "italic", marginTop: 20 }}>
          No users found.
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, flexGrow: 1, overflowY: "auto" }}>
          {users.map((u, idx) => (
            <li key={idx}>
              <button
                style={{
                  background: idx === selectedIdx ? "#5b6ee1" : "transparent",
                  color: idx === selectedIdx ? "#fff" : "#333",
                  border: 0,
                  padding: "8px 12px",
                  width: "100%",
                  textAlign: "left",
                  margin: "2px 0",
                  borderRadius: 4,
                  cursor: "pointer",
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
