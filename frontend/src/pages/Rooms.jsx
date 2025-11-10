import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import './Rooms.css';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/rooms')
      .then(res => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="rooms-page">
      <motion.section 
        className="rooms-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h1>Our Rooms</h1>
          <p>Choose from our selection of luxury accommodations</p>
        </div>
      </motion.section>

      <section className="rooms-list">
        <div className="container">
          <div className="rooms-grid">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                className="room-card-large"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <img src={room.image_url} alt={room.name} />
                <div className="room-info-large">
                  <h2>{room.name}</h2>
                  <p className="description">{room.description}</p>
                  <div className="amenities">
                    <h4>Amenities:</h4>
                    <p>{room.amenities}</p>
                  </div>
                  <div className="room-specs">
                    <span>👥 Max {room.capacity} guests</span>
                    <span>💵 ₹{room.price}/night</span>
                  </div>
                  <Link to={`/booking/${room.id}`} className="btn">Book Now</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Rooms;

