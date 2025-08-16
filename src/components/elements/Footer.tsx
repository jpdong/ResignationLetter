import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col col-4">
          <h3>Resignation Letter Template</h3>
          <p>Create professional resignation letters with our easy-to-use templates. Choose from various scenarios, customize with your details, and download in multiple formats. Simple, fast, and free to use!</p>
        </div>
        <div className="col col-4">
          <h3>Resources</h3>
          <ul>
            <li><Link href="#templates">Letter Templates</Link></li>
            <li><Link href="#guide">Writing Guide</Link></li>
            <li><Link href="#faq">FAQ</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className="col col-4">
          <h3>Support</h3>
          <ul>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-of-use">Terms of Use</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2025 Resignation Letter Template. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
