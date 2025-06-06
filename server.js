import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

// Configure environment variables
dotenv.config({ path: "./config/.env" });

// Initializing the  app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connecting to MongoDB
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err));

// ROUTES

// @GET - Getting all users
app.get("/users", async (req, res) => {
	try {
		const users = await User.find(); // Fetch all users
		res.json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// @POST - To create a new user
app.post("/users", async (req, res) => {
	const { name, email, age } = req.body;
	try {
		const newUser = new User({ name, email, age });
		await newUser.save(); // Save user to DB
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// @PUT - To update user by ID
app.put("/users/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const updatedUser = await User.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!updatedUser)
			return res.status(404).json({ message: "User not found" });
		res.json(updatedUser);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// @DELETE -To delete user by ID
app.delete("/users/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const deletedUser = await User.findByIdAndDelete(id);
		if (!deletedUser)
			return res.status(404).json({ message: "User not found" });
		res.json({ message: "User deleted", deletedUser });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//To start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
