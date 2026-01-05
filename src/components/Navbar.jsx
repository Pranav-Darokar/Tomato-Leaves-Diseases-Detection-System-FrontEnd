import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar glass-panel">
            <div className="container navbar-content">
                <NavLink to="/" className="nav-logo" onClick={() => setIsOpen(false)}>
                    <Leaf size={28} className="logo-icon" />
                    <span className="logo-text">TomatoGuard</span>
                </NavLink>

                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <NavLink
                        to="/"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/detect"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => setIsOpen(false)}
                    >
                        Disease Detection
                    </NavLink>
                </div>

                <button className="mobile-menu-btn" onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
