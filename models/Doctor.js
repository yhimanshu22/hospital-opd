// models/Doctor.js
import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    contact: { type: String, required: true },
    consultationFee: { type: Number, required: true },
}, { timestamps: { createdAt: 'creationDate', updatedAt: 'lastUpdated' } });

export default mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);
