import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { ShoppingCartOutlined, LocalShippingOutlined} from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import styled from "styled-components";
import { mobile } from "../responsive";
import { InfinitySpin } from 'react-loader-spinner';

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const AuthenticatedNav = () => {
  const { isAuthenticated } = useAuth0();
  const { isLoading } = useAuth0();
  if (isLoading) {
    return  <InfinitySpin height="100"
    width="100" color="purple"/>;
  }
  if (isAuthenticated) {
    return (
      <>
        <MenuItem>
          <Link to='/cart' style={{ textDecoration: 'none' }}>
            <ShoppingCartOutlined />
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to='/order' style={{ textDecoration: 'none' }}>
            <LocalShippingOutlined/>
          </Link>
        </MenuItem>

      </>
    );
  } else { 
    return "";
  }
  
};

export default AuthenticatedNav;