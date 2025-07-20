import React, { useEffect, useState } from "react";
import UserList from "./components/UserList";
import ProfileDetails from "./components/ProfileDetails";
import PhotoGallery from "./components/PhotoGallery";
import PhotoModal from "./components/PhotoModal";
import SearchBar from "./components/SearchBar";
import useKeyboardNav from "./hooks/useKeyboardNav";
import { API_URL } from "./config";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(null);

  // Search/filter state
  const [filter, setFilter] = useState({
    firstName: "",
    education: "",
    location: "",
    hometown: ""
  });

  // Fetch users on mount
  useEffect(() => {
    fetch(`http://localhost:8080/api/users`)
      .then(res => res.json())
      .then(setUsers);
  }, []);

  // Filter users according to all fields
  const filteredUsers = users.filter(u =>
    (!filter.firstName || (u.firstName && u.firstName.toLowerCase().includes(filter.firstName.toLowerCase())))
    &&
    (!filter.education ||
      (u.educations && u.educations.join(" ").toLowerCase().includes(filter.education.toLowerCase())) ||
      (u.education && u.education.toLowerCase().includes(filter.education.toLowerCase()))
    )
    &&
    (!filter.location || (u.location && u.location.toLowerCase().includes(filter.location.toLowerCase())))
    &&
    (!filter.hometown || (u.hometown && u.hometown.toLowerCase().includes(filter.hometown.toLowerCase())))
  );

  // Keep selection index valid
  useEffect(() => {
    if (filteredUsers.length === 0) {
      setSelectedIdx(0);
    } else if (selectedIdx < 0 || selectedIdx >= filteredUsers.length) {
      setSelectedIdx(0);
    }
  }, [filter, users.length, filteredUsers.length, selectedIdx]);

  // Always select from filtered
  const selected = filteredUsers[selectedIdx] || { photos: [] };

  useKeyboardNav({
    modalOpen,
    selected,
    users: filteredUsers,
    setSelectedPhotoIdx,
    setModalOpen,
    setSelectedIdx,
    clearSelectedPhotoIdx: () => setSelectedPhotoIdx(null),
  });

  const handleImgClick = idx => {
    setSelectedPhotoIdx(idx);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setSelectedPhotoIdx(null);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <UserList users={filteredUsers} selectedIdx={selectedIdx} onSelect={setSelectedIdx} />

      <main style={{ flex: 1, padding: "2em" }}>
        {/* USER COUNT ADDED HERE */}
        <div style={{ marginBottom: "1em", fontWeight: "bold" }}>
          {filteredUsers.length} {filteredUsers.length === 1 ? "candidate" : "candidates"} found
        </div>
        <SearchBar filter={filter} setFilter={setFilter} />

        {filteredUsers.length === 0 ? (
          <div style={{
            fontStyle: "italic",
            color: "#999",
            fontSize: "1.3em",
            marginTop: "2em",
            textAlign: "center"
          }}>No profiles found.</div>
        ) : (
          <>
            <ProfileDetails user={selected} />
            <h3>Photos:</h3>
            <PhotoGallery photos={selected.photos} onImgClick={handleImgClick} />
            <PhotoModal
              open={modalOpen}
              photo={selected.photos ? selected.photos[selectedPhotoIdx] : null}
              onClose={handleClose}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
