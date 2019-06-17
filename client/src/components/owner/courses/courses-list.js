import React, { Component } from 'react'
import TopNav from '../../top-nav'
import BottomNav from '../../bottom-nav'
import TabCouses from '../courses/courses-tab'
import { Link } from 'react-router-dom'

class CousesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            courseType: '',
            // tables: this.props.loggedInUser.restaurant.tables,
            show: false
        }
        console.log('setTheUser en course-list', this.props.setTheUser)
    }


    handleChange = e => {

        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }


    render() {

        const { restaurant } = this.props.loggedInUser
        // const { menu } = this.props.loggedInUser.restaurant

        return (

            <div>

                <TopNav user={this.props} />

                <section className="content">

                    <div className="col-2-header">
                        <h2>Lista de platos</h2>
                        <Link to={`/owner/${restaurant._id}/menu/new`}>
                            Add courses
                            </Link>
                    </div>
                    {/* <TabCouses menu={menu} /> */}
                    <TabCouses restaurant={restaurant} setTheUser={this.props.setTheUser} />

                </section>

                <BottomNav user={this.props.loggedInUser} />

            </div>
        )
    }
}


export default CousesList