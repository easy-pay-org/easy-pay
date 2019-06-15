import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'

class CardCourses extends Component {

    constructor(props) {
        super(props)
        this.state = {
            restaurant: {
                name: '',
                address: '',
                phone: '',
                description: '',
                logo: '',
                tables_quantity: '',
                id: ''
            },
            redirect: false,
            show: false
        }
    }
    handlechange = e => {
        const { name, value } = e.target
        this.setState({
            restaurant: {
                ...this.state.restaurant,
                [name]: value
            }
        })
    }
    handleSubmit = e => {
        e.preventDefault()

        this.services.postRestaurant(this.state.restaurant, this.props.userInSession)
            .then((restaurant) => {

                this.setState({
                    restaurant: {
                        ...this.state.restaurant,
                        id: restaurant._id
                    },
                    redirect: true
                })
            })
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
                        <form onSubmit={this.handleSubmit} className="form" autoComplete="off">
                            <TextField
                                id="standard-number"
                                label="Cantidad"
                                value={this.state.restaurant.phone}
                                onChange={this.handlechange}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </form>
                        <Button variant="contained" type="submit" color="primary">Añadir
                        </Button>
                    </div>
                </section>

            </div>


        )


    }

}

export default CardCourses