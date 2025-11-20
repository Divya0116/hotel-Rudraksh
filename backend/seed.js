import initSqlJs from "sql.js";
import fs from "fs";

const SQL = await initSqlJs();
const dbPath = "hotel.db";

// Create new database
const db = new SQL.Database();

// Create tables
db.run(`
  CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    capacity INTEGER NOT NULL,
    amenities TEXT,
    image_url TEXT,
    category TEXT NOT NULL,
    available BOOLEAN DEFAULT 1
  );
`);

db.run(`
  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    room_id INTEGER NOT NULL,
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    guest_phone TEXT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests INTEGER NOT NULL,
    total_price REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Insert sample rooms - 10 rooms total: 5 AC rooms and 5 Non-AC rooms only
const rooms = [
  {
    name: "Room 1",
    description: "AC room with modern amenities",
    price: 1999,
    capacity: 2,
    amenities: "WiFi, TV, AC",
    image_url: "/room 1.jpeg",
    category: "AC",
    available: 1,
  },
  {
    name: "Room 2",
    description: "AC room with comfortable facilities",
    price: 1899,
    capacity: 2,
    amenities: "WiFi, TV, AC",
    image_url: "/room 1.jpeg",
    category: "AC",
    available: 1,
  },
  {
    name: "Room 3",
    description: "AC room with essential amenities",
    price: 1799,
    capacity: 2,
    amenities: "WiFi, TV, AC",
    image_url: "/room 1.jpeg",
    category: "AC",
    available: 1,
  },
  {
    name: "Room 4",
    description: "AC room with all basic facilities",
    price: 1699,
    capacity: 2,
    amenities: "WiFi, TV, AC",
    image_url: "/room 1.jpeg",
    category: "AC",
    available: 1,
  },
  {
    name: "Room 5",
    description: "AC room with standard amenities",
    price: 1599,
    capacity: 2,
    amenities: "WiFi, TV, AC",
    image_url: "/room 1.jpeg",
    category: "AC",
    available: 1,
  },
  {
    name: "Room 6",
    description: "Non-AC room with natural ventilation",
    price: 1299,
    capacity: 2,
    amenities: "WiFi, TV, Fan",
    image_url: "/room 1.jpeg",
    category: "Non-AC",
    available: 1,
  },
  {
    name: "Room 7",
    description: "Non-AC room with comfortable facilities",
    price: 1199,
    capacity: 2,
    amenities: "WiFi, TV, Fan",
    image_url: "/room 1.jpeg",
    category: "Non-AC",
    available: 1,
  },
  {
    name: "Room 8",
    description: "Non-AC room with essential amenities",
    price: 1099,
    capacity: 2,
    amenities: "WiFi, TV, Fan",
    image_url: "/room 1.jpeg",
    category: "Non-AC",
    available: 1,
  },
  {
    name: "Room 9",
    description: "Non-AC room with basic facilities",
    price: 999,
    capacity: 2,
    amenities: "WiFi, TV, Fan",
    image_url: "/room 1.jpeg",
    category: "Non-AC",
    available: 1,
  },
  {
    name: "Room 10",
    description: "Non-AC room with standard amenities",
    price: 899,
    capacity: 2,
    amenities: "WiFi, TV, Fan",
    image_url: "/room 1.jpeg",
    category: "Non-AC",
    available: 1,
  },
];

// Clear existing rooms
db.run("DELETE FROM rooms");

// Insert rooms
rooms.forEach((room) => {
  const stmt = db.prepare(`
    INSERT INTO rooms (name, description, price, capacity, amenities, image_url, category, available)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run([
    room.name,
    room.description,
    room.price,
    room.capacity,
    room.amenities,
    room.image_url,
    room.category,
    room.available,
  ]);
  stmt.free();
});

// Save database
const data = db.export();
const buffer = Buffer.from(data);
fs.writeFileSync(dbPath, buffer);

console.log("Rooms seeded successfully!");
process.exit(0);
