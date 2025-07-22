import React, { useState } from "react";
import { BACKEND_API_URL } from "../config"; // Adjust path as needed

export default function LoadUsersButton({ onLoadComplete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleLoadUsers = () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    fetch(`${BACKEND_API_URL}/loadUsers`, { method: "GET" }) // or GET if your API uses GET
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load users");
        return res.json(); // or res.text() depending on API
      })
      .then((data) => {
        setSuccess("Users loaded successfully.");
        if (onLoadComplete) onLoadComplete();
      })
      .catch((err) => {
        setError(err.message || "Error loading users");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ display: "inline-block" }}>
      <button
        onClick={handleLoadUsers}
        disabled={loading}
        style={{
          padding: "0.3em 0.6em",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Loading..." : "Load Users"}
      </button>
      {error && (
        <div style={{ color: "red", marginTop: "0.3em", fontSize: "0.85em" }}>
          {error}
        </div>
      )}
      {success && (
        <div
          style={{ color: "green", marginTop: "0.3em", fontSize: "0.85em" }}
        >
          {success}
        </div>
      )}
    </div>
  );
}
