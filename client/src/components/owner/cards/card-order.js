import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField'



class CardOrder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            course: {
                nombre: this.props.course.nombre,
                precio: this.props.course.precio,
                description: this.props.course.description,
                quantity: this.props.course.quantity,
            },
            show: false
        }
    }

    handlechange = e => {
        const { name, value } = e.target

        const theCourse = this.state.course
        theCourse.quantity = value

        console.log('El plato modificado', theCourse)
        console.log('index', this.props.index)

        this.props.updateOrder(theCourse, this.props.index)

        this.setState({
            course: {
                ...this.state.course,
                quantity: value
            }
        })

    }



    render() {
        const { course } = this.state
        // console.log('el plato de esta carta es', course)

        return (
            <div className='cards order'>
                <figure>
                    <img src='../../img/tables.jpg' alt='restaurant' />
                </figure>
                <section>
                    <h2>{course.nombre} <span>${course.precio}</span></h2>
                    <p>{course.description}.</p>
                    <div className='sum'>
                        <h6>Total: {course.precio}$</h6>
                        {/* <form onSubmit={this.handleSubmit} className="form" autoComplete="off"> */}
                        <TextField
                            id="standard-number"
                            label="Quantity"
                            value={this.state.course.quantity}
                            onChange={this.handlechange}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                    </div>

                </section>

            </div>
        )


    }

}

export default CardOrder


    // < h2 > Restaurante {restaurant.name}</h2 >
    //     <p>{restaurant.address}</p>
        // <img src={restaurant.logo} alt='logos'></img>
        // <Link to={`/owner/${restaurant._id}/tables`}>Go</Link>
        // <Link to={`/owner/${restaurant._id}/edit`}>Edit</Link> 