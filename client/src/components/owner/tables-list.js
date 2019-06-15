import React, { Component } from 'react'
import { Link } from 'react-router-dom'



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
    console.log("mesa", tables[0])

    return (

      <div>

        {
          tables.map((table, idx) => {
            return (
              <div key={idx}>

                <img src="https://u.tfstatic.com/restaurant_photos/707/270707/169/612/autour-de-la-table-la-salle-du-restaurant-ac1ca.jpg" alt="foto-mesa"></img>
                <p>Table {table.table_id}</p>
                <p>view your table order</p>
                <Link to={`/owner/${restaurant._id}}/${table._id}`}> Go </Link>

              </div>
            )
          })
        }

      </div>
    )

  }

}

export default Tableslist