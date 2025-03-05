import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: "Helvetica",
    },
    header: {
        textAlign: "center",
        marginBottom: 20,
    },
    clientDetails: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    table: {
        display: "flex",
        flexDirection: "column",
    },
    tableRow: {
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 5,
        marginBottom: 5,
    },
    tableCell: {
        width: "25%",
    },
    footer: {
        marginTop: 20,
        textAlign: "right",
    },
});

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

    const Receipt = ({ patient }) => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>SYAM CHILDREN AND MATERNITY HOSPITAL</Text>
                    <Text style={{ fontSize: 14 }}>---------------------------------------</Text>
                </View>
                <View style={styles.clientDetails}>
                    <View>
                        <Text>Client: {patient.name}</Text>
                    </View>
                    <View>
                        <Text>Date: {new Date().toLocaleDateString()}</Text>
                        <Text>Receipt No.: {patient.opdNumber}</Text>
                        <Text>Served by: {patient.doctor?.name}</Text>
                    </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>Code</Text>
                        <Text style={styles.tableCell}>Product/Service</Text>
                        <Text style={styles.tableCell}>Cost</Text>
                        <Text style={styles.tableCell}>Total</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>OPD Fee</Text>
                        <Text style={styles.tableCell}>Consultation</Text>
                        <Text style={styles.tableCell}>₹{patient.doctor?.consultationFee}</Text>
                        <Text style={styles.tableCell}>₹{patient.finalFee}</Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text>Subtotal: ₹{patient.doctor?.consultationFee}</Text>
                    <Text>Discount: ₹{patient.discount}</Text>
                    <Text style={{ fontWeight: "bold" }}>Total: ₹{patient.finalFee}</Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Receipt</h1>
            {patient && (
                <div>
                    <PDFDownloadLink document={<Receipt patient={patient} />} fileName={`Receipt_${patient.opdNumber}.pdf`}>
                        {({ loading }) => (loading ? <button className="bg-blue-500 text-white px-4 py-2 mt-4">Loading...</button> : <button className="bg-blue-500 text-white px-4 py-2 mt-4">Download Receipt</button>)}
                    </PDFDownloadLink>
                    {/* Display the receipt on the page */}
                    <Receipt patient={patient} />
                </div>
            )}
        </div>
    );
}