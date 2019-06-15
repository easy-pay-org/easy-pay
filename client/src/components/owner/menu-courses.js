import React, { Component } from 'react'
import CardCourses from './card-courses'



class CoursesList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // tables: this.props.loggedInUser.restaurant.tables,
      menu: this.props.menu,
      coursesType: this.props.coursesType,
      show: false
    }
  }


  render() {
    console.log(this.props)
    const { menu, coursesType } = this.state
    console.log('menu antes de filtrar --->', menu)
    console.log('tipo de plato --->', coursesType)

    const filteredMenu = menu.filter(course => course.type === coursesType)

    console.log('menu filtrado --->', filteredMenu)

    if (filteredMenu.length) {
      return (
        <div>
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