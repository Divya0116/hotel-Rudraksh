import initSqlJs from 'sql.js';
import fs from 'fs';

const SQL = await initSqlJs();
const dbPath = 'hotel.db';

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

// Insert sample rooms
const rooms = [
  {
    name: 'Deluxe Suite',
    description: 'Spacious suite with king-size bed and ocean view',
    price: 2999,
    capacity: 2,
    amenities: 'WiFi, TV, AC, Mini Bar, Balcony',
    image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
    available: 1
  },
  {
    name: 'Premium Room',
    description: 'Comfortable room with city view and modern amenities',
    price: 1999,
    capacity: 2,
    amenities: 'WiFi, TV, AC, Coffee Maker',
    image_url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800',
    available: 1
  },
  {
    name: 'Standard Room',
    description: 'Cozy room perfect for short stays',
    price: 1499,
    capacity: 2,
    amenities: 'WiFi, TV, AC',
    image_url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
    available: 1
  },
  {
    name: 'Family Suite',
    description: 'Large suite perfect for families with kids',
    price: 3499,
    capacity: 4,
    amenities: 'WiFi, TV, AC, Kitchenette, Extra Beds',
    image_url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
    available: 1
  },
  {
    name: 'Presidential Suite',
    description: 'Luxury suite with premium amenities and panoramic views',
    price: 5999,
    capacity: 2,
    amenities: 'WiFi, TV, AC, Jacuzzi, Butler Service, Private Lounge',
    image_url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
    available: 1
  },
  {
    name: 'Economy Room',
    description: 'Budget-friendly room with all essential amenities',
    price: 999,
    capacity: 1,
    amenities: 'WiFi, TV, AC',
    image_url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
    available: 1
  }
];

// Insert rooms
rooms.forEach(room => {
  const stmt = db.prepare(`
    INSERT INTO rooms (name, description, price, capacity, amenities, image_url, available)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run([room.name, room.description, room.price, room.capacity, room.amenities, room.image_url, room.available]);
  stmt.free();
});

// Save database
const data = db.export();
const buffer = Buffer.from(data);
fs.writeFileSync(dbPath, buffer);

console.log('Rooms seeded successfully!');
process.exit(0);
