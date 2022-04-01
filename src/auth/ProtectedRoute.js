import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { InfinitySpin } from 'react-loader-spinner';

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <InfinitySpin color="purple"/>,
    })}
  />
);

export default ProtectedRoute;