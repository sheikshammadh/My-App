import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";

const initialPosts = [
  {
    id: 1,
    type: "post",
    username: "alice",
    profilePic: "https://i.pravatar.cc/40?img=1",
    mediaType: "image",
    mediaUrl: "https://placekitten.com/400/300",
    caption: "Loving this cute kitten! 🐱",
    likes: 0,
    likedByUser: false,
  },
  {
    id: 2,
    type: "post",
    username: "bob",
    profilePic: "https://i.pravatar.cc/40?img=2",
    mediaType: "image",
    mediaUrl: "https://placekitten.com/401/300",
    caption: "Sunset vibes 🌅",
    likes: 0,
    likedByUser: false,
  },
];

const sampleUsers = [
  { username: "alice" },
  { username: "bob" },
  { username: "charlie" },
  { username: "dave" },
  { username: "shammadh" },
];

const initialStories = ["alice", "bob", "carol", "dave"];

export default function HomePage() {
  const [posts, setPosts] = useState(initialPosts);
  const [stories, setStories] = useState(initialStories);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [newContent, setNewContent] = useState({
    mediaType: "image",
    caption: "",
    type: "post",
    username: "",
    profilePic: "",
    mediaUrl: "",
  });

  useEffect(() => {
    document.body.classList.toggle("dark-theme", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        const type = Math.random() > 0.5 ? "post" : "reel";
        const userId = Math.floor(Math.random() * 10) + 1;
        const randomId = Math.floor(Math.random() * 1000);
        const mediaType = Math.random() > 0.5 ? "image" : "video";
        const mediaUrl =
          mediaType === "image"
            ? `https://placekitten.com/${400 + (userId % 3)}/${300 + (userId % 3)}`
            : `https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_5mb.mp4`;

        const randomPost = {
          id: Date.now(),
          type,
          username: `user${userId}`,
          profilePic: `https://i.pravatar.cc/40?img=${userId}`,
          mediaType,
          mediaUrl,
          caption: type === "post" ? `Random moment 🧸 #${randomId}` : null,
          likes: 0,
          likedByUser: false,
        };
        setPosts((prev) => [...prev, randomPost]);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const liked = !post.likedByUser;
          return {
            ...post,
            likedByUser: liked,
            likes: liked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  const goToProfile = (username) => {
    navigate(`/profile/${username}`);
  };

  const filteredUsers = sampleUsers.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddContent = (e) => {
    e.preventDefault();
    const { username, profilePic, mediaUrl, mediaType, caption, type } = newContent;
    if (!username || !profilePic || !mediaUrl) {
      alert("Please fill in username, profile pic URL, and media URL.");
      return;
    }
    if (type === "post") {
      const newPost = {
        id: Date.now(),
        type: "post",
        username,
        profilePic,
        mediaType,
        mediaUrl,
        caption,
        likes: 0,
        likedByUser: false,
      };
      setPosts((prev) => [newPost, ...prev]);
    } else if (type === "story") {
      if (!stories.includes(username)) {
        setStories((prev) => [username, ...prev]);
      }
    }
    setNewContent({
      username: "",
      profilePic: "",
      mediaUrl: "",
      mediaType: "image",
      caption: "",
      type: "post",
    });
    setShowAddForm(false);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="app-title">MyGram</h1>
        <div className="search-wrapper">
          <input
            type="search"
            placeholder="Search username..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span role="img" aria-label="search">
            🔍
          </span>
        </div>
        <button
          className="add-post-btn"
          onClick={() => setShowAddForm((prev) => !prev)}
          aria-label="Add new post or story"
        >
          ＋
        </button>
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          style={{ fontSize: "20px", background: "none", border: "none", cursor: "pointer", marginLeft: "10px" }}
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
      </header>

      {searchTerm && (
        <div className="search-results">
          {filteredUsers.length === 0 ? (
            <p className="noMatch">No users found.</p>
          ) : (
            <ul>
              {filteredUsers.map((user, i) => (
                <li key={i}>
                  <Link to={`/profile/${user.username}`} className="search-user-link">
                    {user.username}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {showAddForm && (
        <section className="add-content-section">
          <h2>Add New Post or Story</h2>
          <form onSubmit={handleAddContent}>
            <label>
              Username:<br />
              <input type="text" name="username" value={newContent.username} onChange={handleInputChange} required />
            </label>
            <label>
              Profile Picture URL:<br />
              <input type="text" name="profilePic" value={newContent.profilePic} onChange={handleInputChange} required />
            </label>
            <label>
              Media URL:<br />
              <input type="text" name="mediaUrl" value={newContent.mediaUrl} onChange={handleInputChange} required />
            </label>
            <label>
              Media Type:<br />
              <select name="mediaType" value={newContent.mediaType} onChange={handleInputChange}>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </label>
            <label>
              Caption:<br />
              <input type="text" name="caption" value={newContent.caption} onChange={handleInputChange} />
            </label>
            <label>
              Type:<br />
              <select name="type" value={newContent.type} onChange={handleInputChange}>
                <option value="post">Post</option>
                <option value="story">Story</option>
              </select>
            </label>
            <button type="submit">Add</button>
          </form>
        </section>
      )}

      <section className="stories-section">
        <div className="stories-row">
          {stories.map((name, i) => (
            <div key={i} className="story-card" onClick={() => goToProfile(name)}>
              <img src={`https://i.pravatar.cc/60?u=${name}`} alt={name} className="story-img" />
              <small>{name}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="feed-section">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header" onClick={() => goToProfile(post.username)}>
              <img src={post.profilePic} alt={post.username} className="post-profile-pic" />
              <strong>{post.username}</strong>
            </div>
            {post.mediaType === "image" ? (
              <img src={post.mediaUrl} alt={post.type} className="post-image" />
            ) : (
              <video src={post.mediaUrl} controls className="post-image" />
            )}
            <div className="post-actions">
              <button className="action-btn" onClick={() => toggleLike(post.id)}>
                {post.likedByUser ? "❤️" : "♥️"}
              </button>
              <span>{post.likes}</span>
              <button className="action-btn">💬</button>
              <button className="action-btn">📤</button>
              <button className="action-btn save-btn">🔖</button>
            </div>
            <p className="post-caption">
              <strong>{post.username}</strong> {post.caption}
            </p>
          </div>
        ))}
      </section>

      <nav className="bottom-nav">
        <button className="nav-btn">🏠</button>
        <button className="nav-btn">🔍</button>
        <button className="nav-btn">🎮</button>
        <button className="nav-btn">🔔</button>
        <button className="nav-btn">👤</button>
      </nav>
    </div>
  );
}