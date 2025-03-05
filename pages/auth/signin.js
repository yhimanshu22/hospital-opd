import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function SignIn() {
    const router = useRouter();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/auth/signin", form);
            const { isAdmin } = response.data; // Get isAdmin from the response

            if (isAdmin) {
                router.push("/admin-dashboard");
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Sign in failed");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Sign In</h1>
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
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    Sign In
                </button>
            </form>
        </div>
    );
}