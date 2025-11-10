# Quick Start Guide

## Installation

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Seed the Database
```bash
cd backend
node seed.js
```

## Running the Application

### Option 1: Using the Batch File (Windows)
Simply double-click `start.bat` to start both servers.

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Accessing the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

## Features Implemented

✅ Modern React.js frontend with React Router
✅ Node.js/Express backend API
✅ SQLite database (SQL.js implementation)
✅ Room browsing with detailed information
✅ Booking system with form validation
✅ Admin dashboard for viewing/managing bookings
✅ Smooth animations using Framer Motion
✅ Responsive design for all devices
✅ Multiple pages (Home, Rooms, Booking, About, Contact, Admin)

## Pages

1. **Home** - Landing page with hero section and featured rooms
2. **Rooms** - Browse all available rooms with details
3. **Booking** - Book a specific room with guest information
4. **About** - Information about Rudaraksh Hotel
5. **Contact** - Contact form and hotel information
6. **Admin** - Dashboard to view and manage all bookings

## API Endpoints

- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get single room
- `POST /api/bookings` - Create a booking
- `GET /api/bookings` - Get all bookings (admin)
- `PUT /api/bookings/:id` - Update booking status

## Notes

- The database file (`hotel.db`) is stored in the backend folder
- All bookings are stored locally in SQLite
- Room images are loaded from Unsplash
- The app uses modern CSS with gradients and animations

Enjoy your stay at Rudaraksh Hotel! 🌟

