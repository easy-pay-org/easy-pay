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
                quantity: this.props.course.quantity,
                image: this.props.course.image,
                _id: this.props.course._id,

            },
            show: false
        }
    }

    lessItem = () => {

        if (this.props.course.quantity <= 0) {

            let value = this.props.course.quantity
            const theCourse = this.props.course

            this.setState({
                course: {
                    ...this.state.course,
                    quantity: value
                }
            }, () => {
                this.props.updateOrder(theCourse, this.props.index)
            })

        } else {
            let value = this.props.course.quantity--
            const theCourse = this.props.course

            this.setState({
                course: {
                    ...this.state.course,
                    quantity: value
                }
            }, () => {
                this.props.updateOrder(theCourse, this.props.index)
            })

        }


    }

    addItem = () => {

        let value = this.props.course.quantity++
        const theCourse = this.props.course
        this.setState({
            course: {
                ...this.state.course,
                quantity: value
            }
        }, () => {
            this.props.updateOrder(theCourse, this.props.index)
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
                    <h2>{course.name} / {course.price}.<span>00</span>€</h2>
                    <p>{course.description}.</p>

                    <div className='sum'>
                        {/* <form onSubmit={this.handleSubmit} className="form" autoComplete="off"> */}
                        <div className='amount'>
                            <button onClick={this.lessItem}>-</button>
                            <TextField
                                id="standard-number"
                                value={this.props.course.quantity}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <button onClick={this.addItem}>+</button>
                        </div>
                        <h6>subtotal: {course.price}€</h6>

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