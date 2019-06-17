import React, { Component } from 'react'

import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'
import Product from './cards/card-order'
import Button from '@material-ui/core/Button'




class OrderTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tables: this.props.loggedInUser.restaurant.tables,
      show: false
    }
  }


  render() {
    const { tables } = this.state
    console.log('ffffff', tables)
    return (



      <div>

        <div>
          <TopNav user={this.props} />
          <section className="content-home">
            <header className="hero-order">
              <h1>Order in tables 1</h1>
            </header>
            <section className="container">

              <h2>Order Details</h2>

              <Product />


            </section>
            <section className='footer'>
              <h1>Total: $30.00</h1>
              <Button variant="contained" type="submit" color="primary">Guardar
                        </Button>
            </section>


          </section>

          <BottomNav user={this.props.loggedInUser} />
        </div>
      </div>

    )
  }
}

export default OrderTable