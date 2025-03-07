import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import jsPDF from "jspdf";

export default function OPDReceipt() {
    const router = useRouter();
    const { id } = router.query;
    const [patient, setPatient] = useState(null);
    const [prescription, setPrescription] = useState("");
    const receiptRef = useRef(null);

    useEffect(() => {
        if (id) {
            axios.get("/api/patients").then((res) => {
                const found = res.data.find((p) => p._id === id);
                setPatient(found);
            });
        }
    }, [id]);

    const handlePrint = () => {
        const doc = new jsPDF();
        doc.text("SHYAM CHILDREN AND MATERNITY CENTER", 20, 20);
        doc.text("C-15 New Azad Nagar, Kalyanpur, Kanpur-208017", 20, 28);
        doc.text("-------------------------------------------------", 20, 34);

        if (patient) {
            doc.text(`Token No: ${patient.tokenNumber}`, 20, 50);
            doc.text(`OPD No: ${patient.opdNumber}`, 140, 50);
            doc.text(`Patient Name: ${patient.name}`, 20, 60);
            doc.text(`Age/Gender: ${patient.age} / ${patient.gender}`, 140, 60);
            doc.text(`Guardian Name: ${patient.guardianName}`, 20, 70);
            doc.text(`Address: ${patient.address}`, 20, 80);
            doc.text(`Date: ${patient.date}`, 140, 80);

            doc.text("Symptoms:", 20, 100);
            doc.text(`${patient.symptoms}`, 40, 110);

            doc.text("Prescription:", 20, 130);
            doc.text(`${prescription}`, 40, 140);

            doc.text("Doctor:", 20, 160);
            doc.text(`${patient.doctor?.name} (${patient.doctor?.specialization})`, 40, 170);
        }

        doc.save(`OPD_Receipt_${patient?.opdNumber}.pdf`);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-md bg-white">
            <h1 className="text-2xl font-bold text-center mb-4">
                SHYAM CHILDREN AND MATERNITY CENTER
            </h1>
            <p className="text-center text-sm">
                C-15 New Azad Nagar, Kalyanpur, Kanpur-208017
            </p>
            <hr className="my-4" />

            {patient && (
                <div className="grid grid-cols-2 gap-4">
                    <p><strong>Token No:</strong> {patient.tokenNumber}</p>
                    <p><strong>OPD No:</strong> {patient.opdNumber}</p>
                    <p><strong>Patient Name:</strong> {patient.name}</p>
                    <p><strong>Age/Gender:</strong> {patient.age} / {patient.gender}</p>
                    <p><strong>Guardian Name:</strong> {patient.guardianName}</p>
                    <p><strong>Address:</strong> {patient.address}</p>
                    <p><strong>Date:</strong> {patient.date}</p>
                    <p><strong>Valid Upto:</strong> {patient.validUpto}</p>
                </div>
            )}

            <div className="mt-4">
                <label className="font-semibold">Symptoms:</label>
                <textarea
                    className="w-full border p-2 mt-2"
                    rows="2"
                    value={patient?.symptoms || ""}
                    disabled
                />
            </div>

            <div className="mt-4">
                <label className="font-semibold">Prescription:</label>
                <textarea
                    className="w-full border p-2 mt-2"
                    rows="3"
                    value={prescription}
                    onChange={(e) => setPrescription(e.target.value)}
                    placeholder="Write prescribed medicines..."
                />
            </div>

            <div className="mt-4">
                <p><strong>Doctor:</strong> {patient?.doctor?.name} ({patient?.doctor?.specialization})</p>
            </div>

            <div className="flex gap-4 mt-6">
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded w-full"
                    onClick={() => router.push("/patient-list")}
                >
                    Cancel
                </button>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                    onClick={handlePrint}
                >
                    Print Receipt
                </button>
            </div>
        </div>
    );
}
