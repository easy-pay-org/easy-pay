import React, { Component } from 'react'
import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'
import Product from '../owner/cards/card-order'
import { Button, FormControl, InputLabel, NativeSelect, Input } from '@material-ui/core'
import OwnerServices from '../../service/owner-services'
import { socketConfig } from "../socket-config/socket"
import { Elements, StripeProvider } from 'react-stripe-elements';
import Payment from '../../components/user/payment'

import Printer from '../../service/printer-services'



class UserBag extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // tables: "",
            order: [],
            totalAmount: 0,
            redirect: false,
            redirect2: false
        }

        this.services = new OwnerServices()
        this.orderPrinter = new Printer()

        this.connectSocket = new socketConfig(this.socketMsg, { id: props.match.params.restaurant_id, num: props.match.params.table_id })

        console.log('Front Holaa', props.match.params.table_id)
        this.connectSocket.socket.on('subasta!', data => {
            console.log('en socketconfig')
            console.log(data)
            this.setState({ order: data.message })
        })
    }


    printer = () => {
        // e.preventDefault()
        const table_id = this.props.loggedInUser.currentRestaurant.table_id
        const order = this.props.loggedInUser.order[0]
        const time = this.props.loggedInUser.updatedAt
        const username = this.props.loggedInUser.username
        const product = this.state.order.map(elm => {
            return `${elm.name} x${elm.quantity} ${elm.price}.00$`

        })
        const totalPrice = this.totalPrice()

        this.orderPrinter.printer(table_id, order, time, username, product, totalPrice)
            .then(() => {
                console.log('success')
            })
    }


    componentDidMount() {
        this.services.getOrder()
            .then(theOrder => {
                // console.log('La orden del usuario es', theOrder)
                this.setState({
                    order: theOrder,
                    // redirect: false
                })
            })
    }


    totalPrice() {
        return this.state.order.reduce((acc, course) => acc + (course.price * course.quantity), 0)
    }


    updateOrder = (courseUpdated, idx) => {

        const orderCopy = [...this.state.order]

        console.log('quantity', courseUpdated.quantity)

        if (courseUpdated.quantity === 0) {
            console.log('igual a 0')

            this.services.clearOrder(courseUpdated._id)
                .then((orderUpdated) => {
                    console.log('orderUpdated', orderUpdated)

                    orderCopy.splice(idx, 1)
                    this.setState({
                        order: orderCopy
                    })
                })
        }

        else {
            console.log('diferente a 0')

            this.services.updateCourse(courseUpdated)
                .then(orderUpdated => {
                    console.log('orderUpdated', orderUpdated)

                    orderCopy[idx] = courseUpdated
                    this.setState({
                        order: orderCopy
                    })
                })
        }

    }


    handleOrder = () => {


        // const orderFiltered = orderUpdated.filter(course => course.quantity !== 0)

        // const orderFiltered = this.state.order.filter(course => course.quantity > 0)
        // console.log('orderUpdated---->', orderFiltered)



        // this.services.updateOrder(this.state.order, orderFiltered)
        //     .then(orderUpdated => {
        //         this.setState({ order: orderUpdated })
        //     })




        // console.log(orderFiltered)
        // let orderCopy = [...this.state.order]
        // orderCopy.splice(0, 1)
        // this.setState({ order: orderFiltered })
        // })
    }

    // handleOrder = () => {

    //     this.services.updateOrder(this.state.order)
    //         .then(orderUpdated => {

    //             console.log(this.props)

    //             let orderFiltered = orderUpdated.filter(course => {

    //                 return course.quantity !== 0
    //             })

    //             // let orderCopy = [...this.state.order]
    //             // orderCopy.splice(0, 1)
    //             this.setState({ order: orderFiltered })
    //         })
    // }


    socketNewMessage = (e) => {
        console.log(this.state.order)

        this.connectSocket.newMessage(this.state.order,
            { id: this.props.match.params.restaurant_id, num: this.props.match.params.table_id })

    }


    handleSubmit = e => {
        e.preventDefault()
        // -------------------------------DESCOMENTAR---------------------------
        // this.printer() 
        this.props.updateTotal(this.totalPrice())
        this.setState({ redirect: true })
    }


    render() {
        // const { tables } = this.state
        // console.log(this.props)

        const { order } = this.state
        console.log(this.props.restaurant)

        // if (this.state.redirect) {
        //     return <Redirect to={"/pay"} />
        // }

        // else {
        return (

            < div >

                <div>
                    <TopNav user={this.props} />
                    <section className="content-home">
                        <header className="hero-bag">
                            <h1>Thank you</h1>
                        </header>
                        <section className="container">

                            <h2>Su comanda...</h2>

                            {
                                order.map((course, idx) => {
                                    // console.log('El plato que le envio a la carta', course)
                                    // return <Product key={idx} index={idx} course={course} updateOrder={this.updateOrder} state={this.state} />
                                    return <Product key={idx} index={idx} course={course} updateOrder={this.updateOrder} />
                                })
                            }


                        </section>
                        <section className='footer-bag'>

                            {/* <Button onClick={this.handleOrder} variant="contained" className='btn-order'>Pedir</Button> */}
                            <h1>Total: {this.totalPrice()}.00€</h1>


                            <Button onClick={this.socketNewMessage} variant="contained" className='btn-order'>Pedir</Button>
                        </section>


                        <section className='footer'>
                            <h2>¿Has terminado?</h2>
                            <form onSubmit={this.handleSubmit} className="form2" autoComplete="off">
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
                                <Button variant="contained" type="submit" className='pay'>continuar</Button>
                            </form>
                            <div>
                                {
                                    this.state.redirect ?
                                        <StripeProvider apiKey='pk_test_RpU4gUbkBjJ9YrTtKhNs1nYx006uRaolap'>
                                            <Elements>
                                                <Payment total={this.totalPrice() * 100} name={this.props.loggedInUser.username} />
                                            </Elements>
                                        </StripeProvider>
                                        : null
                                }
                            </div>
                        </section>

                    </section>


                    <BottomNav user={this.props.loggedInUser} />
                </div>
            </div >

        )
        // }

    }

}

export default UserBag