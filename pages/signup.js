// pages/signup.js
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function SignUp() {
    const router = useRouter();
    const [form, setForm] = useState({ username: "", password: "", isAdmin: false });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/auth/signup", form);
            router.push("/signin");
        } catch (err) {
            setError(err.response?.data?.message || "Sign up failed");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Sign Up</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4 max-w-md">
                <input
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <div className="flex items-center">
                    <input
                        name="isAdmin"
                        type="checkbox"
                        checked={form.isAdmin}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label>Admin Account</label>
                </div>
                <button type="submit" className="bg-green-500 text-white px-4 py-2">
                    Sign Up
                </button>
            </form>
        </div>
    );
}
