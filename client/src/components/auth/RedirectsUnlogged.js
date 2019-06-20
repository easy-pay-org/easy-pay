import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


class Redirects extends Component {

  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      show: false
    }
  }


  render() {

    if (!this.props.user) {
      return <Redirect to={"/login"} />
    }

  }

}

export default Redirects