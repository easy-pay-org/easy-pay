const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const Restaurant = require('../models/restaurant.model')
const Table = require('../models/table.model')
const Menu = require('../models/menu.model.js')
const Order = require('../models/order.model')



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

      createTables = () => Table.create({ table_id: indexTable, qr_url: `${restaurant._id}/${indexTable}` })

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
    .populate({
      path: 'restaurant',
      populate: { path: 'tables menu' }
    })
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


router.post('/updateMenu', (req, res) => {

  const { name, price, image, description, id } = req.body.menu
  console.log('el req.body', req.body.menu)

  Menu.findByIdAndUpdate({ _id: id }, { name, price, image, description }, { new: true })
    .then(updatedCourse => {
      console.log('Menu actualizado', updatedCourse)
      // console.log('usuario-------', req.user.restaurant.menu)
      console.log('id--->', id)
      // console.log('menu--->', req.user.restaurant.menu)

      req.user.restaurant.menu.forEach((course, index) => {
        // console.log('course._id------------->', course._id)
        // course._id === id ? req.user.restaurant.menu[index] = updatedCourse : null
        // console.log(course._id == id)
        if (course._id == id) {
          console.log('antes---------------->', req.user.restaurant.menu[index])
          req.user.restaurant.menu[index] = updatedCourse
          console.log('despues---------------->', req.user.restaurant.menu[index])
        }
      })

      // req.user.restaurant.menu[posRestaurantInArray] = updatedCourse
      console.log('menu del usuario actualizado', req.user.restaurant.menu)

      res.json(req.user)
    })
    .catch(err => console.log('Error:', err))
})


router.post('/deleteMenu', (req, res) => {

  const { menu } = req.body
  // console.log('menu', menu)
  // console.log('id', menu._id)

  Menu.findByIdAndDelete(menu._id)
    .then(() => {

      req.user.restaurant.menu.forEach((course, idx) => {
        if (course._id == menu._id) {
          req.user.restaurant.menu.splice(idx, 1)
        }
      })

      console.log('menu actualizado en el usuario', req.user.restaurant)
      res.json(req.user)
    })
    .catch(err => console.log('Error:', err))

})

router.get('/getRestaurantMenu/:menu_id', (req, res) => {

  Restaurant.findById(req.params.menu_id)
    .populate({
      path: 'menu',
    })
    .then(restaurant => {
      res.json(restaurant.menu)
    })
    .catch(err => console.log('Error:', err))
})


// Order

router.post('/newOrder', (req, res) => {

  const { name, price, description, image, quantity } = req.body.order
  const user = req.user

  Order.create({ name, price, description, image, quantity })
    .then(order => {
      console.log('La orden', order)

      User.findByIdAndUpdate({ _id: user._id }, { $push: { order: order._id } }, { new: true })
        .then(updatedUser => {
          console.log('Usuario actualizado con la orden', updatedUser)
          res.json(order)
        })


    })
    .catch(err => console.log('Error:', err))

})



router.post('/updateOrder', (req, res) => {

  const { order } = req.body
  // let indexCourse = 0


  // updateCourses = () => {
  //   return Order.findByIdAndUpdate({ _id: order[indexCourse].id }, { quantity: order[indexCourse].quantity }, { new: true })
  // }

  // recursive = () => {

  //   return updateCourses()
  //     .then(updatedCourse => {
  //       req.user.order[indexCourse] = updatedCourse

  //       if (indexCourse < order.length - 1) {
  //         indexCourse++
  //         return recursive()
  //       }

  //     })
  //     .catch(error => console.log(error))
  // }


  // if (order.length > 0) {

  //   recursive()
  //     .then(() => {
  //       res.json(req.user.order)
  //     })

  // } else {
  //   res.status(401).json({ msg: 'Tienes que añadir al menos un plato' })
  // }

  Promise.all(order.map(o => Order.findByIdAndUpdate({ _id: o._id }, { quantity: +(o.quantity) }, { new: true })))
    .then(arrOrder => res.json(arrOrder))
    .catch(err => {
      console.log(err)
      res.status(500).json({ msg: 'algo mal' })
    })


})


router.post('/updateCourse', (req, res) => {
  console.log('req body of updateCourse', req.body)
  const { order } = req.body

  Order.findByIdAndUpdate({ _id: order._id }, { quantity: +(order.quantity) }, { new: true })
    .then(courseUpdated => res.json(courseUpdated))
})



router.get('/getOrder', (req, res) => {

  const user = req.user

  User.findById({ _id: user._id })
    .populate({
      path: 'order',
    })
    .then(user => {

      // console.log('el menu del usuario', user.order)
      res.json(user.order)
    })
    .catch(err => console.log('Error:', err))

})


router.post('/clearOrder', (req, res) => {

  const { order_id } = req.body
  console.log('order_id----->', order_id)
  console.log('user id----->', req.user._id)
  console.log('req.user.order antes--->', req.user.order)


  User.findByIdAndUpdate({ _id: req.user._id }, { $pull: { order: order_id } }, { new: true })
    .then(userUpdated => {
      console.log('req.user.order despues--->', req.user.order)
      console.log('userUpdated.order--->', userUpdated.order)
      req.user.order = userUpdated.order
      console.log('order actualizado--->', req.user.order)
      res.json(req.user.order)
    })
    .catch(error => console.log(error))

})


router.post('/clearAllOrder', (req, res) => {

  // const { order_id } = req.body

  User.findByIdAndUpdate({ _id: req.user._id }, { $set: { order: [] } }, { new: true })
    .then(userUpdated => {
      console.log('order borrado', req.user.order)
      res.json(req.user.order)
    })
    .catch(error => console.log(error))

})



// User

router.post('/setRestaurant', (req, res) => {
  const currentRestaurant = req.body
  console.log('currentRestaurant actualizado---------->', currentRestaurant)

  User.findByIdAndUpdate({ _id: req.user._id }, { currentRestaurant }, { new: true })
    .then(user => {
      console.log('current Restaurant', user.currentRestaurant)
      res.json(user.currentRestaurant)
    })
    .catch(error => console.log(error))

})


router.get('/getCurrentRestaurant', (req, res) => {
  User.findById({ _id: req.user._id })
    .then(user => {
      console.log('el restaurante actual del user es', user)
      res.json(user.currentRestaurant)
    })
    .catch(err => console.log('Error:', err))
})




module.exports = router