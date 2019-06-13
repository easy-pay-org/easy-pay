import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import AuthServices from '../service/auth-services'


class navigation extends Component {

  constructor(props) {
    super(props)
    this.service = new AuthServices()
  }


  logout = () => {
    this.service.logout()
      .then(x => {
        this.props.setTheUser(null)

      })
  }

  render() {

    return (

      <div className="display">

        <Link to="/">Inicio</Link> <br></br>

        <Link to="/signup">Registrarse</Link> <br></br>
        <Link to="/login">Iniciar sesión</Link> <br></br>
        <Link onClick={this.logout} to="/">Cerrar sesión</Link> <br></br><br></br>

        <Link to="/owner/restaurant/new">Crear Restaurante</Link> <br></br><br></br>

      </div>

    )
  }
}




export default navigation