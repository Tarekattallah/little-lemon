import React from 'react';
import './Footer.css';

/**
 * Footer component
 */
function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <p className="footer__brand">🍋 Little Lemon</p>
        <p className="footer__copy">© 2024 Little Lemon Restaurant. All rights reserved.</p>
        <address className="footer__address">
          123 Main Street, Chicago, Illinois
        </address>
      </div>
    </footer>
  );
}

export default Footer;
