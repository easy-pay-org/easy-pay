const mongoose = require('mongoose')
const Schema = mongoose.Schema

orderSchema = new Schema({
  nombre: String,
  precio: Number,
  description: String,
  quantity: Number,
}, {
    timestamps: true
  })

const Order = mongoose.model('Order', orderSchema)
module.exports = Order