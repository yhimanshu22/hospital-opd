import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function AddPatient() {
    const router = useRouter();
    const [doctors, setDoctors] = useState();
    const [form, setForm] = useState({
        name: "",
        age: "",
        gender: "",
        contact: "",
        address: "",
        guardian: "",
        opdNumber: "",
        doctorId: "",
        discount: 0,
        abhaNumber: "",
        abhaAddress: "",
        mrid: "",
        pro: "",
        allergy: "",
        visitValidity: "",
        priority: "",
        caseType: "",
        sittingLocation: "",
        religion: "",
        maritalStatus: "",
        dob: "",
        city: "",
        area: "",
        nationality: "",
        patientClass: "",
        referredBy: "",
        complaints: "",
        empanelment: "",
        cashPatient: false,
        appointmentBioReceipt: "",
        registrationNo: "",
        registrationType: "",
        consultant: "",
        department: "",
        time: "",
    });

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await axios.get("/api/doctors");
                setDoctors(data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };
        fetchDoctors();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data before request:", form);
        try {
            const response = await axios.post("/api/patients", form);
            console.log("API response:", response);
            router.push("/patient-list");
        } catch (error) {
            console.error("Error adding patient:", error);
            if (error.response) {
                console.log("Server response data:", error.response.data);
                console.log("Server response status:", error.response.status);
                console.log("Server response headers:", error.response.headers);
            } else if (error.request) {
                console.log("Request made but no response received:", error.request);
            } else {
                console.log("Error setting up the request:", error.message);
            }
        }
    };

    const cancel = () => {
        router.push("/dashboard");
    };

    return (
        <div className="flex w-full justify-center items-center h-screen">
            <Card className="w-full max-w-[1400px] p-6"> {/* Adjust card width as needed */}
                <CardHeader>
                    <CardTitle>Add Patient</CardTitle>
                    <CardDescription>Enter patient details.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid grid-cols-5  gap-4">
                        {/* Personal Details */}
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="age">Age</Label>
                            <Input
                                type="number"
                                id="age"
                                name="age"
                                placeholder="Age"
                                value={form.age}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="gender">Gender</Label>
                            <Input
                                type="text"
                                id="gender"
                                name="gender"
                                placeholder="Gender"
                                value={form.gender}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="contact">Contact</Label>
                            <Input
                                type="text"
                                id="contact"
                                name="contact"
                                placeholder="Contact"
                                value={form.contact}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Address"
                                value={form.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="guardian">Guardian</Label>
                            <Input
                                type="text"
                                id="guardian"
                                name="guardian"
                                placeholder="Guardian"
                                value={form.guardian}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="opdNumber">OPD Number</Label>
                            <Input
                                type="text"
                                id="opdNumber"
                                name="opdNumber"
                                placeholder="OPD Number"
                                value={form.opdNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="doctorId">Doctor</Label>
                            {doctors && doctors.length > 0 ? ( // Check if doctors is defined and not empty
                                <Select
                                    onValueChange={(value) => handleChange({ target: { name: "doctorId", value } })}
                                    value={form.doctorId}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Doctor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {doctors.map((doc) => (
                                            <SelectItem key={doc._id} value={doc._id}>
                                                {doc.name} ({doc.department})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <p>Loading doctors...</p> // Show a loading message while fetching
                            )}
                        </div>
                        <div>
                            <Label htmlFor="discount">Discount</Label>
                            <Input
                                type="number"
                                id="discount"
                                name="discount"
                                placeholder="Discount"
                                value={form.discount}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="abhaNumber">ABHA Number</Label>
                            <Input
                                type="text"
                                id="abhaNumber"
                                name="abhaNumber"
                                placeholder="ABHA Number"
                                value={form.abhaNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label htmlFor="abhaAddress">ABHA Address</Label>
                            <Input
                                type="text"
                                id="abhaAddress"
                                name="abhaAddress"
                                placeholder="ABHA Address"
                                value={form.abhaAddress}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="mrid">MRID</Label>
                            <Input
                                type="text"
                                id="mrid"
                                name="mrid"
                                placeholder="MRID"
                                value={form.mrid}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="pro">PRO</Label>
                            <Input
                                type="text"
                                id="pro"
                                name="pro"
                                placeholder="PRO"
                                value={form.pro}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="allergy">Allergy</Label>
                            <Input
                                type="text"
                                id="allergy"
                                name="allergy"
                                placeholder="Allergy"
                                value={form.allergy}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="visitValidity">Visit Validity</Label>
                            <Input
                                type="text"
                                id="visitValidity"
                                name="visitValidity"
                                placeholder="Visit Validity"
                                value={form.visitValidity}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="priority">Priority</Label>
                            <Input
                                type="text"
                                id="priority"
                                name="priority"
                                placeholder="Priority"
                                value={form.priority}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="caseType">Case Type</Label>
                            <Input
                                type="text"
                                id="caseType"
                                name="caseType"
                                placeholder="Case Type"
                                value={form.caseType}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="sittingLocation">Sitting Location</Label>
                            <Input
                                type="text"
                                id="sittingLocation"
                                name="sittingLocation"
                                placeholder="Sitting Location"
                                value={form.sittingLocation}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="religion">Religion</Label>
                            <Input
                                type="text"
                                id="religion"
                                name="religion"
                                placeholder="Religion"
                                value={form.religion}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="maritalStatus">Marital Status</Label>
                            <Input
                                type="text"
                                id="maritalStatus"
                                name="maritalStatus"
                                placeholder="Marital Status"
                                value={form.maritalStatus}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input
                                type="date"
                                id="dob"
                                name="dob"
                                placeholder="Date of Birth"
                                value={form.dob}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="City"
                                value={form.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="area">Area</Label>
                            <Input
                                type="text"
                                id="area"
                                name="area"
                                placeholder="Area"
                                value={form.area}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="nationality">Nationality</Label>
                            <Input
                                type="text"
                                id="nationality"
                                name="nationality"
                                placeholder="Nationality"
                                value={form.nationality}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="patientClass">Patient Class</Label>
                            <Input
                                type="text"
                                id="patientClass"
                                name="patientClass"
                                placeholder="Patient Class"
                                value={form.patientClass}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="referredBy">Referred By</Label>
                            <Input
                                type="text"
                                id="referredBy"
                                name="referredBy"
                                placeholder="Referred By"
                                value={form.referredBy}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="complaints">Complaints</Label>
                            <Input
                                type="text"
                                id="complaints"
                                name="complaints"
                                placeholder="Complaints"
                                value={form.complaints}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="empanelment">Empanelment</Label>
                            <Input
                                type="text"
                                id="empanelment"
                                name="empanelment"
                                placeholder="Empanelment"
                                value={form.empanelment}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="appointmentBioReceipt">Appointment Bio Receipt</Label>
                            <Input
                                type="text"
                                id="appointmentBioReceipt"
                                name="appointmentBioReceipt"
                                placeholder="Appointment Bio Receipt"
                                value={form.appointmentBioReceipt}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="registrationNo">Registration No</Label>
                            <Input
                                type="text"
                                id="registrationNo"
                                name="registrationNo"
                                placeholder="Registration No"
                                value={form.registrationNo}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="registrationType">Registration Type</Label>
                            <Input
                                type="text"
                                id="registrationType"
                                name="registrationType"
                                placeholder="Registration Type"
                                value={form.registrationType}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="consultant">Consultant</Label>
                            <Input
                                type="text"
                                id="consultant"
                                name="consultant"
                                placeholder="Consultant"
                                value={form.consultant}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="department">Department</Label>
                            <Input
                                type="text"
                                id="department"
                                name="department"
                                placeholder="Department"
                                value={form.department}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="time" >Time</Label>
                            <Input
                                type="text"
                                id="time"
                                name="time"
                                placeholder="Time"
                                value={form.time}
                                onChange={handleChange}
                            />
                        </div>


                        <div className="col-span-2 flex items-center">
                            <Checkbox
                                id="cashPatient"
                                name="cashPatient"
                                checked={form.cashPatient}
                                onCheckedChange={(checked) => handleChange({ target: { name: "cashPatient", type: "checkbox", checked } })}
                            />
                            <Label htmlFor="cashPatient">Cash Patient</Label>
                        </div>


                        <Button type="submit" className="col-span-2 cursor-pointer w-full">
                            Save
                        </Button>
                    </form>
                    <Button onClick={cancel} className="bg-red-700  hover:bg-red-600 text-white font-semibold px-6 py-4 m-2 cursor-pointer rounded-lg shadow-md w-full">
                        Cancel
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}