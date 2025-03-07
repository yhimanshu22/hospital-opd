import connectDB from "../../../lib/db";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie"; // Use named import

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
    await connectDB();

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Missing fields" });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, isAdmin: user.isAdmin },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.setHeader(
            "Set-Cookie",
            serialize("_vercel_jwt", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 3600,
                sameSite: "strict",
                path: "/",
            })
        );

        res.status(200).json({ message: "Sign in successful", isAdmin: user.isAdmin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
