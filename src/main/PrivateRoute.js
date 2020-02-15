import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  console.log(token);
  return !!token;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
