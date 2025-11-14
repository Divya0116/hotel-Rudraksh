import express from "express";
import cors from "cors";
import crypto from "crypto";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database
let rooms = [
  {
    id: 1,
    name: "Deluxe Suite",
    description: "Spacious suite with king-size bed and ocean view",
    price: 2999,
    capacity: 2,
    amenities: "WiFi, TV, AC, Mini Bar, Balcony",
    image_url: "images/room 1.jpeg",
    available: 1,
  },
  {
    id: 2,
    name: "Premium Room",
    description: "Comfortable room with city view and modern amenities",
    price: 1999,
    capacity: 2,
    amenities: "WiFi, TV, AC, Coffee Maker",
    image_url:
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800",
    available: 1,
  },
  {
    id: 3,
    name: "Standard Room",
    description: "Cozy room perfect for short stays",
    price: 1499,
    capacity: 2,
    amenities: "WiFi, TV, AC",
    image_url:
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
    available: 1,
  },
  {
    id: 4,
    name: "Family Suite",
    description: "Large suite perfect for families with kids",
    price: 3499,
    capacity: 4,
    amenities: "WiFi, TV, AC, Kitchenette, Extra Beds",
    image_url:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
    available: 1,
  },
  {
    id: 5,
    name: "Presidential Suite",
    description: "Luxury suite with premium amenities and panoramic views",
    price: 5999,
    capacity: 2,
    amenities: "WiFi, TV, AC, Jacuzzi, Butler Service, Private Lounge",
    image_url:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
    available: 1,
  },
  {
    id: 6,
    name: "Economy Room",
    description: "Budget-friendly room with all essential amenities",
    price: 999,
    capacity: 1,
    amenities: "WiFi, TV, AC",
    image_url:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
    available: 1,
  },
];

let bookings = [];

// Get all rooms
app.get("/api/rooms", (req, res) => {
  res.json(rooms);
});

// Get single room
app.get("/api/rooms/:id", (req, res) => {
  const room = rooms.find((r) => r.id === parseInt(req.params.id));
  if (room) {
    res.json(room);
  } else {
    res.status(404).json({ error: "Room not found" });
  }
});

// Create booking
app.post("/api/bookings", (req, res) => {
  const {
    room_id,
    guest_name,
    guest_email,
    guest_phone,
    check_in,
    check_out,
    guests,
    total_price,
  } = req.body;
  const booking_id = crypto.randomUUID();

  const booking = {
    id: booking_id,
    room_id,
    guest_name,
    guest_email,
    guest_phone,
    check_in,
    check_out,
    guests,
    total_price,
    status: "pending",
    created_at: new Date().toISOString(),
  };

  bookings.push(booking);
  res.json({
    success: true,
    booking_id,
    message: "Booking created successfully",
  });
});

// Get all bookings
app.get("/api/bookings", (req, res) => {
  const bookingsWithRooms = bookings.map((booking) => {
    const room = rooms.find((r) => r.id === booking.room_id);
    return {
      ...booking,
      room_name: room?.name,
      room_description: room?.description,
    };
  });
  res.json(
    bookingsWithRooms.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    )
  );
});

// Get single booking
app.get("/api/bookings/:id", (req, res) => {
  const booking = bookings.find((b) => b.id === req.params.id);
  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ error: "Booking not found" });
  }
});

// Update booking status
app.put("/api/bookings/:id", (req, res) => {
  const booking = bookings.find((b) => b.id === req.params.id);
  if (booking) {
    booking.status = req.body.status;
    res.json({ success: true, message: "Booking status updated" });
  } else {
    res.status(404).json({ error: "Booking not found" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("📊 API endpoints available at /api/*");
});
