import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar/NavBar";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import Upload from "./pages/photo upload/upload";
import Image from "./components/Image/Image";
import Feed from "./components/feed/Feed";

function App() {
  return (
    <>
      <NavBar navigate={useNavigate()} />
      <Routes>
        <Route path="/" element={<Home navigate={useNavigate()} />} />
        <Route
          path="/signup"
          element={<SignupPage navigate={useNavigate()} />}
        />
        <Route path="/upload" element={<Upload navigate={useNavigate()} />} />
        <Route path="/login" element={<LoginPage navigate={useNavigate()} />} />
        <Route path="/feed" element={<Feed navigate={useNavigate()} />} />
        <Route path="/image" element={<Image navigate={useNavigate()} />} />
      </Routes>
    </>
  );
}

export default App;
