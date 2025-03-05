// pages/patient-list.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function PatientList() {
    const [patients, setPatients] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get("/api/patients").then((res) => setPatients(res.data));
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Patient List</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 mb-4"
                onClick={() => router.push("/add-patient")}
            >
                Add Patient
            </button>
            <ul className="list-disc ml-6">
                {patients.map((p) => (
                    <li key={p._id}>
                        {p.name} - OPD: {p.opdNumber} - Doctor: {p.doctor?.name} - Fee: ₹{p.finalFee}
                        <button
                            className="ml-4 bg-gray-500 text-white px-2 py-1"
                            onClick={() => router.push(`/receipt/${p._id}`)}
                        >
                            Print Receipt
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
