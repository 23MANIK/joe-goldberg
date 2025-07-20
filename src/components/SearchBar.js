import React from "react";

export default function SearchBar({ filter, setFilter }) {
  return (
    <div
      style={{
        marginBottom: "2em",
        display: "flex",
        gap: "1em",
        alignItems: "flex-end",
        flexWrap: "wrap",
      }}
    >
      <div>
        <label>
          First Name:
          <br />
          <input
            type="text"
            value={filter.firstName}
            onChange={e =>
              setFilter(f => ({ ...f, firstName: e.target.value }))
            }
            placeholder="Search by first name"
          />
        </label>
      </div>
      <div>
        <label>
          Education:
          <br />
          <input
            type="text"
            value={filter.education}
            onChange={e =>
              setFilter(f => ({ ...f, education: e.target.value }))
            }
            placeholder="Search by education"
          />
        </label>
      </div>
      <div>
        <label>
          Location:
          <br />
          <input
            type="text"
            value={filter.location}
            onChange={e =>
              setFilter(f => ({ ...f, location: e.target.value }))
            }
            placeholder="Search by location"
          />
        </label>
      </div>
      <div>
        <label>
          Hometown:
          <br />
          <input
            type="text"
            value={filter.hometown}
            onChange={e =>
              setFilter(f => ({ ...f, hometown: e.target.value }))
            }
            placeholder="Search by hometown"
          />
        </label>
      </div>
    </div>
  );
}
