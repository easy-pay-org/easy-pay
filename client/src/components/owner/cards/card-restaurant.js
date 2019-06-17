import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class CardRestaurant extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // restaurant: this.props.loggedInUser.restaurant,
            show: false
        }
    }

    render() {

        const { restaurant } = this.props
        console.log(this.props)
        console.log(restaurant.tables[0])

        return (
            <div className='cards'>
                <figure>
                    <img src={restaurant.logo} alt='restaurant' />
                </figure>
                <section>
                    <h2>{restaurant.name}</h2>
                    <p>{restaurant.address}</p>
                    <div>
                        <Link to={`/owner/${restaurant._id}/tables`}>Entrar</Link>
                        <Link to={`/owner/${restaurant._id}/edit`}>Editar</Link>
                    </div>
                </section>

            </div>
        )


    }

}

export default CardRestaurant


// < h2 > Restaurante { restaurant.name }</h2 >
//     <p>{restaurant.address}</p>
// <img src={restaurant.logo} alt='logos'></img>
// <Link to={`/owner/${restaurant._id}/tables`}>Go</Link>
// <Link to={`/owner/${restaurant._id}/edit`}>Edit</Link> 

