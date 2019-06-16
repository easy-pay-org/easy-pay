import React, { Component } from 'react'
import OwnerServices from '../../../service/owner-services'
import TopNav from '../../top-nav'
import BottomNav from '../../bottom-nav'
import TabCouses from '../courses/courses-tab'



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

                <TopNav />

                <section className="content">

                    <div className="col-2-header">
                        <h2>Lista de platos</h2>
                    </div>
                    {/* <TabCouses menu={menu} /> */}
                    <TabCouses restaurant={restaurant} setTheUser={this.props.setTheUser} />

                </section>

                <BottomNav />

            </div>
        )
    }
}


export default CousesList