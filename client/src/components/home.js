import React, { Component } from 'react'
import TopNav from '../components/top-nav'
import BottomNav from '../components/bottom-nav'
import { Link } from 'react-router-dom'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CardRestaurant from '../components/card-restaurant'

class HomeOwner extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // restaurant: this.props.loggedInUser.restaurant,
            show: false
        }
    }


    render() {
        const { restaurant } = this.state
        return (
            <div>
                <TopNav />
                <section className="content-home">
                    <header className="hero">
                        <h1>Welcome to Easypay</h1>
                    </header>
                    <section className="container">

                        <h2>Your restaurant</h2>
                        <CardRestaurant/>

                        {/* <h2>{restaurant.name}</h2>
                <h2>{restaurant.address}</h2>
                <img src={restaurant.logo} alt='logos'></img> */}
                        <Fab color="primary" aria-label="Add" >
                            <AddIcon />
                            <Link to={"/owner/restaurant/new"} />
                        </Fab>
                    </section>


                </section>

                <BottomNav />
            </div>

        )

    }


}




export default HomeOwner
