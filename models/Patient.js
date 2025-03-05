// models/Patient.js
import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    guardian: { type: String, required: false },
    opdNumber: { type: String, required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    discount: { type: Number, default: 0 },
    finalFee: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
});

export default mongoose.models.Patient || mongoose.model("Patient", PatientSchema);
