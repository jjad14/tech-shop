import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector  } from 'react-redux';

import Loading from '../shared/Loading';

// Private Route, for routes that require an authenticated user, redirects otherwise
const PrivateRoute = ({component: Component, ...rest}) => {

    // retrieve state from redux store
    const { userInfo, loading } = useSelector(
        state => state.user
    );

    return (
        <Route {...rest} render={props => 
            !userInfo && loading ? (
                <Loading />
            ) : userInfo && !loading ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        } 
        />
    );
};

export default PrivateRoute;
