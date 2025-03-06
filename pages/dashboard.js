import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button"; // Using Shadcn UI Button
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"; // Using Shadcn UI Table

export default function Dashboard() {
    const [doctors, setDoctors] = useState([]);
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.post("/api/auth/logout");
            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await axios.get("/api/doctors");
                if (res.data && res.data.length > 0) {
                    setDoctors(res.data);
                }
            } catch (err) {
                console.error("Error fetching doctors:", err);
            }
        };
        fetchDoctors();
    }, []);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Hospital OPD Management</h1>
                <Button variant="destructive" className='cursor-pointer' onClick={logout}>
                    Logout
                </Button>
            </div>

            <div className="flex gap-2 mb-4">
                <Button className='cursor-pointer' onClick={() => router.push("/add-doctor")}>Add Doctor</Button>
                <Button className='cursor-pointer' onClick={() => router.push("/add-patient")}>Add Patient</Button>
                <Button className='cursor-pointer' onClick={() => router.push("/patient-list")}>Patient List</Button>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-2">Doctors List</h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Consultation Fee</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {doctors.map((doc) => (
                        <TableRow key={doc._id}>
                            <TableCell>{doc.name}</TableCell>
                            <TableCell>{doc.department}</TableCell>
                            <TableCell>₹{doc.consultationFee}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}