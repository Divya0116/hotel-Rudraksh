import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import "./Booking.css";

function Booking() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    guest_name: "",
    guest_email: "",
    guest_phone: "",
    check_in: "",
    check_out: "",
    guests: 1,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/rooms/${id}`)
      .then((res) => {
        setRoom(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkIn = new Date(formData.check_in);
    const checkOut = new Date(formData.check_out);
    const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const total_price = room.price * days;

    const bookingData = {
      ...formData,
      room_id: room.id,
      total_price,
    };

    axios
      .post("http://localhost:5000/api/bookings", bookingData)
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!room) return <div className="error">Room not found</div>;

  return (
    <div className="booking-page">
      {submitted ? (
        <motion.div
          className="success-message"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <h2>✅ Booking Successful!</h2>
          <p>Thank you for booking with us. We'll contact you shortly.</p>
        </motion.div>
      ) : (
        <div className="container">
          <div className="booking-layout">
            <motion.div
              className="room-summary"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={`http://localhost:5000${room.image_url}`}
                alt={room.name}
              />
              <h2>{room.name}</h2>
              <p>{room.description}</p>
              <div className="room-details">
                <p>
                  <strong>Price:</strong> ₹{room.price}/night
                </p>
                <p>
                  <strong>Capacity:</strong> Up to {room.capacity} guests
                </p>
                <p>
                  <strong>Amenities:</strong> {room.amenities}
                </p>
              </div>
            </motion.div>

            <motion.form
              className="booking-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2>Booking Details</h2>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="guest_name"
                  value={formData.guest_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="guest_email"
                  value={formData.guest_email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="guest_phone"
                  value={formData.guest_phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Check-in</label>
                  <input
                    type="date"
                    name="check_in"
                    value={formData.check_in}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Check-out</label>
                  <input
                    type="date"
                    name="check_out"
                    value={formData.check_out}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Number of Guests</label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  max={room.capacity}
                  required
                />
              </div>

              <button type="submit" className="btn btn-submit">
                Confirm Booking
              </button>
            </motion.form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;
