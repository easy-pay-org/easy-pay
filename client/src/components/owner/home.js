
import React, { Component } from 'react'
import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'
import { Link } from 'react-router-dom'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CardRestaurant from './cards/card-restaurant'



class HomeOwner extends Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }


  render() {
    const restaurant = this.props.loggedInUser.restaurant

    return (

      <div>

        <div>
          <TopNav />
          <section className="content-home">
            <header className="hero">
              <h1>Welcome to Easypay</h1>
            </header>
            <section className="container">

              <h2>Your restaurant</h2>
              <CardRestaurant restaurant={restaurant} />
              <Fab color="primary" aria-label="Add" >
                <AddIcon />
                <Link to={"/owner/restaurant/new"} />
              </Fab>
            </section>


          </section>

          <BottomNav />
        </div>
      </div>
    )

  }

}

export default HomeOwner
