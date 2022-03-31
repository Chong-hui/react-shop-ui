import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AddToCart from "../components/AddToCartButton";
import { mobile } from "../responsive";
import ScrollToTop from "react-scroll-to-top";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InfinitySpin } from 'react-loader-spinner';
import { useAuth0 } from '@auth0/auth0-react';
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
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

export default function Product() {
  const [product, setProduct] = useState([]);
  const { isAuthenticated } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const [token, setToken] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { user } = useAuth0();

  const { getAccessTokenSilently } = useAuth0();
  useEffect(async() => {
    setToken(await getAccessTokenSilently());
  },[])

  const { id } = useParams()
  console.log(id)
  useEffect(async() => {
    try {
      setLoading(true)
      const res = await fetch("/inventory/"+id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      console.log(res)

      setProduct(await res.json())
      setLoading(true)

    } catch {
      // TODO: Handle error exception
      setLoading(false)

    } finally {
      setLoading(false)
    }
  }, [])
  if (isLoading){
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
      <InfinitySpin color="purple"/>
    </div>);
  }
  console.log(product)

  if (product.length === 0)
    return null
  return (
    <Container>
      <ScrollToTop smooth />
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product[0].url} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product[0].name}</Title>
          <br/>
          <br/>
          <br/>
          <br/>
          <Price>$ {product[0].priceperitem}</Price>
          <br/>
          <br/>
          <br/>
          <br/>
          <AddContainer>
            <AddToCart itemId={id}></AddToCart>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};
