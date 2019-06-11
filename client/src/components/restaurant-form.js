import React, { Component } from 'react'
import OwnerServices from '../service/owner-services'


class RestaurantForm extends Component {

    constructor() {
        super()

        this.state = {

            restaurant: {
                name: '',
                adress: '',
                phone: '',
                description: '',
                logo: '',
                tables_quantity: ''
            },
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

        this.services.postRestaurant(this.state.restaurant)
            .then(restaurant => {
                window.location.href = `/${restaurant._id}/menu/new`
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input onChange={this.handlechange} value={this.state.restaurant.name} type="text" id="name" name="name" />

                    <label htmlFor="name">Adress</label>
                    <input onChange={this.handlechange} value={this.state.restaurant.adress} type="text" id="adress" name="adress" />

                    <label htmlFor="phone">Phone</label>
                    <input onChange={this.handlechange} value={this.state.restaurant.phone} type="number" id="phone" name="phone" />

                    <label htmlFor="logo">logo</label>
                    <input onChange={this.handleFileUpload} type="file" id="logo" name="logo" />

                    <label htmlFor="tables_quantity">Table quantity</label>
                    <input onChange={this.handlechange} value={this.state.restaurant.tables_quantity} type="number" id="tables_quantity" name="tables_quantity" />

                    <label htmlFor="name">Description</label>
                    <input onChange={this.handlechange} value={this.state.restaurant.description} type="text" id="description" name="description" />

                    <button type="submit">Enviar</button>
                </form>
            </div>
        )
    }
}


export default RestaurantForm