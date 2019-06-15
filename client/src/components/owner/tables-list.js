import React, { Component } from 'react'
import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'
import Tables from './cards/card-tables'

class Tableslist extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tables: "",
      show: false
    }
  }


  render() {
    const { tables } = this.state
    console.log(tables)
    return (



      <div>

        <div>
          <TopNav />
          <section className="content-home">
            <header className="hero-tables">
              <h1>Your Tables</h1>
            </header>
            <section className="container">

              <h2>Choose the table</h2>

              <Tables />


            </section>


          </section>

          <BottomNav />
        </div>
      </div>







    )

  }

}

export default Tableslist