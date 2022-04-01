import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from "react";
import { InfinitySpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;


async function addToCart(token, userId, itemId){
  // Create PaymentIntent as soon as the page loads
  const res = await fetch("/cart/"+encodeURIComponent(userId), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({itemId: itemId+"", quantity: 1})
  })

  return res;
}
export default function Product(item) {
  const { isAuthenticated } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const [token, setToken] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { user } = useAuth0();

  const { getAccessTokenSilently } = useAuth0();
  useEffect(async() => {
    if(isAuthenticated){
      setToken(await getAccessTokenSilently());
    }
  },[])

  if (isLoading)
  {
    return (
      <Container>
        <InfinitySpin color="purple"/>
      </Container>
    )
  }

  return isAuthenticated && token != ""? (
    <Container>
      <Circle />
      <Image src={item.item.url} />
      <Info>
        <Icon>
          <ShoppingCartOutlined  
          onClick={async() => 
          {
            setLoading(true)
            let res = await addToCart(token, user.sub, item.item.itemid)
            if(res.status != 200){
              let text = await res.text();
              if(text){
                toast.error(text);
              }else{
                  toast.error("Something went wrong with adding to your cart.");
              }
            }else{
              toast.success("Item has been added to your cart");
            }
            setLoading(false)
          }}/>
        </Icon>
        <Icon>
          <Link to={'/product/'+item.item.itemid} style={{ textDecoration: 'none' }}>
            <SearchOutlined />
          </Link>
        </Icon>
      </Info>

    </Container>
  ) : 
  (
    <Container>
      <Circle />
      <Image src={item.item.url} />
      <Info>
        <Icon>
          <ShoppingCartOutlined  onClick={() => loginWithRedirect()}/>
        </Icon>
        <Icon>
          <Link to={'/product/'+item.item.itemid} style={{ textDecoration: 'none' }}>
            <SearchOutlined />
          </Link>
        </Icon>
      </Info>

    </Container>
  ) 
  ;
};