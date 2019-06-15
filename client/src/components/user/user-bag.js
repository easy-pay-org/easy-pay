import React, { Component } from 'react'
import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'
import Product from '../owner/cards/card-order'
import { Button, FormControl, InputLabel, NativeSelect, Input } from '@material-ui/core'
class UserBag extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tables: "",
            show: false
        }
    }


    render() {
        const { tables } = this.state
        console.log(tables)
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
                            <Product />



                        </section>
                        <section className='footer-bag'>

                            <Button variant="contained" type="submit" className='btn-order'>Pedir
                            </Button>
                            <h1>Total: $30.00</h1>
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