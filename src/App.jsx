import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Components/Home";
import ResetPasswordPage from "./Components/ResetPasswordPage";

function App(props) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Preset" element={<ResetPasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;
