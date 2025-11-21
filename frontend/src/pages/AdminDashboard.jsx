import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardHome from "./admin/DashboardHome";
import Bookings from "./admin/Bookings";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate("/");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardHome />;
      case "bookings":
        return <Bookings />;
      case "contact":
        return (
          <div className="admin-content">
            <h2>Contact Messages</h2>
            <p>Contact messages coming soon...</p>
          </div>
        );
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="admin-panel">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-link ${
              activeSection === "dashboard" ? "active" : ""
            }`}
            onClick={() => setActiveSection("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`nav-link ${
              activeSection === "bookings" ? "active" : ""
            }`}
            onClick={() => setActiveSection("bookings")}
          >
            Reservations
          </button>
          <button
            className={`nav-link ${
              activeSection === "contact" ? "active" : ""
            }`}
            onClick={() => setActiveSection("contact")}
          >
            Contact Messages
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>
      <main className="admin-main">{renderContent()}</main>
    </div>
  );
}

export default AdminDashboard;
