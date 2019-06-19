import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const protectedRoute = ({ component: Component, user, setUser, updateTotal, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props => {
        if (user && user.role === 'user') {
          return <Component {...props} loggedInUser={user} setTheUser={setUser} updateTotal={updateTotal}/>
        } else {
          return <Redirect to={{ pathname: '/' }} />
        }
      }
      }
    />
  )
}
export default protectedRoute