import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@material-ui/core"
import styled from 'styled-components'
import CoursesCard from '../cards/card-courses'
const Finished = styled.div`
    padding: 6px 16px;
    font-size: 0.875rem;
    min-width: 64px;
    box-sizing: border-box;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    line-height: 1.75;
    border-radius: 4px;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    color: #fff;
    background-color: #000000;
    margin-top: 20px;
    width: 40%;
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);
    text-align:center;
    margin: 20px 0;
`;

class CoursesMenu extends Component {

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
                    <section>
                        <CoursesCard/>
                     </section>
                    <div className="btn-bottom">
                        {/* Agrega los platos al menu  */}
                        <Button variant="contained" type="submit" color="primary">Añadir
                           </Button>
                        {/* Redirige al home del restaurante  */}
                        <Finished>
                            <Link to="/owner/home">
                                Finalizar
                             </Link>
                        </Finished>
                    </div>
                </form>

            </div>
        )
    }
}


export default CoursesMenu