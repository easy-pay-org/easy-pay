import React, { Component } from 'react'

import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'
import { Button, TextField, FormControl, InputLabel, NativeSelect, Input } from '@material-ui/core'



class UserEdit extends Component {

    constructor(props) {
        super(props)

        this.state = {


        }

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
            .then((menu) => {

                this.setState({
                    menu: {
                        ...this.state.menu,
                        type: 'first_courses',
                        name: '',
                        price: '',
                        image: '',
                        description: '',
                    }
                })
            })
    }

    uploadImg = e => {
        e.preventDefault()
        document.getElementById('image').click()
    }

    handleFileUpload = e => {

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        this.services.handleUpload(uploadData)
            .then(response => {
                this.setState({
                    menu: {
                        ...this.state.menu, image: response.secure_url
                    }
                })

            })
            .catch(err => console.log(err))
    }


    render() {

        return (

            <div>
                <TopNav user={this.props} />

                <section className="content">
                    <header className="col-2-header">
                        <h2>Editar Perfil</h2>
                    </header>

                    <form onSubmit={this.handleSubmit} className="form" autoComplete="off">

                        <TextField

                            label="Usuario"
                            id="username"
                            name="username"
                            placeholder="Introduzca un usuario"
                            value={this.state.username}
                            onChange={this.handlechange}
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField

                            label="Nueva contraseña"
                            id="password"
                            name="password"
                            placeholder="Introduzca nueva contraseña"
                            value={this.state.password}
                            onChange={this.handlechange}
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField

                            label="Email"
                            id="email"
                            name="email"
                            placeholder="Introduzca email de contacto"
                            value={this.state.email}
                            onChange={this.handlechange}
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                        />


                        <TextField

                            id="phone"
                            name="phone"
                            label="Teléfono"
                            placeholder="Introduzca un número de contacto"
                            value={this.state.phone}
                            onChange={this.handlechange}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                        />
                        <FormControl>
                            <InputLabel shrink htmlFor="type">
                                Forma de pago
                                </InputLabel>
                            <NativeSelect
                                onChange={this.handleChange}
                                input={<Input name="type" id="type" />}
                            >
                                <option value="" />
                                <option value={'visa'}>Tarjeta de crédito</option>
                                <option value={'efectivo'}>Efectivo</option>
                            </NativeSelect>
                        </FormControl>


                        <div className="btn-bottom">
                            {/* Agrega los platos al menu  */}
                            <Button variant="contained" type="submit" color="primary">Guardar
                        </Button>
                            <Button variant="contained" className='logout' color="primary">Logout
                        </Button>
                        </div>

                    </form>
                </section>
                <BottomNav user={this.props.loggedInUser} />
            </div>
        )
    }
}


export default UserEdit
