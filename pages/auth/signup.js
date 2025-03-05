import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"; // Import Shadcn Checkbox
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

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
            router.push("/auth/signin");
        } catch (err) {
            setError(err.response?.data?.message || "Sign up failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Create your account.</CardDescription>
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
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="isAdmin"
                                name="isAdmin"
                                checked={form.isAdmin}
                                onCheckedChange={(checked) => handleChange({ target: { name: "isAdmin", type: "checkbox", checked } })}
                            />
                            <Label htmlFor="isAdmin">Admin Account</Label>
                        </div>
                        <Button type="submit" className="w-full cursor-pointer">
                            Sign Up
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}