import React, { Component } from 'react'
import { socketConfig } from "../socket-config/socket"



import Product from '../owner/cards/card-order'
import { Button, FormControl, InputLabel, NativeSelect, Input } from '@material-ui/core'

export default class Table extends Component {
    constructor(props) {
        super(props);

        this.connectSocket = new socketConfig(this.socketMsg, { id: props.match.params.restaurant_id, num: props.match.params.table_id })

       
        this.state = {
            order: [],
            totalAmount: 0,
        }

        console.log(props, { id: props.match.params.restaurant_id, num: props.match.params.table_id })
    }

    componentDidMount() {
       
    }
    handleOrder = () => {

        this.services.updateOrder(this.state.order)
            .then(orderUpdated => {

                console.log(this.props)

                let orderFiltered = orderUpdated.filter(course => course.quantity !== 0)

                // let orderCopy = [...this.state.order]
                // orderCopy.splice(0, 1)
                this.setState({ order: orderFiltered })
            })
    }

    totalPrice() {
        return this.state.order.reduce((acc, course) => acc + (course.price * course.quantity), 0)
    }

    updateOrder = (courseUpdated, idx) => {

        let orderCopy = [...this.state.order]
        orderCopy[idx] = courseUpdated
        this.setState({ order: orderCopy })

    }


    // socketMsg = (msgSocket) => {
    //     console.log(msgSocket)
    //     this.setState({ msgSocket })
    // }

    socketNewMessage = (e) => {
        this.connectSocket.newMessage(this.state.order,
            { id: this.props.match.params.restaurant_id, num: this.props.match.params.table_id })
    }






    render() {
        const { order } = this.state
        console.log('la orden table', order)
        return (
            <div>
                {
                    order.map((course, idx) => {
                        // console.log('El plato que le envio a la carta', course)
                        // return <Product key={idx} index={idx} course={course} updateOrder={this.updateOrder} state={this.state} />
                        return <Product key={idx} index={idx} course={course} updateOrder={this.updateOrder} />
                    })
                }
                <section className='footer-bag'>

                    <Button onClick={this.socketNewMessage} variant="contained" className='btn-order'>Pedir</Button>
                    <h1>Total: ${this.totalPrice()}</h1>
                </section>
            </div>
        )
    }
}
