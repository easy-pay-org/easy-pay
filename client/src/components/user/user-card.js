import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'

import OwnerServices from '../../service/owner-services'


class CardCourses extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menu: {
                name: this.props.course.name,
                price: this.props.course.price,
                description: this.props.course.description,
                image: this.props.course.image,
                quantity: 0,
            },
            redirect: false,
            show: false
        }

        this.services = new OwnerServices()
    }


    handlechange = e => {
        const { value } = e.target

        this.setState({
            menu: {
                ...this.state.menu,
                quantity: value
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        const { menu } = this.state

        if (!this.props.inOrder(menu)) {

            if (menu.quantity != '') {

                this.services.postOrder(menu)
                    .then((order) => {
                        console.log('----------------->', order)
                        this.props.updateOrder(order)
                    })
            }
        }

        else {
            if (menu.quantity != '')
                this.services.updateCourse(this.props.inOrder(menu))
        }

        this.setState({ flag: false })

    }


    lessItem = () => {

        if (this.state.menu.quantity <= 0) {

            let value = this.state.menu.quantity

            this.setState({
                course: {
                    ...this.state.course,
                    quantity: value
                }
            })

        } else {
            let value = this.state.menu.quantity--

            this.setState({
                course: {
                    ...this.state.course,
                    quantity: value
                }
            })

        }
    }


    addItem = () => {

        let value = this.state.menu.quantity++

        this.setState({
            course: {
                ...this.state.course,
                quantity: value
            }
        })

    }


    render() {

        // console.log('props del plato recibido', this.props)

        const { course } = this.props

        return (
            <div className='cards order'>
                <figure>
                    <img src={course.image} alt="plato" />
                </figure>
                <section>

                    <h2>{course.name} <span>{course.price}€</span></h2>

                    <p>{course.description}</p>


                    <div className='sum'>
                        <button className="btn-add" onClick={this.lessItem}>-</button>
                        <form onSubmit={this.handleSubmit} className="form" autoComplete="off">
                            <TextField
                                id="quantity"
                                name="quantity"
                                value={this.state.menu.quantity}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />

                        </form>
                        <button className="btn-add" onClick={this.addItem}>+</button>
                        <Button variant="contained" type="submit" color="primary" onClick={this.handleSubmit}>Añadir</Button>
                    </div>

                </section>

            </div>


        )


    }

}

export default CardCourses