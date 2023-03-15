import { Profile } from "../models/profile.js";
import { Job } from "../models/job.js";

const index = async (req, res) => {
    try {
        const jobs = await Job.find({})
            .populate('applicant')
        res.status(200).json(jobs)
    } catch (error) {
        console.log("This is the problem", error);
        res.status(500).json(error)
    }
}

const createJob = async (req, res) => {
    try {
        req.body.applicant = req.user.profile
        const job = await Job.create(req.body)
        const profile = await Profile.findByIdAndUpdate(
            req.user.profile,
            { $push: { jobApplied: job } },
            { new: true }
        )
        job.applicant = profile
        res.status(201).json(job)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id)
        const profile = await Profile.findById(req.user.profile)
        profile.jobApplied.remove({ _id: req.params.id })
        await profile.save()
        res.status(200).json(job)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
            .populate('applicant')
        res.status(200).json(job)
    } catch (error) {
        console.log("ERROR", error)
        res.status(500).json(error)
    }
}

const showJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate('applicant')
        res.status(200).json(job)
    } catch (error) {
        res.status(500).json(error)
    }
}

export { index, createJob, deleteJob, updateJob, showJob }