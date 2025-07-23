// src/App.js
import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import ProfileDetails from "./components/ProfileDetails";
import PhotoGallery from "./components/PhotoGallery";
import PhotoModal from "./components/PhotoModal";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import useKeyboardNav from "./hooks/useKeyboardNav";
import useUsers from "./hooks/useUsers";
import LoadUsersButton from "./components/LoadUsersButton";

function App() {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState({
    firstName: "",
    education: "",
    location: "",
    hometown: "",
  });
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(null);

  // Fetch users (with content already merged in each user object)
  const { users, totalCount } = useUsers(page, filter);

  useEffect(() => {
    setSelectedIdx(0);
  }, [users]);

  // Use users returned from hook directly—each has `content`, `answers`, and `photos` as needed
  const filteredUsers = users;

  const selected = filteredUsers[selectedIdx] || { photos: [] };

  useKeyboardNav({
    modalOpen,
    selected,
    users: filteredUsers || [],
    setSelectedPhotoIdx,
    setModalOpen,
    setSelectedIdx,
    clearSelectedPhotoIdx: () => setSelectedPhotoIdx(null),
  });

  // Modal handlers
  const handleImgClick = (idx) => {
    setSelectedPhotoIdx(idx);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setSelectedPhotoIdx(null);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        background: "#181A20", // dark background
        color: "#EDEDED",      // light text
      }}
    >
      <UserList users={filteredUsers} selectedIdx={selectedIdx} onSelect={setSelectedIdx} />

      <main style={{ flex: 1, padding: "2em", background: "#181A20", color: "#EDEDED" }}>
        <div
          style={{
            marginBottom: "1em",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "1em",
          }}
        >
          <span>
            {totalCount} {totalCount === 1 ? "candidate" : "candidates"} found
          </span>
          <LoadUsersButton onLoadComplete={() => setPage(0)} />
        </div>

        <SearchBar filter={filter} setFilter={setFilter} />

        {filteredUsers.length === 0 ? (
          <div
            style={{
              fontStyle: "italic",
              color: "#888",
              fontSize: "1.3em",
              marginTop: "2em",
              textAlign: "center",
            }}
          >
            No profiles found.
          </div>
        ) : (
          <>
            <ProfileDetails user={selected} content={selected.content} />
            <h3>Photos:</h3>
            <PhotoGallery photos={selected.photos} onImgClick={handleImgClick} />
            <PhotoModal
              open={modalOpen}
              photo={selected.photos ? selected.photos[selectedPhotoIdx] : null}
              onClose={handleClose}
            />
          </>
        )}

        <Pagination
          page={page}
          setPage={setPage}
          disabled={filteredUsers.length < 10}
        />
      </main>
    </div>
  );
}

export default App;
