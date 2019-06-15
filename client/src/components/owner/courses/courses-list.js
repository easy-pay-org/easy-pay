import React, { Component } from 'react'
import OwnerServices from '../../../service/owner-services'
import TopNav from '../../top-nav'
import BottomNav from '../../bottom-nav'
import TabCouses from '../courses/courses-tab'



class CousesList extends Component {

    constructor(props) {
        super(props)

        this.state = {

            menu: {
                type: 'first_courses',
                name: '',
                price: '',
                image: '',
                description: '',
            },
            restaurant: {
                id: this.props.match.params.restaurant_id
            },
            redirect: false,
            show: false
        }

        this.services = new OwnerServices()


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

    uploadImg = e => {
        e.preventDefault()
        document.getElementById('image').click()
    }

    handleFileUpload = e => {

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        this.services.handleUpload(uploadData)
            .then(response => {
                this.setState({
                    menu: {
                        ...this.state.menu, image: response.secure_url
                    }
                })

            })
            .catch(err => console.log(err))
    }


    render() {

        return (

            <div>
                <TopNav />

                <section className="content">
                    <div className="col-2-header">
                        <h2>Lista de platos</h2>
                    </div>
                    <TabCouses />


                </section>
                <BottomNav />
            </div>
        )
    }
}


export default CousesList