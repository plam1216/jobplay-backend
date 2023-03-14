import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  netScore: Number,
  jobScore: Number,
  skillScore: Number,
  badge: [{ type: Schema.Types.ObjectId, ref: "Badge" }],
  skillsUnlock: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  networkMade: [{ type: Schema.Types.ObjectId, ref: "Network" }],
  jobApplied: [{ type: Schema.Types.ObjectId, ref: "Job" }],

},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
