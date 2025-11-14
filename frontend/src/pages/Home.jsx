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
  const [roomLayout, setRoomLayout] = useState(() => {
    if (typeof window === "undefined") {
      return "list";
    }
    return localStorage.getItem("home-room-layout") || "list";
  });
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

  const guestReviews = useMemo(
    () => [
      {
        id: 1,
        name: "Neha Sharma",
        role: "Solo Traveler",
        avatar:
          "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=60",
        rating: 5,
        quote:
          "The rooms were spotless and the staff made sure I felt at home. Perfect stop for a peaceful getaway.",
      },
      {
        id: 2,
        name: "Arjun Mehta",
        role: "Business Guest",
        avatar:
          "https://images.unsplash.com/photo-1544723795-3fb7ec5d46a9?auto=format&fit=crop&w=300&q=60",
        rating: 4,
        quote:
          "Great value for money and very convenient location. Loved the quick check-in and warm hospitality.",
      },
      {
        id: 3,
        name: "Priya & Rohan",
        role: "Family Stay",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=60",
        rating: 5,
        quote:
          "Our family room was spacious and cozy. The kids still talk about the breakfast! Highly recommend.",
      },
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
    if (typeof window !== "undefined") {
      localStorage.setItem("home-room-layout", roomLayout);
    }
  }, [roomLayout]);

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

  const handleLayoutChange = (layout) => () => setRoomLayout(layout);

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
            Rudraksh
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
                Stay in Comfort and Simplicity at Hotel Rudraksh
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Welcome to Hotel Rudraksh, your cozy stay in the heart of
                Pinjore, located conveniently on Nalagarh Road. We believe in
                offering comfort, cleanliness, and warm hospitality without
                unnecessary frills. Whether you're stopping by for a short break
                or a peaceful night’s rest, Hotel Rudraksh provides a calm and
                homely atmosphere that makes every guest feel at ease. With
                well-maintained rooms, friendly service, and an easy-to-reach
                location, we’re here to make your stay simple, comfortable, and
                satisfying — just the way you like it.
              </motion.p>
            </motion.div>
            <motion.div
              className="about-hotel-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src="/hotel entrance.jpeg" alt="Rudaraksh Hotel" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="featured-rooms">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="featured-rooms-title"
          >
            Featured Rooms
          </motion.h2>
          <div
            className="rooms-layout-toggle"
            role="group"
            aria-label="Room layout"
          >
            <div className="layout-toggle">
              <button
                type="button"
                onClick={handleLayoutChange("list")}
                className={`layout-toggle-button ${
                  roomLayout === "list" ? "active" : ""
                }`}
                aria-pressed={roomLayout === "list"}
              >
                <span aria-hidden="true">☰</span>
                <span className="toggle-text">List</span>
              </button>
              <button
                type="button"
                onClick={handleLayoutChange("grid")}
                className={`layout-toggle-button ${
                  roomLayout === "grid" ? "active" : ""
                }`}
                aria-pressed={roomLayout === "grid"}
              >
                <span aria-hidden="true">▦</span>
                <span className="toggle-text">Grid</span>
              </button>
            </div>
          </div>
          <div className={`rooms-grid rooms-grid--${roomLayout}`}>
            {rooms.map((room, index) => {
              const nightlyRate = Number(room.price);
              const formatCurrency = (value, fractionDigits = 0) => {
                if (!Number.isFinite(value)) {
                  return null;
                }
                return value.toLocaleString("en-IN", {
                  minimumFractionDigits: fractionDigits,
                  maximumFractionDigits: fractionDigits,
                });
              };

              return (
                <motion.div
                  key={room.id}
                  className="room-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="room-card-media">
                    <img
                      src={room.image_url}
                      alt={room.name}
                      className="room-card-image"
                    />
                  </div>
                  <div className="room-card-body">
                    <h3 className="room-card-title">{room.name}</h3>
                    <div className="room-card-price">
                      {Number.isFinite(nightlyRate) && (
                        <div className="room-card-price-current">
                          ₹{formatCurrency(nightlyRate)}
                          <span>INR / Night</span>
                        </div>
                      )}
                    </div>
                    <div className="room-card-actions">
                      <Link
                        to={`/booking/${room.id}`}
                        className="btn room-card-button"
                      >
                        Book Now
                      </Link>
                      <Link to="/rooms" className="room-card-more">
                        More details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link to="/rooms" className="btn view-all-rooms-btn">
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="reviews-title"
          >
            Guest Reviews
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="reviews-subtitle"
          >
            Real stories from guests who chose the comfort of Hotel Rudraksh.
          </motion.p>
          <div className="reviews-grid">
            {guestReviews.map((review, index) => (
              <motion.article
                key={review.id}
                className="review-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="review-card-header">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="review-card-avatar"
                  />
                  <div>
                    <h3 className="review-card-name">{review.name}</h3>
                    <p className="review-card-role">{review.role}</p>
                    <div className="review-card-rating" aria-label="Rating">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <span
                          key={starIndex}
                          className={
                            starIndex < review.rating ? "star active" : "star"
                          }
                          aria-hidden="true"
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="review-card-quote">“{review.quote}”</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
