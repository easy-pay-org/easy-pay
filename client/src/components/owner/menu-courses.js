import React, { Component } from 'react'
import CardCourses from './card-courses'



class CoursesList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // tables: this.props.loggedInUser.restaurant.tables,
      show: false
    }
  }


  render() {

    const { menu, coursesType } = this.props

    const filteredMenu = menu.filter(course => course.type === coursesType)

    if (filteredMenu.length) {
      return (
        <div>

          <h1>Menu no esta vacio</h1>
          {filteredMenu.map((course, idx) => <CardCourses key={idx} course={course} />)}

        </div>
      )

    }

    else {
      return (
        <h2>No existen platos</h2>
      )
    }

  }
}

export default CoursesList