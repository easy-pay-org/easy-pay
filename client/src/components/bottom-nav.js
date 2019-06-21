import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { Home, AccountBox, AspectRatio, ShoppingBasket, InsertChart } from '@material-ui/icons'
import { Link, Redirect } from 'react-router-dom';

// import OwnerServices from '../service/owner-services'

class SimpleBottomNavigation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: 'recents',
            table_id: '',
            restaurant_id: '',
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

    handleTable = (restaurant_id, table_id) => {
        console.log(restaurant_id, table_id)

        this.setState(
            { table_id },
            { restaurant_id }
        )
    }

    render() {


        if (this.state.redirect) {
            return <Redirect to={"/5d07d8a8bc97aa0e25cdcbd7/1/bag"} />
        }

        else {
            if (this.props.user.role === 'owner')

                return (

                    <BottomNavigation value={this.state.value} onChange={this.handleChange}>
                        <BottomNavigationAction label="Home" value="home" icon={<Home />}
                            component={Link}
                            to="/home" />
                        <BottomNavigationAction label="Detalles" value="detalles" icon={<InsertChart />} />
                        <BottomNavigationAction label="Perfil" value="perfil" icon={<AccountBox />} component={Link}
                            to={`/owner/${this.props.user._id}/perfil_edit`} />
                    </BottomNavigation>

                )
            else
                return (
                    <BottomNavigation value={this.state.value} onChange={this.handleChange}>

                        <BottomNavigationAction label="Home" value="home" icon={<Home />}
                            component={Link}
                            to="/home" />
                        <BottomNavigationAction label="QR" value="qr" icon={<AspectRatio />}
                            // setTable={this.handleTable}
                            component={Link}
                            // to="localhost:5000/5d07d8a8bc97aa0e25cdcbd7/1" />
                            // to="/5d08d317b7405800178ce0d3/1" />
                            to="/qr" />

                        <BottomNavigationAction label="Cart" value="cart" icon={<ShoppingBasket />}
                            // onClick={this.handlesubmit}
                            component={Link}
                            // to={`/${this.state.restaurant_id}}/${this.state.table_id}/order`} />
                            to={"/5d08d317b7405800178ce0d3/1/order"} />


                        <BottomNavigationAction label="Perfil" value="perfil" icon={<AccountBox />} component={Link}
                            to={`/${this.props.user._id}/user_edit`} />

                    </BottomNavigation>
                )
        }

    }

}







export default SimpleBottomNavigation
