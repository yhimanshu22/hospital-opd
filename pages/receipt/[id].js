import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function PrescriptionPage() {
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

    const printPrescription = () => {
        if (!patient) return;

        const doc = new jsPDF();

        // Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("SYAM CHILDREN AND MATERNITY HOSPITAL", 105, 20, { align: "center" });
        doc.setFontSize(12);
        doc.text("--------------------------------------------------", 105, 26, { align: "center" });

        // Patient Details Table (Side by Side)
        autoTable(doc, {
            startY: 40,
            body: [
                ["Name", patient.name, "Age", patient.age],
                ["OPD Number", patient.opdNumber, "Gender", patient.gender],
                ["Contact", patient.contact, "Doctor", patient.doctor?.name],
                ["Address", patient.address, "Department", patient.doctor?.department],
                ["Discount", `₹${patient.discount}`, "Final Fee", `₹${patient.finalFee}`]
            ],
            theme: "striped",
            styles: { fontSize: 11, cellPadding: 3 },
            columnStyles: {
                0: { fontStyle: "bold", halign: "left" },
                1: { halign: "left" },
                2: { fontStyle: "bold", halign: "left" },
                3: { halign: "left" },
            },
        });

        // Medicines Section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Prescribed Medicines:", 20, doc.lastAutoTable.finalY + 15);
        doc.setFont("helvetica", "normal");

        // Leave space for manual writing
        let y = doc.lastAutoTable.finalY + 25;
        for (let i = 0; i < 5; i++) {
            doc.text("__________________________________________", 20, y);
            y += 10;
        }

        doc.save(`Prescription_${patient.opdNumber}.pdf`);
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Prescription</h1>
            {patient && (
                <div className="p-4 border rounded-lg shadow-md">
                    <div className="grid grid-cols-2 gap-4">
                        <p><strong>Name:</strong> {patient.name}</p>
                        <p><strong>Age:</strong> {patient.age}</p>
                        <p><strong>OPD Number:</strong> {patient.opdNumber}</p>
                        <p><strong>Gender:</strong> {patient.gender}</p>
                        <p><strong>Contact:</strong> {patient.contact}</p>
                        <p><strong>Doctor:</strong> {patient.doctor?.name}</p>
                        <p><strong>Address:</strong> {patient.address}</p>
                        <p><strong>Department:</strong> {patient.doctor?.department}</p>
                        <p><strong>Discount:</strong> ₹{patient.discount}</p>
                        <p><strong>Final Fee:</strong> ₹{patient.finalFee}</p>
                    </div>
                </div>
            )}
            <button
                className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md"
                onClick={printPrescription}
            >
                Print Prescription
            </button>
        </div>
    );
}
