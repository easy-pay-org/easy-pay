import React, { Component } from 'react'
import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'
import UserTab from './user-tab'

import OwnerServices from '../../service/owner-services'



class UserMenu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menu: []
        }

        this.services = new OwnerServices()
    }



    componentDidMount() {
        this.services.getMenu(this.props.match.params.restaurant_id)
            .then(menu => this.setState({ menu }))
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


    render() {

        return (


            <div>
                <TopNav user={this.props} />
                <section className="content-home">
                    <header className="hero-menu">
                        <h1>Welcome to {this.state.menu.name}</h1>
                    </header>

                    <UserTab menu={this.state.menu} />

                    <section className="container">

                    </section>
                </section>

                <BottomNav user={this.props.loggedInUser} />
            </div >
        )
    }
}


export default UserMenu