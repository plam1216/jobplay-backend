import { Job } from "../models/job.js";

const index = (req, res) => {
    Job.find({})
        .populate('applicant')
        .then(jobs => {
            res.json(jobs)
        })
        .catch(err => {
            console.log(err)
            res.stats(500).json(err)
        })
}

const createJob = (req, res) => {
    req.body.applicant = req.user.profile
    console.log(req.user.applicant)
    Job.create(req.body)
        .then(job => {
            Job.findById(job._id)
                .populate('applicant')
                .then(populatedJob => {
                    res.json(populatedJob)
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err: err.errmsg })
        })
}

const deleteJob = (req, res) => {
    Job.findById(req.params.id)
        .then(job => {
            if (job.applicant._id.equals(req.user.profile)) {
                Job.findByIdAndDelete(job._id)
                    .then(deletedJob => {
                        res.json(deletedJob)
                    })
            } else {
                res.status(401).json({ err: "Not authorized" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err: err.errmsg })
        })
}

const updateJob = (req, res) => {
    Job.findById(req.params.id)
        .then(job => {
            if (job.applicant._id.equals(req.user.profile)) {
                Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
                    .populate('applicant')
                    .then(updatedJob => {
                        res.json(updatedJob)
                    })
            } else {
                res.status(401).json({ err: "Not authorized" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err: err.errmsg })
        })
}

export { index, createJob, deleteJob, updateJob }