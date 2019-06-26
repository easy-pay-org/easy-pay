import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';

import HomeOwner from './components/owner/home'
import RestaurantForm from './components/owner/restaurant-form'
import MenuForm from './components/owner/menus/menu-form'
// import Navigation from './components/navigation'
import AuthServices from './service/auth-services'
import Signup from './components/auth/signup'
import Login from './components/auth/login'
import ProtectedRoute from './components/auth/protected-route'
import ProtectedRouteClient from './components/auth/protected-route-client'
import RestaurantEdit from './components/owner/restaurant-edit'
import TablesList from './components/owner/tables-list'
import OrderTable from './components/owner/order-table'
import MenuEdit from './components/owner/menus/menu-edit'
import OwnerEdit from './components/owner/perfil-edit'
import CoursesList from './components/owner/courses/courses-list'
import UserHome from './components/user/home'
import UserEdit from './components/user/user-edit'
import Menu from './components/user/menu'
import UserBag from './components/user/user-bag'
import Redirects from './components/auth/redirects'
import Qr from './components/scan-qr'
// import Payment from './components/user/payment'
import RedirectsUnlogged from './components/auth/RedirectsUnlogged'
import PaymentSuccess from './components/user/paymentSuccess'



// import { Elements, StripeProvider } from 'react-stripe-elements';
// Si no usamos un this.states, deberiamos ser funcional en vez de clase. Noah

// import Order from './components/sockets/Order'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: null,
      order: {
        total: 0
      },
      menu: {
        restaurant_id: '',
        table_id: ''
      },
      restaurant: {
        restaurant_id: '',
        table_id: 0
      },
    }
    this.services = new AuthServices()
    // this.fetchUser()
  }

  setUser = userObj => this.setState({ loggedInUser: userObj })

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.services.loggedin()
        .then(response => this.setState({ loggedInUser: response }))
        .catch(x => this.setState({ loggedInUser: false }))
    }
  }

  updateTotal = (total) => {

    this.setState({
      order: {
        total
      }
    })
  }

  // setRestaurant = (restaurant_id, table_id) => {

  //   this.setState({
  //     restaurant: {
  //       ...this.state.restaurant,
  //       restaurant_id, table_id
  //     }
  //   })
  // }



  render() {

    this.fetchUser()


    if (this.state.loggedInUser) {

      // console.log('logueado')

      return (

        <div>

          {/* <Navigation setTheUser={this.setUser} /> */}

          <Switch>

            {/* redirecciones */}
            <Route path="/" exact render={() => <Redirects user={this.state.loggedInUser} />} />
            <Route path="/login" exact render={() => <Redirects user={this.state.loggedInUser} />} />

            {/* <Route path="/qr" exact component={Qr} /> */}
            <ProtectedRoute user={this.state.loggedInUser} path="/qr" setRestaurant={this.setRestaurant} exact component={Qr} />

            <ProtectedRoute user={this.state.loggedInUser} path="/owner/home" exact component={HomeOwner} />
            <ProtectedRouteClient user={this.state.loggedInUser} path="/home" restaurant={this.state.restaurant} exact component={UserHome} />

            <ProtectedRoute user={this.state.loggedInUser} setUser={this.setUser} path="/owner/:_id/perfil_edit" exact component={OwnerEdit} />
            <ProtectedRouteClient user={this.state.loggedInUser} setUser={this.setUser} path="/:_id/user_edit" exact component={UserEdit} />


            <ProtectedRoute user={this.state.loggedInUser} setUser={this.setUser} path="/owner/restaurant/new" exact component={RestaurantForm} />
            <ProtectedRoute user={this.state.loggedInUser} setUser={this.setUser} path="/owner/:restaurant_id/edit" exact component={RestaurantEdit} />
            <ProtectedRoute user={this.state.loggedInUser} setUser={this.setUser} path="/owner/:restaurant_id/menu/new" exact component={MenuForm} />
            <ProtectedRoute user={this.state.loggedInUser} setUser={this.setUser} path="/owner/:restaurant_id/menu/:course_id/edit" exact component={MenuEdit} />

            <ProtectedRoute user={this.state.loggedInUser} path="/owner/:restaurant_id/tables" exact component={TablesList} />
            <ProtectedRoute user={this.state.loggedInUser} setUser={this.setUser} path="/owner/:restaurant_id/courses" exact component={CoursesList} />

            <ProtectedRouteClient user={this.state.loggedInUser} restaurant={this.state.restaurant} path="/:restaurant_id/:table_id" exact component={Menu} />
            <ProtectedRouteClient user={this.state.loggedInUser} path="/:restaurant_id/:table_id/paymentSucess" exact component={PaymentSuccess} />




            {
              this.state.loggedInUser ?

                (this.state.loggedInUser.role === 'user') ?

                  <ProtectedRouteClient user={this.state.loggedInUser} updateTotal={this.updateTotal} path="/:restaurant_id/:table_id/order" restaurant={this.state.restaurant} exact component={UserBag} />
                  :
                  < ProtectedRoute user={this.state.loggedInUser} path="/:restaurant_id/:table_id/order" exact component={OrderTable} />

                :
                null
            }

            {/* <Route path="/signup" exact render={() => <Signup setTheUser={this.setUser} />} />
            <Route path="/login" exact render={() => <Login setTheUser={this.setUser} />} /> */}


          </Switch>

        </div >
      )


    } else {

      // console.log('no logueado')

      return (

        <div>

          {/* <Navigation setTheUser={this.setUser} /> */}

          <Switch>

            <Route path="/signup" exact render={() => <Signup setTheUser={this.setUser} />} />
            <Route path="/login" exact render={() => <Login setTheUser={this.setUser} />} />


            {/* Redirecciones */}
            <Route path="/" exact component={RedirectsUnlogged} />
            <Route path="/owner/:id/perfil_edit" exact component={RedirectsUnlogged} />
            <Route path="/:id/user_edit" exact component={RedirectsUnlogged} />

          </Switch>

        </div >
      )

    }
  }
}

export default App;