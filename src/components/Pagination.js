import React from "react";

export default function Pagination({ page, setPage, disabled }) {
  return (
    <div style={{ marginTop: "1em", display: "flex", justifyContent: "center", gap: "1em" }}>
      <button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}>
        Previous
      </button>
      <span>Page {page + 1}</span>
      <button onClick={() => setPage((p) => p + 1)} disabled={disabled}>
        Next
      </button>
    </div>
  );
}