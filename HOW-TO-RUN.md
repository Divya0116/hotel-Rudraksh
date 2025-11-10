# How to Run the Rudaraksh Hotel Application

## ✅ Current Status

The application is **READY TO RUN**! All dependencies are installed and the backend is running.

## 🚀 Quick Start

### Option 1: Using the Batch File (Easiest)

1. Double-click `start.bat` in the project root
2. Two windows will open - one for backend, one for frontend
3. Wait for both servers to start
4. Open your browser and go to: **http://localhost:5173**

### Option 2: Manual Start

**Terminal 1 - Start Backend:**
```powershell
cd backend
npm start
```

**Terminal 2 - Start Frontend:**
```powershell
cd frontend
npm run dev
```

Then open **http://localhost:5173** in your browser.

## 🌐 Access URLs

- **Frontend (Main App):** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Endpoints:** http://localhost:5000/api/*

## 📄 Available Pages

1. **Home** - `/` - Landing page
2. **Rooms** - `/rooms` - Browse all rooms
3. **Booking** - `/booking/:id` - Book a room
4. **About** - `/about` - Hotel information
5. **Contact** - `/contact` - Contact page
6. **Admin** - `/admin` - Admin dashboard

## 🏨 Features

- Browse 6 different room types
- Book rooms with guest information
- Automatic price calculation
- Admin dashboard to view all bookings
- Modern, responsive design with animations

## ⚠️ Important Notes

1. The backend uses **in-memory storage** - data is reset when you restart the server
2. Make sure ports 5000 and 5173 are not in use
3. Both servers need to be running for the app to work properly

## 🐛 Troubleshooting

**If servers don't start:**
1. Close all running instances
2. Make sure Node.js is installed: `node --version`
3. Delete `node_modules` in backend and frontend folders
4. Run `npm install` in both folders again
5. Try starting again

**If frontend can't connect to backend:**
- Check that backend is running on port 5000
- Check browser console for errors
- Make sure there are no firewall issues

## ✨ Enjoy Your Stay at Rudaraksh Hotel!

