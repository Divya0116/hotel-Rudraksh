import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import "./Rooms.css";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/rooms")
      .then((res) => {
        // Debug: Log first room to see structure
        if (res.data && res.data.length > 0) {
          console.log("Sample room object:", res.data[0]);
          console.log("Room ID:", res.data[0].id || res.data[0]._id);
        }
        setRooms(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Group rooms by category
  const roomsByCategory = useMemo(() => {
    const grouped = {
      AC: [],
      "Non-AC": [],
    };
    rooms.forEach((room) => {
      if (room.category === "AC") {
        grouped.AC.push(room);
      } else if (room.category === "Non-AC") {
        grouped["Non-AC"].push(room);
      }
    });
    return grouped;
  }, [rooms]);

  // Filter rooms based on selected category
  const filteredRooms = useMemo(() => {
    if (selectedFilter === "All") {
      return rooms;
    } else if (selectedFilter === "AC") {
      return roomsByCategory.AC;
    } else if (selectedFilter === "Non-AC") {
      return roomsByCategory["Non-AC"];
    }
    return rooms;
  }, [rooms, roomsByCategory, selectedFilter]);

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
          <p>Choose from our selection of AC and Non-AC accommodations</p>
        </div>
      </motion.section>

      <section className="rooms-list">
        <div className="container">
          {/* Filter Buttons */}
          <div className="room-filters">
            <button
              className={`filter-btn ${
                selectedFilter === "All" ? "active" : ""
              }`}
              onClick={() => setSelectedFilter("All")}
            >
              All Rooms
            </button>
            <button
              className={`filter-btn ${
                selectedFilter === "AC" ? "active" : ""
              }`}
              onClick={() => setSelectedFilter("AC")}
            >
              AC Rooms
            </button>
            <button
              className={`filter-btn ${
                selectedFilter === "Non-AC" ? "active" : ""
              }`}
              onClick={() => setSelectedFilter("Non-AC")}
            >
              Non-AC Rooms
            </button>
          </div>

          {/* Display filtered rooms */}
          {selectedFilter === "All" ? (
            <>
              {/* AC Rooms Section */}
              {roomsByCategory.AC.length > 0 && (
                <div className="room-category-section">
                  <motion.h2
                    className="category-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    AC Rooms
                  </motion.h2>
                  <div className="rooms-grid">
                    {roomsByCategory.AC.map((room, index) => (
                      <motion.div
                        key={room.id || room._id}
                        className="room-card-large"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <img
                          src={`http://localhost:5000${room.image_url}`}
                          alt={room.name}
                        />
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
                          <Link
                            to={`/booking/${room.id || room._id}`}
                            className="btn"
                          >
                            Book Now
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Non-AC Rooms Section */}
              {roomsByCategory["Non-AC"].length > 0 && (
                <div className="room-category-section">
                  <motion.h2
                    className="category-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    Non-AC Rooms
                  </motion.h2>
                  <div className="rooms-grid">
                    {roomsByCategory["Non-AC"].map((room, index) => (
                      <motion.div
                        key={room.id || room._id}
                        className="room-card-large"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <img
                          src={`http://localhost:5000${room.image_url}`}
                          alt={room.name}
                        />
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
                          <Link
                            to={`/booking/${room.id || room._id}`}
                            className="btn"
                          >
                            Book Now
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="room-category-section">
              {selectedFilter === "AC" && roomsByCategory.AC.length > 0 && (
                <motion.h2
                  className="category-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  AC Rooms
                </motion.h2>
              )}
              {selectedFilter === "Non-AC" &&
                roomsByCategory["Non-AC"].length > 0 && (
                  <motion.h2
                    className="category-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Non-AC Rooms
                  </motion.h2>
                )}
              <div className="rooms-grid">
                {filteredRooms.map((room, index) => {
                  const roomId = room.id || room._id;
                  return (
                    <motion.div
                      key={roomId}
                      className="room-card-large"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <img
                        src={`http://localhost:5000${room.image_url}`}
                        alt={room.name}
                      />
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
                        {roomId ? (
                          <Link to={`/booking/${roomId}`} className="btn">
                            Book Now
                          </Link>
                        ) : (
                          <button className="btn" disabled>
                            Book Now (Error)
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              {filteredRooms.length === 0 && (
                <div className="no-rooms">
                  <p>No {selectedFilter} rooms available at the moment.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Rooms;
