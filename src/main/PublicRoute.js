import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  console.log(token);
  return !!token;
};

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() === false ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/dashboard',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PublicRoute;
