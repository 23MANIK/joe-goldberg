// src/components/ProfileDetails.js
import React from "react";

export default function ProfileDetails({ user }) {
  if (!user) return null;
  return (
    <>
      <h1 style={{ marginBottom: "0.5em" }}>
        {user.firstName} {user.lastName}
      </h1>
      <table style={{ marginBottom: "1em" }}>
        <tbody>
          <tr><td>Age:</td><td>{user.age || "n/a"}</td></tr>
          <tr><td>Hometown:</td><td>{user.hometown || "n/a"}</td></tr>
          <tr><td>Job Title:</td><td>{user.jobTitle || "n/a"}</td></tr>
          <tr>
            <td>Education:</td>
            <td>{user.education ? (Array.isArray(user.education) ? user.education.join(", ") : user.education) : "n/a"}</td>
          </tr>
          <tr><td>Location:</td><td>{user.location || "n/a"}</td></tr>
        </tbody>
      </table>
      <h3>Answers:</h3>
      <ol>
        {(user.answers || []).map((a, i) => (
          <li key={i}>{a.response}</li>
        ))}
      </ol>
    </>
  );
}
