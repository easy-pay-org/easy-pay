import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField'



class CardOrder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            course: {
                name: this.props.course.name,
                price: this.props.course.price,
                description: this.props.course.description,
                image: this.props.course.image,
                quantity: this.props.course.quantity,
                _id: this.props.course._id
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
        const { course } = this.props

        return (
            <div className='cards order'>
                <figure>
                    <img src={course.image} alt='restaurant' />
                </figure>
                <section>
                    <h2>{course.name} <span>${course.price}</span></h2>
                    <p>{course.description}.</p>
                    <div className='sum'>
                        <h6>Total: {course.price}$</h6>
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