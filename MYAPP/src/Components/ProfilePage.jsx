// src/Components/ProfilePage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import MessagingBox from "./MessagingBox";
import TwoUserChat from "./Chat";

export default function ProfilePage() {
  const { username } = useParams();

  const userInfo = {
    username,
    bio: "Passionate about travel, coding & cats 🐾",
    followers: 231,
    following: 180,
    posts: [
      "https://placekitten.com/200/200",
      "https://placekitten.com/201/200",
      "https://placekitten.com/202/200",
    ],
  };

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backLink}>← Back</Link>
      <h2>{userInfo.username}</h2>
      <p style={styles.bio}>{userInfo.bio}</p>
      <div style={styles.stats}>
        <span>Followers: {userInfo.followers}</span>
        <span>Following: {userInfo.following}</span>
      </div>
      <h3>Posts</h3>
      <div style={styles.gallery}>
        {userInfo.posts.map((url, i) => (
          <img key={i} src={url} alt="user post" style={styles.thumb} />
        ))}
      </div>

      {/* MessagingBox shown here */}
      <MessagingBox />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: "20px auto",
    fontFamily: "Segoe UI, sans-serif",
    padding: 16,
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  bio: {
    fontStyle: "italic",
    color: "#444",
    marginBottom: 10,
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  gallery: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginBottom: 20,
  },
  thumb: {
    width: "30%",
    borderRadius: 8,
    objectFit: "cover",
  },
  backLink: {
    textDecoration: "none",
    fontSize: 14,
    color: "#007aff",
    marginBottom: 12,
    display: "inline-block",
  },
};
