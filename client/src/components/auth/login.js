import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import AuthServices from '../../service/auth-services'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = { username: '', password: '', redirect: false }
        this.services = new AuthServices()
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/owner/restaurant/new' />
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleSubmit = e => {
        e.preventDefault()

        const { username, password } = this.state

        this.services.login(username, password)
            .then(response => {
                this.setState({ username: '', password: '', redirect: true })
                this.props.setTheUser(response)
            })
            .catch(error => console.log(error.response.data.message))
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        } else {
            return (
                <div>

                    <h1>Iniciar sesión</h1>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Usuario</label>
                            <input onChange={this.handleChange} value={this.state.username} type="text" id="username" name="username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input onChange={this.handleChange} value={this.state.password} type="password" id="password" name="password" />
                        </div>
                        <button type="submit">¡Acceder</button>
                    </form>

                </div>
            )
        }
    }

}

export default Login