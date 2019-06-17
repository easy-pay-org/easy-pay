import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'



class CardOrder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    render() {

        return (
            <div className='cards order'>
                <figure>
                    <img src='../../img/tables.jpg' alt='restaurant' />
                </figure>
                <section>
                    <h2>Tiramisu <span>$10.00</span></h2>
                    <p>Lorem Ipsum has been the industry’s standard dummy.</p>
                    <div className='sum'>
                        <h6>Total: 10.00$</h6>

                        <TextField
                            id="standard-number"
                            label="Quantity"
                            value
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />

                    </div>

                </section>

            </div>
        )


    }

}

export default CardOrder


    // < h2 > Restaurante {restaurant.name}</h2 >
    //     <p>{restaurant.address}</p>
        // <img src={restaurant.logo} alt='logos'></img>
        // <Link to={`/owner/${restaurant._id}/tables`}>Go</Link>
        // <Link to={`/owner/${restaurant._id}/edit`}>Edit</Link> 