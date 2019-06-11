import React, { Component } from 'react'
import OwnerServices from '../service/owner-services'


class MenuForm extends Component {

    constructor(props) {
        super(props)

        this.state = {

            menu: {
                type: 'starters',
                name: '',
                price: '',
                image: '',
                description: '',
                restaurant: this.props.restaurant_id
            },
            show: false
        }

        this.services = new OwnerServices()
    }

    handlechange = e => {
        const { name, value } = e.target
        this.setState({
            menu: {
                ...this.state.menu,
                [name]: value
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        this.services.postMenu(this.state.menu, this.props.restaurant)
        //     .then(x => window.location.href = "/coasters")
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="type">starters</label>
                    <input onChange={this.handlechange} value='starters' type="radio" id="type" name="type" />

                    <label htmlFor="type">first_courses</label>
                    <input onChange={this.handlechange} value='first_courses' type="radio" id="type" name="type" />

                    <label htmlFor="type">second_courses</label>
                    <input onChange={this.handlechange} value='second_courses' type="radio" id="type" name="type" />

                    <label htmlFor="type">drinks</label>
                    <input onChange={this.handlechange} value='drinks' type="radio" id="type" name="type" />

                    <label htmlFor="type">desserts</label>
                    <input onChange={this.handlechange} value='desserts' type="radio" id="type" name="type" />


                    <label htmlFor="name">Nombre Plato</label>
                    <input onChange={this.handlechange} value={this.state.menu.name} type="text" id="name" name="name" />

                    <label htmlFor="price">Precio</label>
                    <input onChange={this.handlechange} value={this.state.menu.price} type="number" id="price" name="price" />

                    <label htmlFor="image">Imagen</label>
                    <input onChange={this.handleFileUpload} type="file" id="image" name="image" />

                    <label htmlFor="name">Description</label>
                    <input onChange={this.handlechange} value={this.state.menu.description} type="text" id="description" name="description" />

                    <button type="submit">Enviar</button>
                </form>
            </div>
        )
    }
}


export default MenuForm