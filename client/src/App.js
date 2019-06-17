import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'


import './App.css';

import HomeOwner from './components/owner/home'
import RestaurantForm from './components/owner/restaurant-form'
import MenuForm from './components/owner/menus/menu-form'
import Navigation from './components/navigation'
import AuthServices from './service/auth-services'
import Signup from './components/auth/signup'
import Login from './components/auth/login'
import ProtectedRoute from './components/auth/protected-route'
import ProtectedRouteClient from './components/auth/protected-route-client'
import RestaurantEdit from './components/owner/restaurant-edit'
import TablesList from './components/owner/tables-list'
import OrderTable from './components/owner/order-table'
import MenuEdit from './components/owner/menus/menu-edit'
import PerfilEdit from './components/owner/perfil-edit'
import CoursesList from './components/owner/courses/courses-list'
import UserHome from './components/user/home'
import UserEdit from './components/user/user-edit'
import UserMenu from './components/user/menu'
import UserBag from './components/user/user-bag'
import Redirects from './components/auth/redirects'
import Test from './components/scan-qr'
// Si no usamos un this.states, deberiamos ser funcional en vez de clase. Noah

import Chat from './components/chat/Chat'



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

    this.fetchUser()

    return (

      <div>

        {/* {this.state.loggedInUser && <p>Pepe</p>} */}
        <Navigation setTheUser={this.setUser} />

        <Switch>
          <Route path="/test" exact component={Test} />

          <Route path="/" exact render={() => <Redirects user={this.state.loggedInUser} />} />

          <ProtectedRoute user={this.state.loggedInUser} path="/owner/home" exact component={HomeOwner} />

          <Route path="/test" exact component={Test} />

          <ProtectedRoute user={this.state.loggedInUser} setUser={this.setUser} path="/owner/restaurant/new" exact component={RestaurantForm} />
          <ProtectedRoute user={this.state.loggedInUser} setUser={this.setUser} path="/owner/:restaurant_id/edit" exact component={RestaurantEdit} />
          <ProtectedRoute user={this.state.loggedInUser} setUser={this.setUser} path="/owner/:restaurant_id/menu/new" exact component={MenuForm} />
          <ProtectedRoute user={this.state.loggedInUser} setUser={this.setUser} path="/owner/:restaurant_id/menu/:course_id/edit" exact component={MenuEdit} />

          <ProtectedRoute user={this.state.loggedInUser} path="/owner/:restaurant_id/tables" exact component={TablesList} />

          <ProtectedRoute user={this.state.loggedInUser} setUser={this.setUser} path="/owner/:restaurant_id/courses" exact component={CoursesList} />

          <ProtectedRoute user={this.state.loggedInUser} path="/owner/:restaurant_id/:table_id" exact component={OrderTable} />

          <ProtectedRoute user={this.state.loggedInUser} path="/:table/:num/chat" exact component={Chat} />


          <ProtectedRouteClient user={this.state.loggedInUser} path="/home" exact component={UserHome} />


          <ProtectedRouteClient user={this.state.loggedInUser} path="/home" exact component={UserHome} />
          <ProtectedRouteClient user={this.state.loggedInUser} path="/:restaurant_id/:table_id" exact component={UserMenu} />
          <ProtectedRouteClient user={this.state.loggedInUser} path="/:restaurant_id/:table_id/order" exact component={UserBag} />



          <Route path="/signup" exact render={() => <Signup setTheUser={this.setUser} />} />
          <Route path="/login" exact render={() => <Login setTheUser={this.setUser} />} />

        </Switch>

      </div>
    )
  }
}

export default App;