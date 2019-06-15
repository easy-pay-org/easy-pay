import React, { Component } from 'react'
import { Link } from 'react-router-dom'



class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      restaurant: this.props.loggedInUser.restaurant,
      show: false
    }
  }


  render() {
    console.log(this.props.loggedInUser)
    const { restaurant } = this.state

    return (

      <div>

        <h2>{restaurant.name}</h2>
        <h2>{restaurant.address}</h2>
        <img src={restaurant.logo} alt='logos'></img>
        <Link to={`/owner/${restaurant._id}/tables`}>Go</Link><br></br>
        <Link to={`/owner/${restaurant._id}/edit`}>Edit</Link><br></br>

        <Link to={"/owner/restaurant/new"}>Crear Restaurante</Link>

      </div>
    )

  }

}

export default Home