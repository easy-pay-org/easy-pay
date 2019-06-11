const express = require('express')
const router = express.Router()

const Restaurant = require('../models/restaurant.model')
const Table = require('../models/table.model')
const Menu = require('../models/menu.model.js')


router.post('/newRestaurant', (req, res) => {
  const { name, adress, phone, logo, tables_quantity, description } = req.body
  let table_id
  let qr_url = 'url test'
  let indexTable = 1

  Restaurant.create({ name, adress, phone, description })
    .then(restaurant => {
      console.log('restaurante creado', restaurant)

      let tables_array = []


      createTables = () => Table.create({ table_id: indexTable, qr_url })

      pupulateTables = () => {
        Restaurant.findByIdAndUpdate({ _id: restaurant._id }, { tables: tables_array }, { new: true })
          .then(updatedRestaurant => console.log('updatedRestaurant', updatedRestaurant))
      }


      recursive = () => {

        createTables()
          .then(table => {

            tables_array.push(table._id)
            indexTable++

            if (indexTable <= tables_quantity)
              recursive()
            else
              pupulateTables()
          })
          .catch(error => console.log(error))
      }

      if (tables_quantity > 0)
        recursive()

      res.json(restaurant)
    })
    .catch(error => console.log(error))



})



router.post('/newMenu', (req, res) => {
  console.log(req.body)
  Menu.create(req.body)
    .then(data => res.json(data))
    .catch(err => console.log('Error:', err))
})




module.exports = router