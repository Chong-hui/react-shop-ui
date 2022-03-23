import React from 'react';
// import '../ap';
import { useAuth0 } from '@auth0/auth0-react';

export default function AuthOnly() {
  const { user } = useAuth0();
  const { name, picture, email } = user;

  return <h1 className='sign-up'>{ name }</h1>;
}
