// pages/add-doctor.js
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("/api/doctors", form);
        router.push("/");
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Add Doctor</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <input
                    name="department"
                    placeholder="Department"
                    value={form.department}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <input
                    name="contact"
                    placeholder="Contact"
                    value={form.contact}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="number"
                    name="consultationFee"
                    placeholder="Consultation Fee"
                    value={form.consultationFee}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <button className="bg-blue-500 text-white px-4 py-2" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}
