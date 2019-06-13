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

        return (
            <div className='cards'>
                <figure>
                    <img src='../../img/homeOwner.jpg' alt='restaurant' />
                </figure>
                <section>
                    <h2>Restaurante Pepe</h2>
                    <p>Calle Los Angeles 19, Madrid</p>
                    <div>
                        <Link>Entrar</Link>
                        <Link>Editar</Link>
                    </div>
                </section>

            </div>
        )


    }

}

export default CardRestaurant