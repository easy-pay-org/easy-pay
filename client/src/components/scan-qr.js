import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import { Redirect } from 'react-router-dom'
import TopNav from '../components/bottom-nav'
import BottomNav from '../components/bottom-nav'

import OwnerServices from '../service/owner-services'



class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
      restaurant: {
        restaurant_id: '',
        table_id: 0
      },
      redirect: false
    }
    this.services = new OwnerServices()
    this.handleScan = this.handleScan.bind(this)
  }

  handleScan(data) {

    if (data) {
      data = data.slice(7)
      // console.log(data)

      const restaurant_id = data.substring(0, data.indexOf('/'))
      const table_id = data.substring(data.indexOf('/') + 1)

      // this.props.setRestaurant(restaurant_id, table_id)
      console.log('en scan')

      this.services.setRestaurant(restaurant_id, table_id)
        .then(currentRestaurant => {
          console.log('Restaurante actual', currentRestaurant)

          this.setState({
            restaurant: {
              ...this.state.restaurant,
              restaurant_id,
              table_id
            }
          })
        })


      this.setState({
        result: restaurant_id + '/' + table_id,
        redirect: true
      })
    }

  }

  handleError(err) {
    console.error(err)
  }
  render() {

    // console.log('--------------->')
    // console.log('current restaurant', this.state.restaurant)

    const previewStyle = {
      height: 240,
      width: 320,
    }

    if (this.state.redirect) {
      return <Redirect to={`/${this.state.result}`} />

    } else {
      return (
        <div>
          <TopNav user={this.props} />
          <QrReader
            delay={this.state.delay}
            style={previewStyle}
            onError={this.handleError}
            onScan={this.handleScan}
          />
          <p>{this.state.result}</p>
          <BottomNav user={this.props.loggedInUser} />
        </div>
      )
    }
  }
}

export default Test