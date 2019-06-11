const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema({
  type: {
    type: String,
    enum: ['starters', 'first_courses', 'second_courses', 'drinks', 'desserts']
  },
  name: String,
  description: String,
  price: Number,
  currency_code: {
    type: String,
    default: "EUR"
  },
  image: {
    imgName: String,
    imgPath: String
  },
  restaurant: [{
    type: Schema.Types.ObjectId,
    ref: "Restaurant"
  }]
}, {
    timestamps: true
  })

const Menu = mongoose.model('Menu', menuSchema)
module.exports = Menu