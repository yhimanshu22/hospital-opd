import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function PatientList() {
    const [patients, setPatients] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get("/api/patients").then((res) => setPatients(res.data));
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Patient List</h1>
            <div className="flex gap-4 mb-4"> {/* Use flexbox for button layout */}
                <Button className='cursor-pointer' onClick={() => router.push("/add-patient")}>
                    Add Patient
                </Button>
                <Button className='cursor-pointer' onClick={() => router.push("/dashboard")}>
                    Dashboard
                </Button>
            </div>
            <Table>
                <TableCaption>List of patients</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>OPD Number</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Fee</TableHead>
                        <TableHead>Actions</TableHead> {/* Add head for Actions column */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {patients.map((p) => (
                        <TableRow key={p._id}>
                            <TableCell>{p.name}</TableCell>
                            <TableCell>{p.opdNumber}</TableCell>
                            <TableCell>{p.doctor?.name}</TableCell>
                            <TableCell>₹{p.finalFee}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className='cursor-pointer'
                                    onClick={() => router.push(`/receipt/${p._id}`)}
                                >
                                    Print Receipt
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}