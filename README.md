# 🌟 Rudaraksh Hotel Booking System

A complete hotel booking website built with React.js frontend and Node.js/Express backend.

## ✨ Features

- 🏨 Browse available rooms with detailed information and images
- 📅 Easy booking system with date selection and price calculation
- 💳 Automatic price calculation based on check-in/check-out dates
- 👥 Room capacity validation
- 📊 Admin dashboard for managing all bookings
- ✨ Smooth animations using Framer Motion
- 📱 Fully responsive design
- 🎨 Modern UI with gradient colors and beautiful transitions

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Method 1: Using Batch File (Windows)

Double-click `start.bat` to launch both servers.

### Method 2: Manual Setup

#### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

#### Step 2: Install Frontend Dependencies
```bash
cd frontend
npm install
```

#### Step 3: Start Backend Server
```bash
cd backend
npm start
```

The backend will run on `http://localhost:5000`

#### Step 4: Start Frontend Server (in a new terminal)
```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
rudaraksh-hotel/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components (Navbar, Footer)
│   │   ├── pages/         # Page components (Home, Rooms, Booking, etc.)
│   │   ├── App.jsx        # Main app component with routing
│   │   └── main.jsx       # Entry point
│   └── package.json
├── backend/               # Node.js backend
│   ├── server.js          # Express server with SQL.js
│   ├── server-simple.js   # In-memory Express server (current)
│   ├── seed.js            # Database seeding script
│   ├── package.json
│   └── hotel.db           # SQLite database file
├── start.bat              # Windows batch file to start both servers
└── README.md              # This file
```

## 🎯 Available Pages

1. **Home** (`/`) - Landing page with hero section and featured rooms
2. **Rooms** (`/rooms`) - Browse all available rooms with details
3. **Booking** (`/booking/:id`) - Book a specific room with guest information form
4. **About** (`/about`) - Information about Rudaraksh Hotel
5. **Contact** (`/contact`) - Contact form and hotel information
6. **Admin** (`/admin`) - Admin dashboard to view and manage all bookings

## 🔌 API Endpoints

### Rooms
- `GET /api/rooms` - Get all available rooms
- `GET /api/rooms/:id` - Get details of a specific room

### Bookings
- `POST /api/bookings` - Create a new booking
  - Body: `{ room_id, guest_name, guest_email, guest_phone, check_in, check_out, guests, total_price }`
- `GET /api/bookings` - Get all bookings (for admin dashboard)
- `GET /api/bookings/:id` - Get details of a specific booking
- `PUT /api/bookings/:id` - Update booking status (pending/confirmed/cancelled)

## 🏨 Available Rooms

The database includes 6 sample rooms:
- **Deluxe Suite** (₹2999/night) - 2 guests
- **Premium Room** (₹1999/night) - 2 guests
- **Standard Room** (₹1499/night) - 2 guests
- **Family Suite** (₹3499/night) - 4 guests
- **Presidential Suite** (₹5999/night) - 2 guests
- **Economy Room** (₹999/night) - 1 guest

## 💻 Technologies Used

### Frontend
- React.js 18
- React Router Dom (for navigation)
- Framer Motion (for animations)
- Axios (for API calls)
- CSS3 (custom styling with gradients)

### Backend
- Node.js
- Express.js
- SQL.js (JavaScript SQLite implementation)
- CORS

## 🎨 Design Features

- Modern gradient color scheme
- Smooth page transitions
- Hover effects and animations
- Responsive grid layouts
- Card-based room displays
- Professional booking form
- Admin dashboard with statistics

## 📝 Usage Guide

### For Users:
1. Navigate to **Rooms** page to browse available rooms
2. Click **"Book Now"** on any room
3. Fill in the booking form with your details
4. Select check-in and check-out dates
5. Choose number of guests
6. Click **"Confirm Booking"**
7. Receive confirmation message

### For Admin:
1. Navigate to **Admin** dashboard
2. View all bookings with guest information
3. See booking statistics (total, pending, confirmed, cancelled)
4. Update booking status as needed
5. Confirm or cancel bookings

## 🔐 Database Schema

### rooms table
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- description (TEXT)
- price (REAL)
- capacity (INTEGER)
- amenities (TEXT)
- image_url (TEXT)
- available (INTEGER)

### bookings table
- id (TEXT PRIMARY KEY)
- room_id (INTEGER)
- guest_name (TEXT)
- guest_email (TEXT)
- guest_phone (TEXT)
- check_in (DATE)
- check_out (DATE)
- guests (INTEGER)
- total_price (REAL)
- status (TEXT)
- created_at (DATETIME)

## 🛠️ Development Notes

- The backend uses in-memory storage (data persists during server session)
- Database file (`hotel.db`) is created automatically in the backend folder
- All bookings are stored in memory for easy setup
- Room images are loaded from Unsplash (external URLs)
- The app includes form validation on the booking page
- Date selection prevents past dates in booking forms
- Total price is calculated automatically based on room price and duration

## 📦 Dependencies

### Frontend
- react, react-dom
- react-router-dom
- framer-motion
- axios
- vite

### Backend
- express
- cors

## 🌐 Access URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Documentation:** Available at http://localhost:5000/api/*

## 📄 License

This project is created for educational purposes.

## 👤 Support

For any questions or issues, please contact the development team.

---

**Enjoy booking your stay at Rudaraksh Hotel! 🌟**
