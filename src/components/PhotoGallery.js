// src/components/PhotoGallery.js
import React from "react";

export default function PhotoGallery({ photos, onImgClick }) {
  return (
    <div
      style={{
        maxHeight: "700px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
        paddingRight: "8px",
        background: "#222", // dark gallery background
        borderRadius: "8px",
      }}
    >
      {(photos || []).map((p, i) => {
        // Prefer the image if both exist, else fallback to video
        if (p.url) {
          return (
            <img
              key={i}
              src={p.url}
              alt={`User photo ${i + 1}`}
              style={{
                width: "400px",
                height: "auto",
                borderRadius: 8,
                boxShadow: "0 2px 8px #aaa",
                marginBottom: "1rem",
                cursor: "zoom-in",
              }}
              onClick={() => onImgClick(i)}
            />
          );
        } else if (p.videoUrl) {
          return (
            <video
              key={i}
              src={p.videoUrl}
              style={{
                width: "400px",
                height: "auto",
                borderRadius: 8,
                boxShadow: "0 2px 8px #aaa",
                marginBottom: "1rem",
                cursor: "zoom-in",
                background: "#222"
              }}
              controls
              onClick={() => onImgClick(i)}
              poster={Array.isArray(p.url) ? p.url[0] : p.url} // show thumbnail if present
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
