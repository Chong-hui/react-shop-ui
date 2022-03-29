import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
const CheckoutContainer = styled.div`
  width: 40%;
  margin: 100px auto;
`;

const BackLink = styled.div`
  margin: 10px 0;
`
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function Checkout(props) {
  const { amount } = props.location.state;
  const [clientSecret, setClientSecret] = useState("");
  const { getAccessTokenSilently } = useAuth0();
  const { user } = useAuth0();

  useEffect(async() =>  {
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
  }, [amount]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <CheckoutContainer>
      <Link to={'/cart'}><BackLink>{`< Go back to cart`}</BackLink></Link>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </CheckoutContainer>
  );
}
