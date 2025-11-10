import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/rooms")
      .then((res) => setRooms(res.data.slice(0, 3)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            Welcome
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Rudaraksh Hotel
          </motion.h1>
          <motion.div
            className="hero-divider"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="hero-subtitle"
          >
            Where Elegance Meets Comfort
          </motion.p>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="hero-description"
          >
            Experience refined luxury in the heart of hospitality
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="hero-actions"
          >
            <Link to="/rooms" className="btn btn-primary">
              Book Your Stay
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Discover More
            </Link>
          </motion.div>
        </div>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <motion.div
            className="stats-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Guests</div>
            </motion.div>
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="stat-number">50+</div>
              <div className="stat-label">Luxury Rooms</div>
            </motion.div>
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="stat-number">10+</div>
              <div className="stat-label">Years Experience</div>
            </motion.div>
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="stat-number">24/7</div>
              <div className="stat-label">Concierge Service</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Hotel Section */}
      <section className="about-hotel-section">
        <div className="container">
          <div className="about-hotel-content">
            <motion.div
              className="about-hotel-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Stay in Opulence and Comfort at Our Hotel
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Perched amid hills and lush green valleys, Rudaraksh Hotel oozes sheer comfort, luxury, and sublime tranquillity. Experience a serene stay at one of the best hotels as the pleasant winds whisper through the pine trees, creating a paradise-like sojourn. It is beautifully spread across a manicured and landscaped estate, surrounded by nothing but pristine nature.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Our location is perfect for couples and leisure travellers who wish to escape chaotic everyday life. Pause, and take a breather at our hotel for a refreshing experience that rejuvenates your mind, body, and soul. Whether you're seeking a romantic getaway or a peaceful retreat, Rudaraksh Hotel offers the perfect blend of luxury and natural beauty.
              </motion.p>
            </motion.div>
            <motion.div
              className="about-hotel-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=1000&fit=crop" 
                alt="Rudaraksh Hotel" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="featured-rooms">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Featured Rooms
          </motion.h2>
          <div className="rooms-grid">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                className="room-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <img src={room.image_url} alt={room.name} />
                <div className="room-info">
                  <h3>{room.name}</h3>
                  <p>{room.description}</p>
                  <div className="room-details">
                    <span>💵 ₹{room.price}</span>
                    <span>👥 Up to {room.capacity} guests</span>
                  </div>
                  <Link to={`/booking/${room.id}`} className="btn">
                    Book Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link to="/rooms" className="btn">
              View All Rooms
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
