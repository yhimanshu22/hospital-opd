// pages/add-patient.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function AddPatient() {
    const router = useRouter();
    const [doctors, setDoctors] = useState([]);
    const [form, setForm] = useState({
        name: "",
        age: "",
        gender: "",
        contact: "",
        address: "",
        guardian: "",
        opdNumber: "",
        doctorId: "",
        discount: 0,
    });

    useEffect(() => {
        // Fetch all doctors for the dropdown
        axios.get("/api/doctors").then((res) => setDoctors(res.data));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("/api/patients", form);
        router.push("/patient-list");
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Add Patient</h1>
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
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={form.age}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <input
                    name="gender"
                    placeholder="Gender"
                    value={form.gender}
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
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <input
                    name="guardian"
                    placeholder="Guardian Name"
                    value={form.guardian}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
                <input
                    name="opdNumber"
                    placeholder="OPD Number"
                    value={form.opdNumber}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <select
                    name="doctorId"
                    value={form.doctorId}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                >
                    <option value="">Select Doctor</option>
                    {doctors.map((doc) => (
                        <option key={doc._id} value={doc._id}>
                            {doc.name} ({doc.department})
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    name="discount"
                    placeholder="Discount"
                    value={form.discount}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
                <button className="bg-green-500 text-white px-4 py-2" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}
