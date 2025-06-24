// src/Components/TwoUserChat.jsx
import React, { useState } from "react";

export default function TwoUserChat() {
  const [messages, setMessages] = useState([]);
  const [userAMessage, setUserAMessage] = useState("");
  const [userBMessage, setUserBMessage] = useState("");

  const sendMessage = (sender, content) => {
    if (content.trim() === "") return;
    setMessages([...messages, { sender, content }]);
  };

  return (
    <div style={styles.chatContainer}>
      <h2>Two-User Chat</h2>

      <div style={styles.chatBox}>
        {messages.length === 0 ? (
          <p style={styles.noMsg}>No messages yet.</p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                ...styles.message,
                alignSelf: msg.sender === "User A" ? "flex-start" : "flex-end",
                backgroundColor: msg.sender === "User A" ? "#e1ffc7" : "#dbeafe",
              }}
            >
              <strong>{msg.sender}:</strong> {msg.content}
            </div>
          ))
        )}
      </div>

      {/* User A */}
      <div style={styles.inputSection}>
        <textarea
          value={userAMessage}
          onChange={(e) => setUserAMessage(e.target.value)}
          placeholder="User A: Type a message"
          style={styles.textarea}
        />
        <button
          onClick={() => {
            sendMessage("User A", userAMessage);
            setUserAMessage("");
          }}
          style={styles.button}
        >
          Send as A
        </button>
      </div>

      {/* User B */}
      <div style={styles.inputSection}>
        <textarea
          value={userBMessage}
          onChange={(e) => setUserBMessage(e.target.value)}
          placeholder="User B: Type a message"
          style={styles.textarea}
        />
        <button
          onClick={() => {
            sendMessage("User B", userBMessage);
            setUserBMessage("");
          }}
          style={styles.button}
        >
          Send as B
        </button>
      </div>
    </div>
  );
}

const styles = {
  chatContainer: {
    maxWidth: 600,
    margin: "20px auto",
    padding: 16,
    fontFamily: "Segoe UI, sans-serif",
    border: "1px solid #ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  chatBox: {
    height: 250,
    overflowY: "auto",
    border: "1px solid #aaa",
    padding: 12,
    marginBottom: 20,
    borderRadius: 6,
    backgroundColor: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  message: {
    padding: "8px 12px",
    borderRadius: 16,
    maxWidth: "70%",
    fontSize: 14,
  },
  textarea: {
    width: "100%",
    padding: 8,
    borderRadius: 6,
    border: "1px solid #ccc",
    resize: "none",
    fontSize: 14,
  },
  inputSection: {
    marginBottom: 16,
  },
  button: {
    marginTop: 6,
    padding: "8px 16px",
    backgroundColor: "#007aff",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  noMsg: {
    color: "#888",
    fontStyle: "italic",
  },
};
