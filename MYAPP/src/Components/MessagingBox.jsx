// src/Components/MessagingBox.jsx
import React, { useState } from "react";

export default function MessagingBox() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const handleSend = () => {
    if (message.trim() === "") return;
    setChatLog([...chatLog, message.trim()]);
    setMessage("");
  };

  return (
    <div style={styles.container}>
      <h3>Send a Message</h3>
      <div style={styles.chatBox}>
        {chatLog.length === 0 ? (
          <p style={styles.noMsg}>No messages yet.</p>
        ) : (
          chatLog.map((msg, idx) => (
            <div key={idx} style={styles.message}>
              {msg}
            </div>
          ))
        )}
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        style={styles.textarea}
        rows={3}
      />
      <button onClick={handleSend} style={styles.button}>
        Send
      </button>
    </div>
  );
}

const styles = {
  container: {
    border: "1px solid #ddd",
    padding: 16,
    borderRadius: 8,
    maxWidth: 400,
    marginTop: 20,
    backgroundColor: "#fafafa",
  },
  chatBox: {
    height: 150,
    overflowY: "auto",
    border: "1px solid #ccc",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  noMsg: {
    color: "#888",
    fontStyle: "italic",
  },
  message: {
    backgroundColor: "#e1ffc7",
    padding: "8px 12px",
    borderRadius: 16,
    marginBottom: 6,
    maxWidth: "80%",
  },
  textarea: {
    width: "100%",
    borderRadius: 8,
    border: "1px solid #ccc",
    padding: 8,
    resize: "none",
    fontSize: 14,
  },
  button: {
    marginTop: 8,
    padding: "8px 16px",
    backgroundColor: "#007aff",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};
