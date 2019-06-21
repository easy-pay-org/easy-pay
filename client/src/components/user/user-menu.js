import React, { Component } from 'react'

// import OwnerServices from '../../service/owner-services'


import UserCard from './user-card'


class UserMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            order: [],
            redirect: false,
            show: false
        }

        // this.services = new OwnerServices()
    }


    render() {


        const { menu, coursesType } = this.props
        // console.log('coursesType', coursesType)
        // console.log('menu', menu)

        const filteredMenu = menu.filter(course => course.type === coursesType)
        // console.log('filteredMenu', filteredMenu)

        if (menu.length) {

            return (

                <div>

                    {/* <form onSubmit={this.handleSubmit} className="form" autoComplete="off"> */}
                    <section className='container'>
                        {filteredMenu.map((course, idx) => {
                            console.log('id del plato enviado---->', course._id)
                            return <UserCard key={idx} course={course} />
                        })}
                    </section>

                    {/* <Button onClick={this.handlechange} variant="contained" color="primary">Añadir</Button> */}

                    {/* </form> */}

                </div>
            )

        } else {

            return (
                <h2>No existen platos</h2>
            )
        }
    }
}


export default UserMenu