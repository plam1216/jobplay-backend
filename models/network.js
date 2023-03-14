import mongoose from 'mongoose'

const Schema = mongoose.Schema


const connectionSchema = new Schema({
  name: String,
  title: String,
  company: String
} , {
  timestamps: true
})

const networkSchema = new Schema({
  networker: {type: Schema.Types.ObjectId, ref: 'Profile'},
  eventName: String,
  connection: [connectionSchema],
},{
  timestamps: true,
})

const Network = mongoose.model('Network', networkSchema)

export { Network }