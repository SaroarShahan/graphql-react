import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdEvent: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }
})

module.exports = model('User', userSchema)
