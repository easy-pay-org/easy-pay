import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class CardTables extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    render() {

        return (
            <div className='cards'>
                <figure>
                    <img src='../../img/tables.jpg' alt='restaurant' />
                </figure>
                <section>
                    <h2>Table 1</h2>
                    <p>View your table order</p>
                    <div>
                        <Link>Entrar</Link>
                    </div>
                </section>

            </div>
        )


    }

}

export default CardTables


    // < h2 > Restaurante { restaurant.name }</h2 >
    //     <p>{restaurant.address}</p>
        // <img src={restaurant.logo} alt='logos'></img>
        // <Link to={`/owner/${restaurant._id}/tables`}>Go</Link>
        // <Link to={`/owner/${restaurant._id}/edit`}>Edit</Link> 