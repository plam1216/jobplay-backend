import mongoose from "mongoose";

const Schema = mongoose.Schema

const jobSchema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    status: { type: String, enum: ['SAVED', 'APPLIED', 'IN PROGRESS'], required: true },
    applicant: { type: Schema.Types.ObjectId, ref: 'Profile' }
}, {
    timestamps: true,
})

const Job = mongoose.model('Job', jobSchema)

export { Job }