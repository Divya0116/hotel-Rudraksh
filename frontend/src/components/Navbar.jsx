import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showSidebar = () => setIsSidebarOpen(true);
  const hideSidebar = () => setIsSidebarOpen(false);

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container nav-container ">
        <div
          className="logo-wrapper"
          onMouseEnter={showSidebar}
          onMouseLeave={hideSidebar}
        >
          <Link to="/" className="logo">
            <h2>Rudraksh</h2>
          </Link>
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.aside
                className="sidebar-menu"
                initial={{ opacity: 0, x: -16, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: -16, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="sidebar-header">
                  <h3>Explore</h3>
                  <p>Quick links to plan your stay</p>
                </div>
                <ul className="sidebar-links">
                  <li>
                    <Link
                      to="/location"
                      className="sidebar-link"
                      onClick={hideSidebar}
                    >
                      Location
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blogs"
                      className="sidebar-link"
                      onClick={hideSidebar}
                    >
                      Blogs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="sidebar-link"
                      onClick={hideSidebar}
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/rooms">Rooms</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {/* <li className="nav-phone">
            <a href="tel:9350969904" className="phone-link">
              <span className="phone-icon" aria-hidden="true">
                📞
              </span>
              9350969904
            </a>
          </li> */}
        </ul>
      </div>
    </motion.nav>
  );
}

export default Navbar;
