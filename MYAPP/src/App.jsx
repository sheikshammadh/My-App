import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import HomePage from "./Components/Home.jsx";
import ProfilePage from "./Components/ProfilePage.jsx";

function App() {
  const [user, setUser] = useState(null);

  // If user not signed up yet, show Signup page only (no routes)
  if (!user) {
    return <Signup onSignupSuccess={(userData) => setUser(userData)} />;
  }

  // User signed in — show app routes
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
