import React, { Component } from 'react'



class OrderTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tables: this.props.loggedInUser.restaurant.tables,
      show: false
    }
  }


  render() {
    return (
      <div>
        <h1>Order Table</h1>
      </div>
    )
  }

}

export default OrderTable