const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const Restaurant = require('../models/restaurant.model')
const Table = require('../models/table.model')
const Menu = require('../models/menu.model.js')



router.post('/newRestaurant', (req, res) => {
  const { name, address, phone, logo, tables_quantity, description } = req.body.restaurant
  const user = req.body.user
  let indexTable = 1


  Restaurant.create({ name, address, phone, description })
    .then(restaurant => {

      // ---------- TODO: Condicion para que esto solo lo tenga un usuario owner -------------------
      User.findByIdAndUpdate({ _id: user._id }, { restaurant: restaurant._id }, { new: true })
        .then(updatedUser => console.log('Usuario actualizado con el restaurante', updatedUser))


      let tables_array = []
      console.log('restaurante creado', restaurant)

      createTables = () => Table.create({ table_id: indexTable, qr_url: `${process.env.URLLOCAL}:5000?restaurant=${restaurant._id}&table=${indexTable}` })

      pupulateTables = () => {
        return Restaurant.findByIdAndUpdate({ _id: restaurant._id }, { tables: tables_array }, { new: true })
          .then(updatedRestaurant => {
            console.log('restaurante actualizado con las mesas', updatedRestaurant)
          })
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


      if (tables_quantity > 0) {

        recursive()
          .then(() => res.json(restaurant))
      } else {
        res.status(401).json({ msg: 'Tienes que añadir al menos una mesa' })
      }

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
          // return res.json(updateRestaurant)
        })
    })
    .catch(err => console.log('Error:', err))
})




module.exports = router