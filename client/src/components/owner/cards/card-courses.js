import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class CardCourses extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // restaurant: this.props.loggedInUser.restaurant,
            show: false
        }
    }

    render() {

        return (
            <div>
                <div className='cards order'>
                    <figure>
                        <img src='../../img/tables.jpg' alt='restaurant' />
                    </figure>
                    <section>
                        <div className='sum'>
                            <h2>Tiramisu <span>$10.00</span></h2>
                        </div>
                        <p>Lorem Ipsum has been the industry’s standard dummy.</p>
                        <div >
                            <Link className='btn-edit'> Editar </Link>
                            <Link className='btn-del'> Borrar </Link>
                        </div>
                    </section>

                </div>
            </div>

        )


    }

}

export default CardCourses