import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";
import styled from "styled-components";
import { useAuth0 } from '@auth0/auth0-react';
const CheckoutContainer = styled.div`
  width: 40%;
  margin: 100px auto;
`;
const Title = styled.h3`
  font-weight: 300;
  text-align: center;
`;
const Total = styled.h3`
  font-weight: 300;
  text-align: center;
`;
const BackLink = styled.div`
  margin: 10px 0;
`
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function Checkout( prop ) {
  const [clientSecret, setClientSecret] = useState("");
  const { getAccessTokenSilently } = useAuth0();
  const { user } = useAuth0();
  let amount = 0;
  try{
    amount = prop.location.amount.amount;
    console.log(prop.location.amount.amount)
  }catch(err){
    window.location.replace('/cart')
  }
  useEffect(async() =>  {
    if(user){
      //JWT Token generation
      const token = await getAccessTokenSilently(); 
      // Create PaymentIntent as soon as the page loads
      fetch("/Checkout/"+encodeURIComponent(user.sub), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
    }

  }, [user]); 
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <CheckoutContainer>
      <Title>Please do not refresh the page</Title>
      <Total>Your total:$ {amount}</Total>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </CheckoutContainer>
  );
}
