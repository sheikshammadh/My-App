import React, { useState } from "react";

export default function Signup({ onSignupSuccess }) {
  const [step, setStep] = useState(1); // 1: enter details, 2: enter OTP
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [error, setError] = useState("");

  // Fake OTP sending function
  const sendOtp = () => {
    // Generate a 4-digit OTP (for demo only)
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    alert(`OTP sent to ${formData.phone}: ${newOtp}`); // In real app, send SMS here
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    const { name, email, phone } = formData;
    if (!name || !email || !phone) {
      setError("All fields are required.");
      return;
    }
    setError("");
    sendOtp();
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      onSignupSuccess(formData);
    } else {
      setError("Incorrect OTP. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      {step === 1 && (
        <>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmitDetails} style={styles.form}>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={styles.input}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Send OTP</button>
          </form>
          {error && <p style={styles.error}>{error}</p>}
        </>
      )}

      {step === 2 && (
        <>
          <h2>Verify OTP</h2>
          <form onSubmit={handleVerifyOtp} style={styles.form}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={styles.input}
              maxLength={4}
            />
            <button type="submit" style={styles.button}>Verify</button>
          </form>
          {error && <p style={styles.error}>{error}</p>}
          <button
            onClick={() => {
              setStep(1);
              setError("");
              setOtp("");
            }}
            style={{ ...styles.button, backgroundColor: "#999", marginTop: 10 }}
          >
            Resend OTP
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 320,
    margin: "100px auto",
    padding: 24,
    border: "1px solid #ddd",
    borderRadius: 8,
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#fafafa",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  button: {
    padding: 12,
    backgroundColor: "#007aff",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
};
