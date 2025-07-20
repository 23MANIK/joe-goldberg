// src/components/PhotoModal.js
import React from "react";

export default function PhotoModal({ open, photo, onClose }) {
  if (!open || !photo) return null;

  // Prefer video if available, fallback to image
  const hasVideo = photo.videoUrl;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      {hasVideo ? (
        <video
          src={photo.videoUrl}
          controls
          autoPlay
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            borderRadius: 16,
            background: "#222",
            boxShadow: "0 4px 16px #000",
          }}
          onClick={e => e.stopPropagation()}
          poster={Array.isArray(photo.url) ? photo.url[0] : photo.url}
        />
      ) : (
        photo.url && (
          <img
            src={photo.url}
            alt="Enlarged user media"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: 16,
              boxShadow: "0 4px 16px #000",
            }}
            onClick={e => e.stopPropagation()}
          />
        )
      )}
    </div>
  );
}
