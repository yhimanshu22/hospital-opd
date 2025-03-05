// pages/api/auth/signup.js
import connectDB from "@/lib/db";
import User from "../../../models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    await connectDB();

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { username, password, isAdmin } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Missing fields" });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, isAdmin: isAdmin || false });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
