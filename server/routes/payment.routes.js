require('dotenv').config()
const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.use(require("body-parser").text());


router.post('/charge', async (req, res) => {
  let { status } = await stripe.charges.create({
    amount: req.body.split(' ')[1],
    currency: "usd",
    description: "An example charge",
    source: req.body.split(' ')[0]
  })
    .then(res => res.json({ status }))
    .catch(error => error.response.data)
})



// catch (err) {
//   console.log(err)
//   res.status(500).end();
// }

// router.post("/charge", async (req, res) => {
//   try {
//     let { status } = await stripe.charges.create({
//       amount: 2000,
//       currency: "usd",
//       description: "An example charge",
//       source: req.body
//     });

//     res.json({ status });
//   } catch (err) {
//     res.status(500).end();
//   }
// });




module.exports = router
