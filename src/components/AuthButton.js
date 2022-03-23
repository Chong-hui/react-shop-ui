import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import { Rings } from 'react-loader-spinner';

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <Rings  color="white" />;
  }
  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

export default AuthenticationButton;