import React, { Component } from 'react';
import BottomNav from '../bottom-nav'
import TopNav from '../top-nav'


class paymentSuccess extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }

  }


  render() {

    return (
      < div >
        <TopNav user={this.props} />
        <section className="content-home">
          <header className="hero-menu">
            <h1>Success</h1>
          </header>

          <section className="container">

          </section>
        </section>

        <BottomNav user={this.props.loggedInUser} />
      </div >
    )
  }
}




export default paymentSuccess
