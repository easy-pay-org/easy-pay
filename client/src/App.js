import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';

import RestaurantForm from './components/restaurant-form'
import MenuForm from './components/menu-form'
import Navigation from './components/navigation'
import AuthServices from './service/auth-services'
import Signup from './components/auth/signup'
import Login from './components/auth/login'





// Si no usamos un this.states, deberiamos ser funcional en vez de clase. Noah


class App extends Component {

  constructor(props) {
    super(props)
    this.state = { loggedInUser: null }
    this.services = new AuthServices()
  }

  setUser = userObj => this.setState({ loggedInUser: userObj })

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.services.loggedin()
        .then(response => {
          this.setState({ loggedInUser: response })
        })
        .catch(x => this.setState({ loggedInUser: false }))
    }
  }


  render() {

    this.fetchUser()

    return (

      <div>

        <Navigation userInSession={this.state.loggedInUser} setTheUser={this.setUser} />

        <Switch>
          {/* <Route path="/owner/restaurant/new" exact component={RestaurantForm} /> */}
          <Route path="/owner/restaurant/new" exact render={() => <RestaurantForm userInSession={this.state.loggedInUser} />} />
          <Route path="/owner/:restaurant_id/menu/new" exact component={MenuForm} />

          <Route path="/signup" render={() => <Signup setTheUser={this.setUser} />} />
          <Route path="/login" render={() => <Login setTheUser={this.setUser} />} />
        </Switch>

      </div>
    )
  }
}

export default App;
