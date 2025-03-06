import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function AddDoctor() {
    const [form, setForm] = useState({
        name: "",
        department: "",
        contact: "",
        consultationFee: 0,
    });
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const cancel = () => {
        router.push('/dashboard')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("/api/doctors", form);
        router.push("/dashboard");
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Add Doctor</CardTitle>
                    <CardDescription>Enter doctor details.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="department">Department</Label>
                            <Input
                                type="text"
                                id="department"
                                name="department"
                                placeholder="Department"
                                value={form.department}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="contact">Contact</Label>
                            <Input
                                type="text"
                                id="contact"
                                name="contact"
                                placeholder="Contact"
                                value={form.contact}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="consultationFee">Consultation Fee</Label>
                            <Input
                                type="number"
                                id="consultationFee"
                                name="consultationFee"
                                placeholder="Consultation Fee"
                                value={form.consultationFee}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full cursor-pointer">
                            Save
                        </Button>
                    </form>
                    <Button onClick={cancel} className="w-full bg-red-700  hover:bg-red-600 my-2  cursor-pointer">
                        Cancel
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}