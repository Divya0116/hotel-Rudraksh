import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./Home.css";

const formatDate = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toISOString().split("T")[0];
};

function Home() {
  const [rooms, setRooms] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const today = useMemo(() => formatDate(new Date()), []);
  const tomorrow = useMemo(() => {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    return formatDate(nextDay);
  }, []);
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: today,
    checkOut: tomorrow,
    adults: "2",
    children: "0",
    promoCode: "",
  });

  const carouselImages = useMemo(
    () => [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600x",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&h=900&fit=crop",
      "https://images.pexels.com/photos/635041/pexels-photo-635041.jpeg?_gl=1*1t3wepj*_ga*NTkzMTcxNDU1LjE3MjYxMzU4NDA.*_ga_8JE65Q40S6*czE3NjI4NTM0MzIkbzQkZzAkdDE3NjI4NTM0MzIkajYwJGwwJGgw",
    ],
    []
  );

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/rooms")
      .then((res) => setRooms(res.data.slice(0, 3)))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const minCheckoutDate = useMemo(() => {
    const base = new Date(bookingDetails.checkIn || today);
    if (Number.isNaN(base.getTime())) {
      return tomorrow;
    }
    base.setDate(base.getDate() + 1);
    return formatDate(base);
  }, [bookingDetails.checkIn, today, tomorrow]);

  const handleBookingChange = (field) => (event) => {
    const { value } = event.target;
    setBookingDetails((prev) => {
      if (field === "checkIn") {
        const checkInDate = new Date(value);
        let updatedCheckOut = prev.checkOut;

        if (!Number.isNaN(checkInDate.getTime())) {
          const requiredCheckout = new Date(checkInDate);
          requiredCheckout.setDate(requiredCheckout.getDate() + 1);

          const prevCheckoutDate = new Date(prev.checkOut);
          if (
            Number.isNaN(prevCheckoutDate.getTime()) ||
            prevCheckoutDate <= checkInDate
          ) {
            updatedCheckOut = formatDate(requiredCheckout);
          }
        }

        return {
          ...prev,
          checkIn: value,
          checkOut: updatedCheckOut,
        };
      }

      if (field === "checkOut") {
        const checkoutDate = new Date(value);
        const minimumDate = new Date(minCheckoutDate);
        if (
          !Number.isNaN(checkoutDate.getTime()) &&
          checkoutDate >= minimumDate
        ) {
          return { ...prev, checkOut: value };
        }
        return { ...prev, checkOut: minCheckoutDate };
      }

      return { ...prev, [field]: value };
    });
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    navigate("/rooms", { state: bookingDetails });
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-background">
          {carouselImages.map((image, index) => (
            <motion.img
              key={image}
              src={image}
              alt=""
              aria-hidden="true"
              className={`hero-slide ${index === currentSlide ? "active" : ""}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 1.2 }}
            />
          ))}
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Hotel Rudraksh
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
          <motion.form
            className="booking-widget"
            onSubmit={handleBookingSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
          >
            <div className="booking-field">
              <label htmlFor="booking-check-in">Check In</label>
              <div className="booking-input">
                <input
                  id="booking-check-in"
                  type="date"
                  value={bookingDetails.checkIn}
                  min={today}
                  onChange={handleBookingChange("checkIn")}
                  required
                />
              </div>
            </div>
            <div className="booking-field">
              <label htmlFor="booking-check-out">Check Out</label>
              <div className="booking-input">
                <input
                  id="booking-check-out"
                  type="date"
                  value={bookingDetails.checkOut}
                  min={minCheckoutDate}
                  onChange={handleBookingChange("checkOut")}
                  required
                />
              </div>
            </div>
            <div className="booking-field">
              <label htmlFor="booking-adults">Adults</label>
              <div className="booking-input">
                <select
                  id="booking-adults"
                  value={bookingDetails.adults}
                  onChange={handleBookingChange("adults")}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
            <div className="booking-field">
              <label htmlFor="booking-children">Children</label>
              <div className="booking-input">
                <select
                  id="booking-children"
                  value={bookingDetails.children}
                  onChange={handleBookingChange("children")}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
           
            {/* <div className="booking-rate">
              From <span>₹9,750</span> INR/Night
            </div> */}
            <button type="submit" className="booking-submit">
              Book Now
            </button>
            <div className="booking-direct">Book Direct!</div>
          </motion.form>
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
                Perched amid hills and lush green valleys, Rudaraksh Hotel oozes
                sheer comfort, luxury, and sublime tranquillity. Experience a
                serene stay at one of the best hotels as the pleasant winds
                whisper through the pine trees, creating a paradise-like
                sojourn. It is beautifully spread across a manicured and
                landscaped estate, surrounded by nothing but pristine nature.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Our location is perfect for couples and leisure travellers who
                wish to escape chaotic everyday life. Pause, and take a breather
                at our hotel for a refreshing experience that rejuvenates your
                mind, body, and soul. Whether you're seeking a romantic getaway
                or a peaceful retreat, Rudaraksh Hotel offers the perfect blend
                of luxury and natural beauty.
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
