import React, { Component } from 'react'


import OwnerServices from '../../service/owner-services'
import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'
import { Button, TextField } from '@material-ui/core'





class PerfilEdit extends Component {

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
            redirect: false,
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

                            label="Username"
                            id="username"
                            name="username"
                            placeholder="username"
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

                            label="New Password"
                            id="password"
                            name="password"
                            placeholder="new password"
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
                            placeholder="email"
                            value={this.state.email}
                            onChange={this.handlechange}
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                        />


                        <div className="btn-bottom">
                            {/* Agrega los platos al menu  */}
                            <Button variant="contained" type="submit" color="primary">Guardar
                        </Button>
                            <Button variant="contained" className='logout' color="primary">Logout
                        </Button>
                        </div>

                    </form>
                </section>
                <BottomNav user={this.props.loggedInUser} />            </div>
        )
    }
}


export default PerfilEdit