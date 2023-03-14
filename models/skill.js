import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema

const skillSchema = new Schema({
  skillName: String,
  skillOwner: { type: Schema.Types.ObjectId, ref: 'Profile' }
}, {
  timestamps: true
})

const Skill = mongoose.model('Skill', skillSchema)

export { Skill }