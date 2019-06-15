import React, { Component } from 'react'
import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'
import UserTab from './user-tab'



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

                <div>
                    <TopNav />
                    <section className="content-home">
                        <header className="hero-menu">
                            <h1>Welcome to Keth Caffe</h1>
                        </header>
                        <UserTab />
                        <section className="container">

                          

                        </section>


                    </section>

                    <BottomNav />
                </div>
            </div>
        )
    }
}


export default UserMenu