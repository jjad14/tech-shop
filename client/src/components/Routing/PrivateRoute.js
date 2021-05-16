import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector  } from 'react-redux';

import Loading from '../shared/Loading';

const PrivateRoute = ({component: Component, ...rest}) => {

    // retrieve state from redux store
    const { userInfo, loading } = useSelector(
        state => state.user
    );

        // userInfo && !loading

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
