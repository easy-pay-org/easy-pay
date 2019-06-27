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
            order: [],
            restaurant_id: '',
            table_id: 0
        }

        this.services = new OwnerServices()
    }

    // stateUpdated = true

    componentDidMount() {
        this.services.getMenu(this.props.match.params.restaurant_id)
            .then(menu => {
                this.setState({ menu })
            })
        this.services.getOrder()
            .then(theOrder => {
                this.setState({ order: theOrder })
            })
        // this.services.getCurrentRestaurant()
        //     .then(currentRestaurant => {
        //         console.log('componentDidMount, restaurante actual', currentRestaurant)
        //         this.setState({
        //             restaurant_id: currentRestaurant.restaurant_id,
        //             table_id: currentRestaurant.table_id
        //         })
        //     })
    }


    inOrder = course => {
        // console.log('................................................', this.stateUpdated)
        // console.log('this.state.order', this.state.order)

        let menuIncludes

        // if (this.stateUpdated) {
        console.log('entra')

        this.state.order.forEach(theCourse => {
            // console.log('---->', theCourse.name, course.name)

            if (theCourse.name === course.name) {
                menuIncludes = theCourse
                menuIncludes.quantity = course.quantity
                // console.log('menuIncludes--->', menuIncludes)
            }
        })

        this.stateUpdated = false
        // }

        // console.log('................................................')
        if (menuIncludes) {
            return menuIncludes
        }

    }

    

    updateOrder = (course) => {

        // this.services.getOrder()
        //     .then(theOrder => {
        //         this.setState({
        //             order: theOrder
        //             // stateUpdated: true
        //         })
        //     })

        const orderCopy = [...this.state.order]
        orderCopy.push(course)

        this.setState({
            order: orderCopy
        })

        this.stateUpdated = true
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
                    <UserTab menu={this.state.menu} inOrder={this.inOrder} updateOrder={this.updateOrder} />

                    <section className="container">

                    </section>
                </section>

                <BottomNav user={this.props.loggedInUser} />
            </div >
        )
    }
}


export default UserMenu