import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.post("/api/auth/logout");
            router.push("/"); // Redirect to login page after logout
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/admin-dashboard"); // Correct API route path
                setDashboardData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                // Optionally, display an error message to the user
                // alert("Failed to load dashboard data. Please try again.");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <button className="bg-red-500 text-white px-4 py-2 cursor-pointer" onClick={logout}>
                    Logout
                </button>
            </div>

            {dashboardData ? (
                <div>
                    <p>Total Patients: {dashboardData.patientCount}</p>
                    <p>Total Doctors: {dashboardData.doctorCount}</p>
                    <p>Total Earnings Today: ₹{dashboardData.totalEarningsToday}</p>
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}