import React, { Component } from 'react'
import OwnerServices from '../service/owner-services'
import TopNav from '../components/top-nav'
import BottomNav from '../components/bottom-nav'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';





class RestaurantForm extends Component {

    constructor() {
        super()

        this.state = {

            restaurant: {
                name: '',
                address: '',
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
        // .then(x => window.location.href = "/")
    }

    uploadImg = e => {
        e.preventDefault()
        document.getElementById('logo').click()

    }

    render() {

        return (
            <div>
                <TopNav />
                <section className="content">
                    <h2>Crear restaurante</h2>
                    <form onSubmit={this.handleSubmit} className="form" autoComplete="off">
                        <TextField
                            required
                            id="name"
                            name="name"
                            placeholder="Introduzca el nombre de su restaurante"
                            label="Nombre"
                            value={this.state.restaurant.name}
                            onChange={this.handlechange}
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"

                        />

                        <TextField
                            required
                            id="address"
                            name="address"
                            label="Dirección"
                            placeholder="Introduzca la dirección del restaurante"
                            value={this.state.restaurant.address}
                            onChange={this.handlechange}
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            required
                            id="phone"
                            name="phone"
                            label="Teléfono"
                            placeholder="Introduzca un número de contacto"
                            value={this.state.restaurant.phone}
                            onChange={this.handlechange}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                        />

                        <label htmlFor="logo" className="upload">
                            <input onChange={this.handleFileUpload} type="file" id="logo" name="logo" />
                        </label>
                        <div className="width">
                            <Button variant="contained" color="default" onClick={this.uploadImg} >Subir logo<CloudUploadIcon />
                            </Button>
                        </div>


                        <TextField
                            required
                            id="tables_quantity"
                            name="tables_quantity"
                            label="Número de mesas"
                            placeholder="Introduzca número de mesas"
                            value={this.state.restaurant.tables_quantity}
                            onChange={this.handlechange}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            required
                            id="description"
                            name="description"
                            label="Descripción"
                            placeholder="Introduzca una descripción"
                            multiline
                            rows="2"
                            value={this.state.restaurant.description}
                            onChange={this.handlechange}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Button variant="contained" type="submit" color="primary">Siguiente
                        </Button>

                    </form>
                </section>
                <BottomNav />
            </div>
        )
    }
}


export default RestaurantForm