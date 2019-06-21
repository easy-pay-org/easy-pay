import axios from 'axios'


export default class services {

  constructor() {

    this.service = axios.create({
      baseURL: process.env.REACT_APP_URL_IO
    })
  }


  postCharge = (stripeToken, price, name) => {
    return this.service.post('upload', { stripeToken, price, name }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  // const stripeToken = req.body.stripeToken;
  // const price = req.body.price;
  // const amount = req.body.price * 100;
  // const productName = req.body.name;


}