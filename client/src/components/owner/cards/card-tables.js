import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class CardTables extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { table_id, restaurant_id } = this.props

        return (
            <div className='cards'>
                <figure>
                    <img src='../../img/tables.jpg' alt='restaurant' />
                </figure>
                <section>
                    <h2>Table {table_id}</h2>
                    <p>View your table order</p>
                    <div>
                        {/* <Link to={`/owner/${restaurant_id}}/${table_id}`}> Go </Link> */}
                        <Link to={`/${restaurant_id}/${table_id}/order`}> Go </Link>
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