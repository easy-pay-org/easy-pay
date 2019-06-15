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
    }


    handleChange = e => {

        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }


    render() {

        const { menu } = this.props.loggedInUser.restaurant
        console.log('menu -->', menu)

        return (

            <div>

                <TopNav />

                <section className="content">

                    <div className="col-2-header">
                        <h2>Lista de platos</h2>
                    </div>
                    <TabCouses menu={menu} />

                </section>

                <BottomNav />

            </div>
        )
    }
}


export default CousesList