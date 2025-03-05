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

        // Header
        doc.text("SYAM CHILDREN AND MATERNITY HOSPITAL", 20, 20);
        doc.text("---------------------------------------", 20, 28);

        // Client Details
        doc.text(`Client: ${patient.name}`, 20, 40);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 100, 40);
        doc.text(`Receipt No.: ${patient.opdNumber}`, 100, 50);
        doc.text(`Served by: ${patient.doctor?.name}`, 100, 60);

        // Table Header
        doc.text("Code", 20, 80);
        doc.text("Product/Service", 60, 80);
        doc.text("Cost", 120, 80);
        doc.text("Total", 150, 80);
        doc.line(20, 85, 180, 85);

        // Table Data
        doc.text("OPD Fee", 60, 95);
        doc.text(`₹${patient.doctor?.consultationFee}`, 120, 95);
        doc.text(`₹${patient.finalFee}`, 150, 95);

        // Footer
        doc.line(20, 110, 180, 110);
        doc.text(`Subtotal: ₹${patient.doctor?.consultationFee}`, 120, 120);
        doc.text(`Discount: ₹${patient.discount}`, 120, 130);
        doc.text(`Total: ₹${patient.finalFee}`, 120, 140);

        doc.save(`Receipt_${patient.opdNumber}.pdf`);

        router.push("/patient-list");
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Receipt</h1>
            {patient && (
                <div className="border p-4 max-w-lg mx-auto">
                    {/* Header */}
                    <div className="text-center mb-4">
                        <h2 className="text-xl font-semibold">SYAM CHILDREN AND MATERNITY HOSPITAL</h2>
                        <hr />
                    </div>

                    {/* Client Details */}
                    <div className="flex justify-between mb-4">
                        <div>
                            <p><strong>Client:</strong> {patient.name}</p>
                        </div>
                        <div>
                            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                            <p><strong>Receipt No.:</strong> {patient.opdNumber}</p>
                            <p><strong>Served by:</strong> {patient.doctor?.name}</p>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="grid grid-cols-4 gap-2 border-b-2 pb-2">
                        <div className="font-semibold">Code</div>
                        <div className="font-semibold">Product/Service</div>
                        <div className="font-semibold">Cost</div>
                        <div className="font-semibold">Total</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2 border-b">
                        <div>OPD Fee</div>
                        <div>Consultation</div>
                        <div>₹{patient.doctor?.consultationFee}</div>
                        <div>₹{patient.finalFee}</div>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 text-right">
                        <p><strong>Subtotal:</strong> ₹{patient.doctor?.consultationFee}</p>
                        <p><strong>Discount:</strong> ₹{patient.discount}</p>
                        <p><strong>Total:</strong> ₹{patient.finalFee}</p>
                    </div>
                </div>
            )}
            <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={printReceipt}>
                Print Receipt
            </button>
        </div>
    );
}