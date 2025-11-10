# Quick Start Instructions

## The Hotel Website is Ready!

I've created a complete Rudaraksh Hotel booking system with:
- ✅ React.js frontend with 6 pages
- ✅ Node.js/Express backend API  
- ✅ Beautiful animations and UI
- ✅ Booking system
- ✅ Admin dashboard

## How to Start the Application

### Method 1: Manual Start (Recommended)

**Terminal 1 - Start Backend:**
```bash
cd rudaraksh-hotel/backend
npm install
npm start
```

**Terminal 2 - Start Frontend:**
```bash
cd rudaraksh-hotel/frontend
npm install  
npm run dev
```

### Method 2: Using Windows Batch File
1. Double-click `start.bat` in the project root

### Method 3: Using PowerShell Script
```powershell
cd rudaraksh-hotel
powershell -ExecutionPolicy Bypass -File START-SERVERS.ps1
```

## Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Admin Dashboard:** http://localhost:5173/admin

## Features

### For Users:
- Browse 6 different room types with prices
- View room details, amenities, and images
- Book rooms with guest information form
- Automatic price calculation based on dates

### For Admin:
- View all bookings in dashboard
- See booking statistics
- Update booking status (pending/confirmed/cancelled)

## Pages Available

1. **Home** - Landing page with featured rooms
2. **Rooms** - Browse all available rooms  
3. **Booking** - Book a specific room
4. **About** - Hotel information
5. **Contact** - Contact form
6. **Admin** - Admin dashboard for managing bookings

## Technologies Used

- Frontend: React.js, React Router, Framer Motion, Axios
- Backend: Node.js, Express.js
- Database: In-memory (for simplicity)

## Troubleshooting

If servers don't start:
1. Make sure you have Node.js installed
2. Run `npm install` in both frontend and backend folders
3. Check that ports 5000 and 5173 are not in use
4. Try closing any existing terminal windows and restart

The backend uses an in-memory database, so data is not persisted between server restarts. This is intentional for easy setup.

Enjoy your stay at Rudaraksh Hotel! 🌟

