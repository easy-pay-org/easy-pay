import React, { Component } from 'react';
import './App.css';

import RestaurantForm from './components/restaurant-form'
import MenuForm from './components/menu-form'
import { Switch, Route } from 'react-router-dom'



class App extends Component {

  constructor(props) {
    super(props)
  }


  render() {

    return (

      <div>
        <Switch>
          {/* <Route path="/my-restaurants/new" exact component={RestaurantForm} /> */}
          <Route path="/restaurantes/new" exact component={RestaurantForm} />
          {/* <Route path="/my-restaurants/:restaurant_id/menu/new" exact component={MenuForm} /> */}
          <Route path="/" exact render={() => <MenuForm restaurant_id='5cfeb1a24d47ae3bfbef3048' />} />
          <Route path="/" exact component={MenuForm} />
        </Switch>
      </div>
    )
  }
}

export default App;
