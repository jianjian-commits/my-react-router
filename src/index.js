import React from "react";
import { createRoot } from "react-dom/client";
import {HashRouter, Routes, Route } from './react-router-dom'
import Home from './pages/Home'
import User from './pages/User'
import Profile from './pages/Profile'

createRoot(document.getElementById("root")).render(
  <HashRouter>  
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<User />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </HashRouter>
);
