import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import OwnerServices from '../service/owner-services'


class RestaurantForm extends Component {

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
        this.services = new OwnerServices()
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
                console.log(restaurant._id)
                this.setState({
                    restaurant: {
                        ...this.state.coaster,
                        id: restaurant._id
                    },
                    redirect: true
                })
            })
    }



    render() {

        if (this.state.redirect) {
            return <Redirect to={`/owner/${this.state.restaurant.id}/menu/new`} />
        } else {
            return (
                <div>

                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input onChange={this.handlechange} value={this.state.restaurant.name} type="text" id="name" name="name" /><br></br>

                        <label htmlFor="name">Adress</label>
                        <input onChange={this.handlechange} value={this.state.restaurant.adress} type="text" id="adress" name="adress" /><br></br>

                        <label htmlFor="phone">Phone</label>
                        <input onChange={this.handlechange} value={this.state.restaurant.phone} type="number" id="phone" name="phone" /><br></br>

                        <label htmlFor="logo">logo</label>
                        <input onChange={this.handleFileUpload} type="file" id="logo" name="logo" /><br></br>

                        <label htmlFor="tables_quantity">Table quantity</label>
                        <input onChange={this.handlechange} value={this.state.restaurant.tables_quantity} type="number" id="tables_quantity" name="tables_quantity" /><br></br>

                        <label htmlFor="name">Description</label>
                        <input onChange={this.handlechange} value={this.state.restaurant.description} type="text" id="description" name="description" /><br></br>

                        <button type="submit">Enviar</button>
                    </form>

                </div>

            )
        }
    }
}


export default RestaurantForm