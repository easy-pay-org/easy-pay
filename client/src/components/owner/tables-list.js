import React, { Component } from 'react'
import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'
import TableCard from './cards/card-tables'

class Tableslist extends Component {

  constructor(props) {
    super(props)
    this.state = {
      restaurant: this.props.loggedInUser.restaurant,
      tables: this.props.loggedInUser.restaurant.tables,
      show: false
    }
  }


  render() {
    const { restaurant, tables } = this.state
    console.log("restaurante", restaurant)
    // console.log("mesa", tables[0])

    return (

      <div>
        <TopNav user={this.props} />

        <section className="content-home">
          <header className="hero-tables">
            <h1>Your Tables</h1>
          </header>
          <section className="container">

            <h2>Choose the table</h2>

            {tables.map((table, idx) => <TableCard key={idx} table_id={table.table_id} restaurant_id={restaurant._id} />)}

          </section>


        </section>

        <BottomNav user={this.props.loggedInUser} />
      </div>



    )

  }

}
export default Tableslist






// return (
//   tables.map((table, idx) => {
//     <div key={idx}>

//        <img src="https://u.tfstatic.com/restaurant_photos/707/270707/169/612/autour-de-la-table-la-salle-du-restaurant-ac1ca.jpg" alt="foto-mesa"></img> */}
//  <p>Table {table.table_id}</p> */ }
//  <p>view your table order</p> */ }
//  <Link to={`/owner/${restaurant._id}}/${table._id}`}> Go </Link> 