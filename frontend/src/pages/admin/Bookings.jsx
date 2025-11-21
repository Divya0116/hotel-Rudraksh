import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./Bookings.css";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios
      .get("http://localhost:5000/api/bookings")
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const updateStatus = (id, status) => {
    axios
      .put(`http://localhost:5000/api/bookings/${id}`, { status })
      .then(() => {
        fetchBookings();
      })
      .catch((err) => console.error(err));
  };

  if (loading) {
    return (
      <div className="bookings-container">
        <div className="loading">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="bookings-container">
      <motion.div
        className="bookings-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Reservations</h1>
        <p>Manage all booking requests and reservations</p>
      </motion.div>

      <div className="bookings-stats">
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
          <p className="stat-number">
            {bookings.filter((b) => b.status === "pending").length}
          </p>
        </motion.div>
        <motion.div
          className="stat-card"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3>Confirmed</h3>
          <p className="stat-number">
            {bookings.filter((b) => b.status === "confirmed").length}
          </p>
        </motion.div>
        <motion.div
          className="stat-card"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3>Cancelled</h3>
          <p className="stat-number">
            {bookings.filter((b) => b.status === "cancelled").length}
          </p>
        </motion.div>
      </div>

      <motion.div
        className="bookings-list"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {bookings.length === 0 ? (
          <div className="no-bookings">
            <p>No bookings yet</p>
          </div>
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
                  <h3>{booking.room_name || "Room"}</h3>
                  <span className={`status-badge ${booking.status}`}>
                    {booking.status || "pending"}
                  </span>
                </div>

                <div className="booking-details">
                  <div className="detail-row">
                    <strong>Guest Name:</strong>
                    <span>{booking.guest_name}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Email:</strong>
                    <span>{booking.guest_email}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Phone:</strong>
                    <span>{booking.guest_phone}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Check-in:</strong>
                    <span>
                      {new Date(booking.check_in).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="detail-row">
                    <strong>Check-out:</strong>
                    <span>
                      {new Date(booking.check_out).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="detail-row">
                    <strong>Number of Guests:</strong>
                    <span>{booking.guests}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Total Price:</strong>
                    <span>₹{booking.total_price}</span>
                  </div>
                  {booking.created_at && (
                    <div className="detail-row">
                      <strong>Booking Date:</strong>
                      <span>
                        {new Date(booking.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  )}
                </div>

                {booking.status === "pending" && (
                  <div className="booking-actions">
                    <button
                      className="btn btn-accept"
                      onClick={() => updateStatus(booking.id, "confirmed")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-cancel"
                      onClick={() => updateStatus(booking.id, "cancelled")}
                    >
                      Cancel
                    </button>
                  </div>
                )}
                {booking.status === "confirmed" && (
                  <div className="booking-actions">
                    <button
                      className="btn btn-cancel"
                      onClick={() => updateStatus(booking.id, "cancelled")}
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
                {booking.status === "cancelled" && (
                  <div className="booking-actions">
                    <button
                      className="btn btn-accept"
                      onClick={() => updateStatus(booking.id, "pending")}
                    >
                      Restore
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Bookings;
