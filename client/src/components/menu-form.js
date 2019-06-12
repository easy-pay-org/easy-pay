import React, { Component } from 'react'
import OwnerServices from '../service/owner-services'


class MenuForm extends Component {

    constructor(props) {
        super(props)

        this.state = {

            menu: {
                type: 'first_courses',
                name: '',
                price: '',
                image: '',
                description: '',
            },
            restaurant: {
                id: this.props.match.params.restaurant_id
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

        this.services.postMenu(this.state.menu, this.state.restaurant.id)
        //     .then(x => window.location.href = "/coasters")

    }


    //TODO: Forzar que haya que elegir un campo
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <label htmlFor="type">first_courses</label>
                    <input onChange={this.handlechange} value='first_courses' type="radio" id="type" name="type" /><br></br>

                    <label htmlFor="type">second_courses</label>
                    <input onChange={this.handlechange} value='second_courses' type="radio" id="type" name="type" /><br></br>

                    <label htmlFor="type">drinks</label>
                    <input onChange={this.handlechange} value='drinks' type="radio" id="type" name="type" /><br></br>

                    <label htmlFor="type">desserts</label>
                    <input onChange={this.handlechange} value='desserts' type="radio" id="type" name="type" /><br></br>


                    <label htmlFor="name">Nombre Plato</label>
                    <input onChange={this.handlechange} value={this.state.menu.name} type="text" id="name" name="name" /><br></br>

                    <label htmlFor="price">Precio</label>
                    <input onChange={this.handlechange} value={this.state.menu.price} type="number" id="price" name="price" /><br></br>

                    <label htmlFor="image">Imagen</label>
                    <input onChange={this.handleFileUpload} type="file" id="image" name="image" /><br></br>

                    <label htmlFor="name">Description</label>
                    <input onChange={this.handlechange} value={this.state.menu.description} type="text" id="description" name="description" /><br></br>

                    <button type="submit">Enviar</button>
                </form>
            </div>
        )
    }
}


export default MenuForm