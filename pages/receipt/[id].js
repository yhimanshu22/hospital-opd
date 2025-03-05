// pages/receipt/[id].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import jsPDF from "jspdf";

export default function ReceiptPage() {
    const router = useRouter();
    const { id } = router.query;
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get("/api/patients").then((res) => {
                const found = res.data.find((p) => p._id === id);
                setPatient(found);
            });
        }
    }, [id]);

    const printReceipt = () => {
        if (!patient) return;

        const doc = new jsPDF();

        doc.text("SYAM CHILDREN AND MATERNITY HOSPITAL", 20, 20);
        doc.text("---------------------------------------", 20, 28);

        doc.text(`Name: ${patient.name}`, 20, 40);
        doc.text(`OPD Number: ${patient.opdNumber}`, 20, 50);
        doc.text(`Age: ${patient.age}`, 20, 60);
        doc.text(`Gender: ${patient.gender}`, 20, 70);
        doc.text(`Contact: ${patient.contact}`, 20, 80);
        doc.text(`Address: ${patient.address}`, 20, 90);

        doc.text(`Doctor: ${patient.doctor?.name}`, 20, 100);
        doc.text(`Department: ${patient.doctor?.department}`, 20, 110);
        doc.text(`Consultation Fee: ₹${patient.doctor?.consultationFee}`, 20, 120);
        doc.text(`Discount: ₹${patient.discount}`, 20, 130);
        doc.text(`Final Fee: ₹${patient.finalFee}`, 20, 140);

        doc.save(`Receipt_${patient.opdNumber}.pdf`);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Receipt</h1>
            {patient && (
                <div className="space-y-2 mb-4">
                    <p>
                        <strong>Name:</strong> {patient.name}
                    </p>
                    <p>
                        <strong>OPD Number:</strong> {patient.opdNumber}
                    </p>
                    <p>
                        <strong>Age:</strong> {patient.age}
                    </p>
                    <p>
                        <strong>Gender:</strong> {patient.gender}
                    </p>
                    <p>
                        <strong>Contact:</strong> {patient.contact}
                    </p>
                    <p>
                        <strong>Address:</strong> {patient.address}
                    </p>
                    <p>
                        <strong>Doctor:</strong> {patient.doctor?.name}
                    </p>
                    <p>
                        <strong>Department:</strong> {patient.doctor?.department}
                    </p>
                    <p>
                        <strong>Discount:</strong> ₹{patient.discount}
                    </p>
                    <p>
                        <strong>Final Fee:</strong> ₹{patient.finalFee}
                    </p>
                </div>
            )}
            <button className="bg-blue-500 text-white px-4 py-2" onClick={printReceipt}>
                Print Receipt
            </button>
        </div>
    );
}
