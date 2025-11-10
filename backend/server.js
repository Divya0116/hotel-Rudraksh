import express from "express";
import cors from "cors";
import initSqlJs from "sql.js";
import fs from "fs";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database
let db;
const dbPath = "hotel.db";

// Initialize database
async function initDatabase() {
  try {
    const SQL = await initSqlJs({
      locateFile: (file) =>
        path.join(__dirname, "node_modules", "sql.js", "dist", file),
    });

    if (fs.existsSync(dbPath)) {
      const buffer = fs.readFileSync(dbPath);
      db = new SQL.Database(buffer);
      console.log("Loaded existing database");
    } else {
      db = new SQL.Database();
      createTables();
      seedRooms();
      saveDatabase();
      console.log("Created new database");
    }
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}

function createTables() {
  db.run(`
    CREATE TABLE rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      capacity INTEGER NOT NULL,
      amenities TEXT,
      image_url TEXT,
      available INTEGER DEFAULT 1
    );
  `);

  db.run(`
    CREATE TABLE bookings (
      id TEXT PRIMARY KEY,
      room_id INTEGER NOT NULL,
      guest_name TEXT NOT NULL,
      guest_email TEXT NOT NULL,
      guest_phone TEXT NOT NULL,
      check_in TEXT NOT NULL,
      check_out TEXT NOT NULL,
      guests INTEGER NOT NULL,
      total_price REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

function seedRooms() {
  const rooms = [
    [
      "Deluxe Suite",
      "Spacious suite with king-size bed and ocean view",
      2999,
      2,
      "WiFi, TV, AC, Mini Bar, Balcony",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      1,
    ],
    [
      "Premium Room",
      "Comfortable room with city view and modern amenities",
      1999,
      2,
      "WiFi, TV, AC, Coffee Maker",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800",
      1,
    ],
    [
      "Standard Room",
      "Cozy room perfect for short stays",
      1499,
      2,
      "WiFi, TV, AC",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
      1,
    ],
    [
      "Family Suite",
      "Large suite perfect for families with kids",
      3499,
      4,
      "WiFi, TV, AC, Kitchenette, Extra Beds",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      1,
    ],
    [
      "Presidential Suite",
      "Luxury suite with premium amenities and panoramic views",
      5999,
      2,
      "WiFi, TV, AC, Jacuzzi, Butler Service, Private Lounge",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      1,
    ],
    [
      "Economy Room",
      "Budget-friendly room with all essential amenities",
      999,
      1,
      "WiFi, TV, AC",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      1,
    ],
  ];

  const stmt = db.prepare(
    "INSERT INTO rooms (name, description, price, capacity, amenities, image_url, available) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );
  rooms.forEach((room) => {
    stmt.run(room);
  });
  stmt.free();
}

function saveDatabase() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

function query(sql, params = []) {
  try {
    const results = [];
    const stmt = db.prepare(sql);

    if (params && params.length > 0) {
      for (let i = 0; i < params.length; i++) {
        stmt.bind([params[i]]);
      }
    }

    while (stmt.step()) {
      const row = stmt.getAsObject();
      results.push(row);
    }

    stmt.free();
    return results;
  } catch (error) {
    console.error("Query error:", error);
    return [];
  }
}

// Initialize database
initDatabase();

// Get all rooms
app.get("/api/rooms", (req, res) => {
  try {
    const rooms = query("SELECT * FROM rooms");
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

// Get single room
app.get("/api/rooms/:id", (req, res) => {
  try {
    const rooms = query("SELECT * FROM rooms WHERE id = ?", [
      parseInt(req.params.id),
    ]);
    if (rooms.length > 0) {
      res.json(rooms[0]);
    } else {
      res.status(404).json({ error: "Room not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch room" });
  }
});

// Create booking
app.post("/api/bookings", (req, res) => {
  try {
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

    const stmt = db.prepare(
      "INSERT INTO bookings (id, room_id, guest_name, guest_email, guest_phone, check_in, check_out, guests, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    stmt.run([
      booking_id,
      room_id,
      guest_name,
      guest_email,
      guest_phone,
      check_in,
      check_out,
      guests,
      total_price,
    ]);
    stmt.free();

    saveDatabase();
    res.json({
      success: true,
      booking_id,
      message: "Booking created successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create booking", details: error.message });
  }
});

// Get all bookings
app.get("/api/bookings", (req, res) => {
  try {
    const bookings = query(`
      SELECT b.*, r.name as room_name, r.description as room_description
      FROM bookings b
      JOIN rooms r ON b.room_id = r.id
      ORDER BY b.created_at DESC
    `);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Get single booking
app.get("/api/bookings/:id", (req, res) => {
  try {
    const bookings = query("SELECT * FROM bookings WHERE id = ?", [
      req.params.id,
    ]);
    if (bookings.length > 0) {
      res.json(bookings[0]);
    } else {
      res.status(404).json({ error: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch booking" });
  }
});

// Update booking status
app.put("/api/bookings/:id", (req, res) => {
  try {
    const { status } = req.body;
    const stmt = db.prepare("UPDATE bookings SET status = ? WHERE id = ?");
    stmt.run([status, req.params.id]);
    stmt.free();

    saveDatabase();
    res.json({ success: true, message: "Booking status updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update booking" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("📊 API endpoints available at /api/*");
});
