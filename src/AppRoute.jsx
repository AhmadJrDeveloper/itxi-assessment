// AppRoute.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Artist from './pages/Artist/Artist'; 
import Album from './pages/Album/Album';
const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artist-search" element={<Artist />} />
        <Route path="/artist-album/:uri" element={<Album />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
