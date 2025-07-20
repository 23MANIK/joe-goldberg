import { useEffect } from "react";

export default function useKeyboardNav({
  modalOpen,
  selected,
  users,
  setSelectedPhotoIdx,
  setModalOpen,
  setSelectedIdx,
  clearSelectedPhotoIdx
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalOpen) {
        if (e.key === "ArrowRight") {
          setSelectedPhotoIdx((idx) =>
            idx === (selected.photos.length - 1) ? 0 : idx + 1
          );
        } else if (e.key === "ArrowLeft") {
          setSelectedPhotoIdx((idx) =>
            idx === 0 ? (selected.photos.length - 1) : idx - 1
          );
        } else if (e.key === "ArrowUp") {
          setSelectedIdx((idx) => {
            const newIdx = (idx - 1 + users.length) % users.length;
            setSelectedPhotoIdx(0);
            return newIdx;
          });
        } else if (e.key === "ArrowDown") {
          setSelectedIdx((idx) => {
            const newIdx = (idx + 1) % users.length;
            setSelectedPhotoIdx(0);
            return newIdx;
          });
        } else if (e.key === "Escape") {
          setModalOpen(false);
          clearSelectedPhotoIdx();
        }
      } else {
        if (e.key === "ArrowDown") {
          setSelectedIdx((idx) => (idx + 1) % users.length);
        } else if (e.key === "ArrowUp") {
          setSelectedIdx((idx) => (idx - 1 + users.length) % users.length);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, selected.photos.length, users.length, setSelectedPhotoIdx, setModalOpen, setSelectedIdx, clearSelectedPhotoIdx]);
}
