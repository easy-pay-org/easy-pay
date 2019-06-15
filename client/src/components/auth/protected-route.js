import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const protectedRoute = ({ component: Component, user, setUser, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props => {
                if (user) {
                    return <Component {...props} loggedInUser={user} setTheUser={setUser} />
                } else {
                    return <Redirect to={{ pathname: '/' }} />
                }
            }
            }
        />
    )
}
export default protectedRoute