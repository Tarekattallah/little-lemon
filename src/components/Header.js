import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

/**
 * Header component - navigation bar with logo and links
 */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header" role="banner">
      <div className="container header__inner">
        {/* Logo */}
        <Link to="/" aria-label="Little Lemon - Go to homepage">
          <div className="header__logo">
            <span className="logo-text">🍋 Little Lemon</span>
          </div>
        </Link>

        {/* Mobile menu button */}
        <button
          className="header__menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation */}
        <nav
          id="main-nav"
          className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}
          aria-label="Main navigation"
        >
          <ul role="list">
            <li><NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/booking" onClick={() => setMenuOpen(false)}>Book a Table</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
