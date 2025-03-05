// pages/index.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  // Dummy data added as the initial state.
  const [doctors, setDoctors] = useState([
    { _id: "1", name: "Dr. John Doe", department: "Cardiology", consultationFee: 500 },
    { _id: "2", name: "Dr. Jane Smith", department: "Neurology", consultationFee: 600 },
    { _id: "3", name: "Dr. Sam Lee", department: "Pediatrics", consultationFee: 400 },
  ]);
  const router = useRouter();

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
      <h1 className="text-2xl font-bold mb-4">Hospital OPD Management</h1>

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
