// src/components/PhotoGallery.js
import React from "react";

export default function PhotoGallery({ photos, onImgClick, mediaClassName = "" }) {
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
        background: "#222",
        borderRadius: "8px",
      }}
    >
      {(photos || []).map((p, i) => {
        // Check for .jpeg extension (case-insensitive)
        const isJpeg = p.url && p.url.toLowerCase().endsWith(".jpeg");

        if (p.url) {
          return (
            <div key={i} style={{ position: "relative", marginBottom: "1rem" }}>
              <img
                src={p.url}
                alt={`User ${i + 1}`}
                className={mediaClassName}
                style={{
                  width: "400px",
                  height: "auto",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px #aaa",
                  cursor: "zoom-in",
                  border: isJpeg ? "3px solid #27ae60" : "none", // green border for jpeg
                }}
                onClick={() => onImgClick(i)}
              />
              {isJpeg && (
                <span
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 12,
                    background: "#27ae60",
                    color: "#fff",
                    padding: "2px 10px",
                    borderRadius: "6px",
                    fontSize: "0.95em",
                    fontWeight: 600,
                    letterSpacing: "1px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                    zIndex: 2,
                  }}
                >
                  JPEG
                </span>
              )}
            </div>
          );
        } else if (p.videoUrl) {
          return (
            <video
              key={i}
              src={p.videoUrl}
              className={mediaClassName}
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
              poster={Array.isArray(p.url) ? p.url[0] : p.url}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
