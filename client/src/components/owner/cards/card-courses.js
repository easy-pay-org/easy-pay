import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import OwnerServices from '../../../service/owner-services'
import Button from '@material-ui/core/Button'


class CardCourses extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // restaurant: this.props.loggedInUser.restaurant,
            redirect: false,
            show: false
        }

        this.services = new OwnerServices()

        console.log('setTheUser en card-courses', this.props.setTheUser)
    }

    handleChange = e => {
        e.preventDefault()

        const editButton = document.getElementById('editar')
        const clearButton = document.getElementById('borrar')

        // console.log(document.getElementById('editar').id)

        if (editButton.id === e.currentTarget.id) {
            this.setState({ redirect: true })

        } else if (clearButton.id === e.currentTarget.id) {
            this.services.deleteMenu(this.props.course)
                .then(user => {
                    console.log('el menu actualizado del usuario', user.restaurant.menu)
                    this.props.setTheUser(user)
                })
        }
    }

    render() {

        const { course, restaurant } = this.props

        if (this.state.redirect) {
            return <Redirect to={`/owner/${restaurant._id}/menu/${course._id}/edit`} />

        } else {
            return (
                <div>
                    <div className='cards order'>
                        <figure>
                            <img src={course.image} alt='restaurant' />
                        </figure>
                        <section>
                            <div className='sum'>
                                <h2>{course.name} <span>€{course.price}</span></h2>
                            </div>
                            <p>{course.description}.</p>
                            <div className='bottom'>
                                {/* <Link to={`/owner/${restaurant._id}/menu/edit`} className='btn-edit'> Editar </Link> */}
                                <Button id="editar" onClick={this.handleChange} name='editar' className='btn-edit'>Editar</Button>
                                <Button id="borrar" onClick={this.handleChange} name='borrar' className='btn-del'>Borrar</Button>
                            </div>
                        </section>

                    </div>
                </div>

            )

        }

    }

}

export default CardCourses