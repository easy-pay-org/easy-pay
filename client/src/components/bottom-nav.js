import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { Home, AccountBox, AspectRatio, ShoppingBasket } from '@material-ui/icons'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

// import OwnerServices from '../service/owner-services'





class SimpleBottomNavigation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: 'recents',
            order: [],
            redirect: false
        }

        // this.services = new OwnerServices()
    }


    handleChange = (event, newValue) => {
        this.setState({ value: newValue })

    }

    handlesubmit = e => {
        e.preventDefault()

        // this.services.getOrder()
        //     .then(order => {
        //         console.log('La orden del usuario es', order)

        //     })
        this.setState({ redirect: true })
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={"/5d07d8a8bc97aa0e25cdcbd7/1/bag"} />

        } else {
            return (
                <BottomNavigation value={this.state.value} onChange={this.handleChange}>
                    {/* Para owners */}
                    {/* <BottomNavigationAction label="Home" value="home" icon={<Home />}
                component={Link}
                to="/" />
            <BottomNavigationAction label="Detalles" value="detalles" icon={<InsertChart />} />
            <BottomNavigationAction label="Perfil" value="perfil" icon={<AccountBox />} component={Link}
                to="/" /> */}
                    {/* Para Usuario */}
                    <BottomNavigationAction label="Home" value="home" icon={<Home />}
                        component={Link}
                        to="/home" />
                    <BottomNavigationAction label="QR" value="qr" icon={<AspectRatio />}
                        component={Link}
                        to="/5d07d8a8bc97aa0e25cdcbd7/1" />

                    <BottomNavigationAction label="Cart" value="cart" icon={<ShoppingBasket />}
                        // onClick={this.handlesubmit}
                        component={Link}
                        to="/5d07d8a8bc97aa0e25cdcbd7/1/order" />



                    <BottomNavigationAction label="Perfil" value="perfil" icon={<AccountBox />} component={Link}
                        to="/" />



                </BottomNavigation>
            )
        }
    }
}


export default SimpleBottomNavigation
