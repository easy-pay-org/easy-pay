import React, { Component } from 'react'
import MenuCourses from './menu-courses'
import TabCouses from './courses-tab'

import { InputAdornment, FormControl, InputLabel, Button, TextField, NativeSelect, Input } from '@material-ui/core'



class CoursesList extends Component {

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

    // const { courseType } = this.state
    const { menu } = this.props.loggedInUser.restaurant
    console.log('menu -->', menu)

    return (
      <div>

        {/* <form onSubmit={this.handleSubmit} className="form" autoComplete="off">
          <FormControl>
            <InputLabel shrink htmlFor="courseType"> Categoría </InputLabel>
            <NativeSelect onChange={this.handleChange} input={<Input name="courseType" id="courseType" />} >
              <option value="" />
              <option value={'first_courses'}>Entrantes</option>
              <option value={'second_courses'}>Segundos</option>
              <option value={'drinks'}>Bebidas</option>
              <option value={'desserts'}>Postre</option>
            </NativeSelect>
          </FormControl>
        </form> */}

        {/* <TopNav /> */}
        <section className="content">
          <div className="col-2-header">
            <h2>Lista de platos</h2>
          </div>
          <TabCouses menu={menu} />


        </section>
        {/* <BottomNav /> */}





      </div>
    )
  }

}

export default CoursesList