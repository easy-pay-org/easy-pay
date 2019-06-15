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


  Restaurant.create({ name, address, phone, logo, description })
    .then(restaurant => {

      // ---------- TODO: Condicion para que esto solo lo tenga un usuario owner -------------------
      // User.findByIdAndUpdate({ _id: user._id }, { restaurant: restaurant._id }, { new: true })
      //   .then(updatedUser => console.log('Usuario actualizado con el restaurante', updatedUser))


      let tables_array = []
      console.log('restaurante creado', restaurant)

      createTables = () => Table.create({ table_id: indexTable, qr_url: `${process.env.URLLOCAL}:5000?restaurant=${restaurant._id}&table=${indexTable}` })

      pupulateTables = () => {
        return Restaurant.findByIdAndUpdate({ _id: restaurant._id }, { tables: tables_array }, { new: true })
          .populate({
            path: 'tables',
          })
          .then(updatedRestaurant => {
            console.log('restaurante actualizado con las mesas', updatedRestaurant)
            return updatedRestaurant
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
          // .then(() => res.json(restaurant))
          .then((restaurant) => {
            console.log('El restaurante creado ---------->', restaurant)
            req.user.restaurant = restaurant
            console.log('El usuario actualizado ---------->', req.user)
            res.json(req.user)
          })


        User.findByIdAndUpdate({ _id: user._id }, { restaurant: restaurant._id }, { new: true })
          .then(updatedUser => console.log('Usuario actualizado con el restaurante', updatedUser))

      } else {
        res.status(401).json({ msg: 'Tienes que añadir al menos una mesa' })
      }

    })

    .catch(error => console.log(error))

})



router.post('/updateRestaurant', (req, res) => {

  const { name, address, phone, logo, description, id } = req.body

  Restaurant.findByIdAndUpdate({ _id: id }, { name, address, phone, logo, description }, { new: true })
    .populate('tables menu')
    .then(updatedRestaurant => {
      console.log('Restaurante actualizado', updatedRestaurant)

      // version 1 de la solucion
      // User.findById(req.user._id)
      //   .populate({
      //     path: 'restaurant',
      //     populate: { path: 'tables menu' }
      //   })
      // .exec((err, user) => {

      //   res.json(user)
      // })

      // Version 2: enviamos el usuario actualizado en vez del restaurante
      req.user.restaurant = updatedRestaurant
      console.log(req.user)
      res.json(req.user)
    })
    .catch(err => console.log('Error:', err))
})



router.post('/newPlate', (req, res) => {

  const { type, name, price, image, description } = req.body.menu

  Menu.create({ type, name, price, image, description })
    .then(menu => {
      console.log('El menu creado ---------->', menu)


      Restaurant.findByIdAndUpdate({ _id: req.body.restaurant_id }, { $push: { menu: menu._id } }, { new: true })
        .populate({
          path: 'menu',
        })
        .then(updatedRestaurant => {
          console.log('el restaurante actualizado con el plato', updatedRestaurant)
          // return res.json(updatedRestaurant)
          req.user.restaurant = updatedRestaurant
          console.log('El usuario actualizado ---------->', req.user)
          res.json(req.user)
        })

      // console.log('Menu creado', menu)
      // return res.json(menu)
    })
    .catch(err => console.log('Error:', err))
})




module.exports = router