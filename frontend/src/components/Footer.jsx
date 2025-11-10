import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🌟 Rudaraksh Hotel</h3>
            <p>Your perfect destination for luxury and comfort.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/rooms">Rooms</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>📧 info@rudaraksh.com</p>
            <p>📞 +91 9350969904</p>
            <p>📍 123 Hotel Street, City, Country</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Rudaraksh Hotel. <Link to="/admin">Admin Dashboard</Link> | All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

