import React, { Component } from 'react'

import UserCard from './user-card'


class UserMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {


        }

    }


    handlechange = e => {
        const { name, value } = e.target
        this.setState({
            menu: {
                ...this.state.menu,
                [name]: value
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        this.services.postMenu(this.state.menu, this.state.restaurant.id)
            .then((menu) => {

                this.setState({
                    menu: {
                        ...this.state.menu,
                        type: 'first_courses',
                        name: '',
                        price: '',
                        image: '',
                        description: '',
                    }
                })
            })
    }





    render() {

        return (

            <div>

                <form onSubmit={this.handleSubmit} className="form" autoComplete="off">
                    <section className='container'>
                        <UserCard />
                    </section>

                </form>

            </div>
        )
    }
}


export default UserMenu