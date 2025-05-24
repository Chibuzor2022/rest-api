// models/User.js
import mongoose from "mongoose";

// Define user schema
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		age: Number,
	},
	{ timestamps: true }
);

// Export the User model
const User = mongoose.model("User", userSchema);
export default User;
