import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios.get('http://localhost:5000/api/bookings')
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const updateStatus = (id, status) => {
    axios.put(`http://localhost:5000/api/bookings/${id}`, { status })
      .then(() => {
        fetchBookings();
      })
      .catch(err => console.error(err));
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-dashboard">
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>Manage all bookings and reservations</p>
        </div>
      </motion.div>

      <div className="container">
        <div className="stats">
          <motion.div 
            className="stat-card"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h3>Total Bookings</h3>
            <p className="stat-number">{bookings.length}</p>
          </motion.div>
          <motion.div 
            className="stat-card"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Pending</h3>
            <p className="stat-number">{bookings.filter(b => b.status === 'pending').length}</p>
          </motion.div>
          <motion.div 
            className="stat-card"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3>Confirmed</h3>
            <p className="stat-number">{bookings.filter(b => b.status === 'confirmed').length}</p>
          </motion.div>
          <motion.div 
            className="stat-card"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3>Cancelled</h3>
            <p className="stat-number">{bookings.filter(b => b.status === 'cancelled').length}</p>
          </motion.div>
        </div>

        <motion.div 
          className="bookings-table"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2>All Bookings</h2>
          
          {bookings.length === 0 ? (
            <p className="no-bookings">No bookings yet</p>
          ) : (
            <div className="bookings-grid">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  className="booking-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="booking-header">
                    <h3>{booking.room_name}</h3>
                    <span className={`status-badge ${booking.status}`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="booking-details">
                    <p><strong>Guest:</strong> {booking.guest_name}</p>
                    <p><strong>Email:</strong> {booking.guest_email}</p>
                    <p><strong>Phone:</strong> {booking.guest_phone}</p>
                    <p><strong>Check-in:</strong> {new Date(booking.check_in).toLocaleDateString()}</p>
                    <p><strong>Check-out:</strong> {new Date(booking.check_out).toLocaleDateString()}</p>
                    <p><strong>Guests:</strong> {booking.guests}</p>
                    <p><strong>Total Price:</strong> ₹{booking.total_price}</p>
                  </div>

                  <div className="booking-actions">
                    <button 
                      className="btn btn-sm btn-success"
                      onClick={() => updateStatus(booking.id, 'confirmed')}
                    >
                      Confirm
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => updateStatus(booking.id, 'cancelled')}
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default AdminDashboard;

