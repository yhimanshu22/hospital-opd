// pages/index.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Dashboard() {
    const [doctors, setDoctors] = useState([]); // Initialize doctors state with an empty array
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.post("/api/auth/logout");
            router.push("/auth/signin"); // Redirect to login page after logout
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };


    useEffect(() => {
        axios
            .get("/api/doctors")
            .then((res) => {
                // Update state only if API returns data.
                if (res.data.length > 0) {
                    setDoctors(res.data);
                }
            })
            .catch((err) => {
                console.log("Error fetching doctors, using dummy data", err);
            });
    }, []);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Hospital OPD Management</h1>
                <button
                    className="bg-red-500 text-white px-4 py-2 cursor-pointer"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>

            <div className="mb-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 mr-2"
                    onClick={() => router.push("/add-doctor")}
                >
                    Add Doctor
                </button>
                <button
                    className="bg-green-500 text-white px-4 py-2"
                    onClick={() => router.push("/add-patient")}
                >
                    Add Patient
                </button>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-2">Doctors List</h2>
            <ul className="list-disc ml-6">
                {doctors.map((doc) => (
                    <li key={doc._id}>
                        {doc.name} ({doc.department}) - Fee: ₹{doc.consultationFee}
                    </li>
                ))}
            </ul>
        </div>
    );
}
