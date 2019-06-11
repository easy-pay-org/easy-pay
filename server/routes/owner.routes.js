const express = require('express')
const router = express.Router()

const Restaurant = require('../models/restaurant.model')
const Table = require('../models/table.model')
const Menu = require('../models/menu.model.js')




router.post('/newRestaurant', (req, res) => {
  const { name, adress, phone, logo, tables_quantity, description } = req.body
  // let table_id = 1
  // let qr_url = 'url test'
  let indexTable = 1

  Restaurant.create({ name, adress, phone, description })
    .then(restaurant => {
      console.log('restaurante creado', restaurant)

      let tables_array = []


      createTables = () => Table.create({ table_id: indexTable, qr_url: `${process.env.URLLOCAL}:5000?restaurant=${restaurant._id}&table=${indexTable}` })

      pupulateTables = () => {
        return Restaurant.findByIdAndUpdate({ _id: restaurant._id }, { tables: tables_array }, { new: true })
          .then(updatedRestaurant => console.log('restaurante actualizado con las mesas', updatedRestaurant))
      }


      recursive = () => {

        return createTables()
          .then(table => {
            console.log('mesa creada', table)

            tables_array.push(table._id)
            indexTable++

            if (indexTable <= tables_quantity)
              return recursive()
            else
              return pupulateTables()
          })
          .catch(error => console.log(error))
      }


      if (tables_quantity > 0)
        recursive()
          .then(() => res.json(restaurant))

    })
    .catch(error => console.log(error))

})




router.post('/newPlate', (req, res) => {

  const { type, name, price, image, description } = req.body.menu

  Menu.create({ type, name, price, image, description })
    .then(menu => {

      console.log('Menu creado', menu)

      Restaurant.findByIdAndUpdate({ _id: req.body.restaurant_id }, { $push: { menu: menu._id } }, { new: true })
        .then(updateRestaurant => {
          console.log('el restaurante actualizado con el plato', updateRestaurant)
          // return res.json(menu)
        })
    })
    .catch(err => console.log('Error:', err))
})



// Restaurant.findByIdAndUpdate({ _id: req.body.restaurant_id }, { menu }, { new: true })
//   .then(updateRestaurant => {
//     console.log('el restaurante actualizado con el menu', updateRestaurant)
//     return res.json(menu)
//   })




module.exports = router