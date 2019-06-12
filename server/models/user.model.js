const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  mobile: Number,
  image: {
    imgName: String,
    imgPath: String
  },
  role: {
    type: String,
    enum: ['user', 'owner', 'admin'],
    default: 'user'
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant"
  }
}, {
    timestamps: true
  })

const User = mongoose.model('User', userSchema)
module.exports = User

