import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector  } from 'react-redux';

import Loading from '../shared/Loading';

// Private Route, for routes that require an admin user, redirects otherwise
const PrivateRoute = ({component: Component, ...rest}) => {

    // retrieve state from redux store
    const { userInfo, loading } = useSelector(
        state => state.user
    );

    // if unauthenticated -> login
    // authenticated but not admin -> root
    // authenticated and admin -> component
    return (
        <Route {...rest} render={props => 
            !userInfo && loading ? (
                <Loading />
            ) : !userInfo && !loading ? (
                <Redirect to="/login" />
            ) : !userInfo.isAdmin && !loading ? (
                <Redirect to="/" />
            ) : (
                <Component {...props} />
            )
        } 
        />
    );
};


export default PrivateRoute;
