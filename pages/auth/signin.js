import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input"; // Import Shadcn Input component
import { Button } from "@/components/ui/button"; // Import Shadcn Button component
import { Label } from "@/components/ui/label"; //Import Shadcn Label component
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"; //Import Shadcn Card component

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
        <div className="flex justify-center items-center h-screen">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Enter your credentials to access your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={form.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full cursor-pointer">
                            Sign In
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}