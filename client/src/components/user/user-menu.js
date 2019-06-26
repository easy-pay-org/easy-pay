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
        const filteredMenu = menu.filter(course => course.type === coursesType)

        if (menu.length) {

            return (

                <div>

                    {/* <form onSubmit={this.handleSubmit} className="form" autoComplete="off"> */}
                    <section className='container'>
                        {filteredMenu.map((course, idx) => {
                            // console.log('id del plato enviado---->', course._id)
                            return <UserCard key={idx} course={course} inOrder={this.props.inOrder} />
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