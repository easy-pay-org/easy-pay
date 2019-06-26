import React, { Component } from 'react'
import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'
import UserTab from './user-tab'

import OwnerServices from '../../service/owner-services'



class UserMenu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menu: [],
            order: []
        }

        this.services = new OwnerServices()
    }


    componentDidMount() {
        this.services.getMenu(this.props.match.params.restaurant_id)
            .then(menu => this.setState({ menu }))

        this.services.getOrder()
            .then(order => {
                this.setState({ order })
                // console.log('order---->', order)
            })
    }


    inOrder = course => {
        let menuIncludes

        this.state.order.forEach(theCourse => {
            if (theCourse.name === course.name) {
                // menuIncludes = course
                menuIncludes = theCourse
                menuIncludes.quantity = course.quantity
                console.log('menuIncludes--->', menuIncludes)
            }
        })
        if (menuIncludes)
            return menuIncludes
        // return menuIncludes
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

        // console.log('menu-------------->', this.state.menu)

        return (

            < div >
                <TopNav user={this.props} />
                <section className="content-home">
                    <header className="hero-menu">
                        <h1>Welcome to EasyPay</h1>
                    </header>

                    <UserTab menu={this.state.menu} inOrder={this.inOrder} />

                    <section className="container">

                    </section>
                </section>

                <BottomNav user={this.props.loggedInUser} />
            </div >
        )
    }
}


export default UserMenu