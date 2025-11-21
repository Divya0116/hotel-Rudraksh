import { motion } from "framer-motion";
import "./DashboardHome.css";

function DashboardHome() {
  return (
    <motion.div
      className="dashboard-home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Welcome, Admin 👋</h1>
      <p>This is your dashboard. Choose an action from the left.</p>
    </motion.div>
  );
}

export default DashboardHome;
