import mongoose from 'mongoose'

const Schema = mongoose.Schema

const badgeSchema = new Schema({
  name: String,
  point: Number,
  photo: String
},{
  timestamps: true,
})

const Badge = mongoose.model('Badge', profileSchema)

export { Badge }