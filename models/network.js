import mongoose from 'mongoose'

const Schema = mongoose.Schema

const eventSchema = new Schema({
  name: String,
  attended: {type: Boolean, default: false},
  attendee: {type: Schema.Types.ObjectId, ref: 'Profile'}
} , {
  timestamps: true
})

const connectionSchema = new Schema({
  name: String,
  title: String,
  company: String,
  attendee: {type: Schema.Types.ObjectId, ref: 'Profile'}
} , {
  timestamps: true
})

const networkSchema = new Schema({
  networker: {type: Schema.Types.ObjectId, ref: 'Profile'},
  event: [eventSchema],
  connection: [connectionSchema],
},{
  timestamps: true,
})

const Network = mongoose.model('Network', networkSchema)

export { Network }