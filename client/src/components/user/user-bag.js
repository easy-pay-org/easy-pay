import React, { Component } from 'react'
import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'
import Product from '../owner/cards/card-order'
import { Button, FormControl, InputLabel, NativeSelect, Input } from '@material-ui/core'

import OwnerServices from '../../service/owner-services'


class UserBag extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // tables: "",
            order: [],
            totalAmount: 0,
            // show: false
        }

        this.services = new OwnerServices()
    }


    componentDidMount() {
        this.services.getOrder()
            .then(theOrder => {
                // console.log('La orden del usuario es', theOrder)

                this.setState({
                    order: theOrder
                })
            })
    }

    totalPrice() {
        return this.state.order.reduce((acc, course) => acc + (course.precio * course.quantity), 0)
    }

    updateOrder = (courseUpdated, idx) => {

        let orderCopy = [...this.state.order]
        orderCopy[idx] = courseUpdated
        this.setState({ order: orderCopy })

    }


    render() {
        // const { tables } = this.state
        // console.log(tables)

        const { order } = this.state
        console.log('la orden', order)

        return (


            <div>

                <div>
                    <TopNav />
                    <section className="content-home">
                        <header className="hero-bag">
                            <h1>Thank you</h1>
                        </header>
                        <section className="container">

                            <h2>Su comanda...</h2>

                            {
                                order.map((course, idx) => {
                                    // console.log('El plato que le envio a la carta', course)
                                    return <Product key={idx} index={idx} course={course} updateOrder={this.updateOrder} state={this.state} />
                                })
                            }



                        </section>
                        <section className='footer-bag'>

                            <Button variant="contained" type="submit" className='btn-order'>Pedir
                            </Button>
                            <h1>Total: ${this.totalPrice()}</h1>
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
                                        <option value={'first_courses'}>Paypal</option>
                                        <option value={'drinks'}>Tarjeta de crédito</option>
                                        <option value={'desserts'}>Efectivo</option>
                                    </NativeSelect>
                                </FormControl>
                            </form>
                            <Button variant="contained" type="submit" className='pay'>Pagar
                            </Button>
                        </section>


                    </section>

                    <BottomNav />
                </div>
            </div>







        )

    }

}

export default UserBag