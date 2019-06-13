import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'


import './App.css';

import Home from './components/owner/home'
import RestaurantForm from './components/owner/restaurant-form'
import MenuForm from './components/owner/menu-form'
import Navigation from './components/navigation'
import AuthServices from './service/auth-services'
import Signup from './components/auth/signup'
import Login from './components/auth/login'
<<<<<<< HEAD
import ProtectedRoute from './components/auth/protected-route'
import RestaurantEdit from './components/owner/restaurant-edit'
import TablesList from './components/owner/tables-list'

=======
import HomeOwner from './components/home'
>>>>>>> 02382eb558d03848b5e3b9fa23131e79cd9b6a82





// Si no usamos un this.states, deberiamos ser funcional en vez de clase. Noah


class App extends Component {

  constructor(props) {
    super(props)
    this.state = { loggedInUser: null }
    this.services = new AuthServices()
    this.fetchUser()
  }

  setUser = userObj => this.setState({ loggedInUser: userObj })

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.services.loggedin()
        .then(response => {
          this.setState({ loggedInUser: response }, () => {

          })
        })
        .catch(x => this.setState({ loggedInUser: false }))
    }
  }


  render() {
    // console.log(this.state.loggedInUser)
    return (

      <div>

        {/* {this.state.loggedInUser && <p>Pepe</p>} */}
        <Navigation userInSession={this.state.loggedInUser} setTheUser={this.setUser} />

        <Switch>

          <ProtectedRoute user={this.state.loggedInUser} path="/owner/home" exact component={Home} />

          <Route path="/owner/restaurant/new" exact render={() => <RestaurantForm userInSession={this.state.loggedInUser} />} />
          <Route path="/owner/restaurant/edit" exact render={() => <RestaurantForm userInSession={this.state.loggedInUser} />} />
          <Route path="/owner/:restaurant_id/menu/new" exact component={MenuForm} />

          <ProtectedRoute user={this.state.loggedInUser} path="/owner/:restaurant_id/tables" exact component={TablesList} />
          <ProtectedRoute user={this.state.loggedInUser} path="/owner/:restaurant_id/edit" component={RestaurantEdit} />

          <Route path="/signup" exact render={() => <Signup setTheUser={this.setUser} />} />
          <Route path="/login" exact render={() => <Login setTheUser={this.setUser} />} />

        </Switch>

      </div>
    )
  }
}

export default App;
