import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class CardCourses extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // restaurant: this.props.loggedInUser.restaurant,
      show: false
    }
  }

  render() {

    const { course } = this.props
    // console.log(course)


    return (
      <div>

        <div className='cards order'>
          <figure>
            <img src={course.image} alt='course_image' />
          </figure>
          <section>
            <div className='sum'>
              <h2>{course.name} <span>${course.price}</span></h2>
            </div>
            <p>{course.description}.</p>
            <div >
              <Link className='btn-edit'> Editar </Link>
              <Link className='btn-del'> Borrar </Link>
            </div>
          </section>
        </div>

      </div>

    )


  }

}

export default CardCourses