import React, { Component } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements';
import styled from 'styled-components'


import PayServices from '../../service/payment-services'

// Stripe.setPublishableKey("pk_test_RpU4gUbkBjJ9YrTtKhNs1nYx006uRaolap");
// import Stripe from 'stripe';
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Stripe.setPublishableKey('sk_test_d4ZDWJPiJLGKVbojrq2g0yxU00k5K2466R');

// const script = document.createElement('script');

// script.async = true;
// script.src = 'https://js.stripe.com/v3';
// document.body.appendChild(script);



class Payment extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit;

    this.state = {
      productInfo: {
        uuid: 1,
        productName: 'menu',
        productDescription: 'purchase',
        productPrice: 10.99,

        cardName: 'Pepe',
        cardNumber: 4242424242424242,
      },
      show: false
    }
    this.services = new PayServices()
  }



  submit = async (ev) => {
    ev.preventDefault()


    let { token } = await this.props.stripe.createToken({ name: this.props.name, amount: 8000 });
    let response = await fetch(process.env.REACT_APP_URL + 'charge', {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: `${token.id} ${this.props.total}`,
    });

    if (response.ok)
      console.log("Purchase Complete!")

  }




  handleChange = e => {
    console.log('-----')
    const { name, value } = e.target
    this.setState({
      productInfo: {
        ...this.state.productInfo,
        [name]: value
      }
    })
  }


  // handleSubmit = e => {
  //   e.preventDefault()
  //   const { tripeToken, productPrice, productName } = this.state.productInfo
  //   console.log('tripeToken', tripeToken)
  //   console.log('price', productPrice)
  //   console.log('productName', productName)


  //   this.services(tripeToken, productPrice, productName)
  //     .then(res => console.log(res))
  // }



  render() {

    console.log('total', this.props.total)
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (

      //   <StripeProvider apiKey="pk_test_RpU4gUbkBjJ9YrTtKhNs1nYx006uRaolap">

      //     {/* <form onSubmit={this.handleSubmit} role="form" id="product-form"> */}
      //     <form onSubmit={this.submit} id="product-form">
      //       <fieldset>
      //         <legend>Payment</legend>
      //         {/* <div> */}
      //         <label htmlFor="cardName">Name on Card</label>
      //         {/* <div> */}
      //         <input type="text" name="cardName" id="cardName" value={this.state.productInfo.cardName} onChange={this.handleChange} />
      //         {/* </div>
      //         </div>
      //         <div> */}
      //         <label htmlFor="card-number">Card Number</label>
      //         {/* <div> */}
      //         <input type="text" name="card-number" id="card-number" value={this.state.productInfo.cardNumber} onChange={this.handleChange} />
      //         {/* </div>
      //           </div>
      //           <div> */}
      //         <label htmlFor="expiry-month">Expiration Date</label>
      //         {/* <div>
      //         <div>
      //           <div> */}
      //         <select name="expiry-month" id="expiry-month" onChange={this.handleChange}>
      //           <option>Month</option>
      //           <option value="01">Jan (01)</option>
      //           <option value="02">Feb (02)</option>
      //           <option value="03">Mar (03)</option>
      //           <option value="04">Apr (04)</option>
      //           <option value="05">May (05)</option>
      //           <option value="06">June (06)</option>
      //           <option value="07">July (07)</option>
      //           <option value="08">Aug (08)</option>
      //           <option value="09">Sep (09)</option>
      //           <option value="10">Oct (10)</option>
      //           <option value="11">Nov (11)</option>
      //           <option value="12">Dec (12)</option>
      //         </select>
      //         {/* </div>
      //                 <div> */}
      //         <select name="expiry-year" id="expiry-year" onChange={this.handleChange}>
      //           <option value="16">2016</option>
      //           <option value="17">2017</option>
      //           <option value="18">2018</option>
      //           <option value="19">2019</option>
      //           <option value="20">2020</option>
      //           <option value="21">2021</option>
      //           <option value="22">2022</option>
      //           <option value="23">2023</option>
      //         </select>
      //         {/* </div>
      //               </div>
      //             </div>
      //           </div>
      //           <div>*/}
      //         <label htmlFor="cvv">Card CVV</label>
      //         {/* <div>  */}
      //         <input type="text" name="cvv" id="cvv" value={this.state.productInfo.productPrice} onChange={this.handleChange} />
      //         {/* </div>
      //             </div> */}
      //         {/* <input type="hidden" name="name" value={productInfo.productName} />
      //       <input type="hidden" name="price" value={productInfo.productPrice} /> */}
      //         <input type="hidden" name="name" value={this.state.productInfo.productName} onChange={this.handleChange} />
      //         <input type="hidden" name="price" value={this.state.productInfo.productPrice} onChange={this.handleChange} />
      //         {/* <div>
      //                   <div> */}
      //         {/* <button type="submit" id="submit-btn">Pay Now</button> */}
      //         <button type='submit' >Pay Now</button>
      //         {/* </div>
      //                 </div>  */}
      //       </fieldset>
      //     </form>


      //   </StripeProvider>

      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    )
  }
}

export default injectStripe(Payment)