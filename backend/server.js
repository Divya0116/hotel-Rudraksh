import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import fs from "fs";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import dotenv from "dotenv";
import Room from "./models/Room.js";
import Booking from "./models/Booking.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
// Serve static files from public folder
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/", express.static(path.join(__dirname, "public")));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "public");
    // Ensure public directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-room-{roomId}-originalname
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    cb(null, `room-${uniqueSuffix}-${name}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// MongoDB Connection
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://your-username:your-password@cluster.mongodb.net/hotel?retryWrites=true&w=majority";

// Initialize database connection
async function initDatabase() {
  try {
    // Check if using placeholder connection string
    if (
      MONGODB_URI.includes("your-username") ||
      MONGODB_URI.includes("your-password")
    ) {
      console.warn("⚠️  WARNING: Using placeholder MongoDB connection string!");
      console.warn(
        "⚠️  Please create a .env file with your MongoDB Atlas connection string."
      );
      console.warn(
        "⚠️  Example: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel?retryWrites=true&w=majority"
      );
      console.warn(
        "⚠️  Server will continue but database operations will fail until connection is configured."
      );
      return;
    }

    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    console.error(
      "⚠️  Please check your MongoDB Atlas connection string in .env file"
    );
    console.error("⚠️  Server will continue but database operations will fail");
    // Don't exit - allow server to start for development/testing
  }
}

// Initialize database
initDatabase();

// Get all rooms
app.get("/api/rooms", async (req, res) => {
  try {
    const rooms = await Room.find().lean();
    // Ensure _id is included in response
    const roomsWithId = rooms.map((room) => ({
      ...room,
      id: room._id ? room._id.toString() : room.id,
    }));
    res.json(roomsWithId);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

// Get single room
app.get("/api/rooms/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).lean();
    if (room) {
      // Ensure id field is included
      const roomWithId = {
        ...room,
        id: room._id ? room._id.toString() : room.id,
      };
      res.json(roomWithId);
    } else {
      res.status(404).json({ error: "Room not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch room" });
  }
});

// Create new room (POST) - with file upload support
app.post("/api/rooms", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      capacity,
      amenities,
      image_url,
      category,
      available,
    } = req.body;

    // Validation
    if (!name || !price || !capacity || !category) {
      // If file was uploaded but validation failed, delete it
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        error:
          "Missing required fields: name, price, capacity, and category are required",
      });
    }

    // Determine image URL: use uploaded file or provided URL
    let finalImageUrl = image_url || "";
    if (req.file) {
      // Use the uploaded file path (relative to public folder)
      finalImageUrl = `/${req.file.filename}`;
    }

    const newRoom = new Room({
      name,
      description: description || "",
      price: parseFloat(price),
      capacity: parseInt(capacity),
      amenities: amenities || "",
      image_url: finalImageUrl,
      category,
      available: available !== undefined ? parseInt(available) : 1,
    });

    await newRoom.save();

    res.status(201).json({
      success: true,
      message: "Room created successfully",
      room: newRoom,
    });
  } catch (error) {
    // If file was uploaded but error occurred, delete it
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      error: "Failed to create room",
      details: error.message,
    });
  }
});

// Update room (PUT) - with file upload support
app.put("/api/rooms/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      capacity,
      amenities,
      image_url,
      category,
      available,
    } = req.body;

    // Check if room exists
    const existingRoom = await Room.findById(id);
    if (!existingRoom) {
      // If file was uploaded but room not found, delete it
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ error: "Room not found" });
    }

    // Build update object dynamically based on provided fields
    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (capacity !== undefined) updateData.capacity = parseInt(capacity);
    if (amenities !== undefined) updateData.amenities = amenities;
    if (category !== undefined) updateData.category = category;
    if (available !== undefined) updateData.available = parseInt(available);

    // Handle image: if file uploaded, use it; otherwise use provided URL or keep existing
    if (req.file) {
      // Delete old image if it exists and is not a default/placeholder
      if (existingRoom.image_url && existingRoom.image_url.startsWith("/")) {
        const oldImagePath = path.join(
          __dirname,
          "public",
          existingRoom.image_url.substring(1)
        );
        if (fs.existsSync(oldImagePath)) {
          try {
            fs.unlinkSync(oldImagePath);
          } catch (err) {
            console.error("Error deleting old image:", err);
          }
        }
      }
      updateData.image_url = `/${req.file.filename}`;
    } else if (image_url !== undefined) {
      updateData.image_url = image_url;
    }

    if (Object.keys(updateData).length === 0) {
      // If file was uploaded but no updates, delete it
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ error: "No fields to update" });
    }

    const updatedRoom = await Room.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: "Room updated successfully",
      room: updatedRoom,
    });
  } catch (error) {
    // If file was uploaded but error occurred, delete it
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      error: "Failed to update room",
      details: error.message,
    });
  }
});

// Delete room (DELETE)
app.delete("/api/rooms/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if room exists
    const existingRoom = await Room.findById(id);
    if (!existingRoom) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Check if room has any bookings
    const bookings = await Booking.find({ room_id: id });
    if (bookings.length > 0) {
      return res.status(400).json({
        error:
          "Cannot delete room with existing bookings. Please cancel bookings first.",
      });
    }

    await Room.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete room",
      details: error.message,
    });
  }
});

// Create booking
app.post("/api/bookings", async (req, res) => {
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

    // Validate room exists
    const room = await Room.findById(room_id);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    const newBooking = new Booking({
      id: booking_id,
      room_id: new mongoose.Types.ObjectId(room_id),
      guest_name,
      guest_email,
      guest_phone,
      check_in,
      check_out,
      guests: parseInt(guests),
      total_price: parseFloat(total_price),
    });

    await newBooking.save();
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
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("room_id", "name description")
      .sort({ createdAt: -1 });

    // Transform to match the expected format
    const formattedBookings = bookings.map((booking) => {
      const bookingObj = booking.toObject();
      return {
        ...bookingObj,
        room_name: bookingObj.room_id?.name || "",
        room_description: bookingObj.room_id?.description || "",
        created_at: bookingObj.createdAt,
      };
    });

    res.json(formattedBookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Get single booking
app.get("/api/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findOne({ id: req.params.id });
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ error: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch booking" });
  }
});

// Update booking status
app.put("/api/bookings/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findOneAndUpdate(
      { id: req.params.id },
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ success: true, message: "Booking status updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update booking" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("📊 API endpoints available at /api/*");
});
