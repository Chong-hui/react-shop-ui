import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import styled from "styled-components";

const CheckoutContainer = styled.div`
  width: 40%;
  margin: 100px auto;
`;

export default function CheckoutComplete(props) {
  useEffect(() => {
    setTimeout(() => {
      props.history.push("/")
    }, 5000);
  }, []);
  return (
    <CheckoutContainer>
      {"Thank you for shopping with us!"}
      <br />
      {"You will be directed to the home page..."}
    </CheckoutContainer>
  );
}
