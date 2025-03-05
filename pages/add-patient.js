import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import InputField from "../components/InputField"; // Import the reusable InputField component

export default function AddPatient() {
    const router = useRouter();
    const [doctors, setDoctors] = useState([]);
    const [form, setForm] = useState({
        name: "", age: "", gender: "", contact: "", address: "", guardian: "", opdNumber: "", doctorId: "",
        discount: 0, abhaNumber: "", abhaAddress: "", mrid: "", pro: "", allergy: "", visitValidity: "",
        priority: "", caseType: "", sittingLocation: "", religion: "", maritalStatus: "", dob: "", city: "",
        area: "", nationality: "", patientClass: "", referredBy: "", complaints: "", empanelment: "",
        cashPatient: false, appointmentBioReceipt: "", registrationNo: "", registrationType: "",
        consultant: "", department: "", time: "",
    });

    // Fetch doctors on component mount
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await axios.get("/api/doctors");
                setDoctors(data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };
        fetchDoctors();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/patients", form);
            router.push("/patient-list");
        } catch (error) {
            console.error("Error adding patient:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Add Patient</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Personal Details */}
                <InputField label="Name" name="name" value={form.name} onChange={handleChange} required />
                <InputField label="Age" name="age" type="number" value={form.age} onChange={handleChange} required />
                <InputField label="Gender" name="gender" value={form.gender} onChange={handleChange} required />
                <InputField label="Contact" name="contact" value={form.contact} onChange={handleChange} required />
                <InputField label="Address" name="address" value={form.address} onChange={handleChange} required />
                <InputField label="Guardian Name" name="guardian" value={form.guardian} onChange={handleChange} />

                {/* OPD Details */}
                <InputField label="OPD Number" name="opdNumber" value={form.opdNumber} onChange={handleChange} required />
                <div>
                    <label className="block font-medium">Doctor</label>
                    <select
                        name="doctorId"
                        value={form.doctorId}
                        onChange={handleChange}
                        className="border p-2 w-full rounded-md"
                        required
                    >
                        <option value="">Select Doctor</option>
                        {doctors.map((doc) => (
                            <option key={doc._id} value={doc._id}>
                                {doc.name} ({doc.department})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Additional Details */}
                <InputField label="Discount" name="discount" type="number" value={form.discount} onChange={handleChange} />
                <InputField label="ABHA Number" name="abhaNumber" value={form.abhaNumber} onChange={handleChange} />
                <InputField label="ABHA Address" name="abhaAddress" value={form.abhaAddress} onChange={handleChange} />

                {/* Checkbox Field */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="cashPatient"
                        name="cashPatient"
                        checked={form.cashPatient}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label htmlFor="cashPatient">Cash Patient</label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
