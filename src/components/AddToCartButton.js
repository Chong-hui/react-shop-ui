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

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
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

export default function AddToCartButton(obj) {
    const { isAuthenticated } = useAuth0();
    const { loginWithRedirect } = useAuth0();
    const [token, setToken] = useState("");
    const [isLoading, setLoading] = useState(false);
    const { user } = useAuth0();
  
    const { getAccessTokenSilently } = useAuth0();
    useEffect(async() => {
      setToken(await getAccessTokenSilently());
    },[])
  
    if (isLoading)
    {
      return (
        <InfinitySpin color="purple"/>
      )
    }

    return isAuthenticated && token != ""? 
    (<Button onClick={async() => 
        {
          setLoading(true)
          let res = await addToCart(token, user.sub, obj.itemId)
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
        }}>ADD TO CART</Button>)
    : (<Button onClick={() => loginWithRedirect()}>ADD TO CART</Button>)

}
