import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detection from './pages/Detection';
import './index.css';

// Wrapper to add route transition classes (optional, keeping it simple for now)
const AppContent = () => {
  return (
    <div className="app-container">
      <div className="background-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            '--delay': `${Math.random() * 5}s`,
            '--duration': `${10 + Math.random() * 10}s`,
            '--left': `${Math.random() * 100}%`
          }}></div>
        ))}
      </div>

      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detect" element={<Detection />} />
        </Routes>
      </main>

      <footer className="app-footer container">
        <p>© {new Date().getFullYear()} TomatoGuard AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
