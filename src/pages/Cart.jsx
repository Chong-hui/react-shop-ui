import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import ScrollToTop from "react-scroll-to-top";
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { InfinitySpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;  

export default function Cart() {
  const [amount, setAmount] = useState(0);
  const [items, setItems] = useState([]);
  const [naItems, setNaItems] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const { user } = useAuth0();
  const { isAuthenticated } = useAuth0();
  const { loginWithRedirect } = useAuth0();

  useEffect(async () => {
    const getCart = async () => {
        setLoading(true);
        let token = "";
        if(isAuthenticated){
          token = await getAccessTokenSilently();
          if (user){
            const res = await fetch("/cart/"+encodeURIComponent(user.sub), {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
        
            if(res.status != 200){
              let text = await res.text();
              if(text){
                  toast.error(text);
              }else{
                  toast.error("Something went wrong viewing your cart");
              }
            }else{
              let allItems = await res.json();
              let i = []
              let na = []
              allItems.forEach(item => {
                if(item.isRemoved){
                  na.push(item)
                }else{
                  i.push(item)
                }
              })
              setItems(i)
              setNaItems(na)
              setLoading(false)
            }
            setLoading(false)
          }
        }
    }
    getCart();
  }, [user])

  useEffect(() => {
    console.log(items)
    let total = 0.0;
    items.forEach(
      item => {
        total+=(item.quantity*item.pricePerItem)
      }
    );
    setAmount(total.toFixed(2))
  },[items])

  if(isLoading){
    return (  
      <Container>
        <ScrollToTop smooth />
        <Navbar />
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <TopButton>
              <Link to="/productlists" style={{ textDecoration: "none" }}>
                CONTINUE SHOPPING
              </Link>
            </TopButton>     
          </Top>
          <Bottom>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
              <InfinitySpin color="purple"/>
            </div>
          </Bottom>
          </Wrapper>
        <Footer />
      </Container>
    )
  }

  if(!items || (items.length == 0 && naItems.length == 0)){
    return (  
      <Container>
        <ScrollToTop smooth />
        <Navbar />
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <TopButton>
              <Link to="/productlists" style={{ textDecoration: "none" }}>
                CONTINUE SHOPPING
              </Link>
            </TopButton>     
          </Top>
          <Bottom>
            <Details>Yourt Cart is empty</Details>
          </Bottom>
          </Wrapper>
        <Footer />
      </Container>
    )
  }
  return (
    <Container>
      <ScrollToTop smooth />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>
            <Link to="/productlists" style={{ textDecoration: "none" }}>
              CONTINUE SHOPPING
            </Link>
          </TopButton>     
        </Top>
        <Bottom>
          <Info>
            {naItems.map(
              item => 
              {
                return(
                  <Product>
                    <ProductDetail>
                    <Image src={item.url} />
                    <Details>
                      <ProductName>
                        <b>Item is no longer available and has been removed from your cart</b>
                        <br/>
                        <b>Product:</b> {item.name}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {item.itemId}
                      </ProductId>
                    </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <ProductAmount>{item.quantity}</ProductAmount>
                      </ProductAmountContainer>
                      <ProductPrice>$ {item.pricePerItem}</ProductPrice>
                    </PriceDetail>
                  </Product>
                )
              }
            )}
            {items.map(
              item => 
              {
                return(
                  <Product>
                    <ProductDetail>
                    <Image src={item.url} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {item.name}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {item.itemId}
                      </ProductId>
                    </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <ProductAmount>{item.quantity}</ProductAmount>
                      </ProductAmountContainer>
                      <ProductPrice>$ {item.pricePerItem}</ProductPrice>
                    </PriceDetail>
                  </Product>
                )
              }
            )}
          </Info>
          <Summary>
          { items.length > 0 ? 
            <>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {amount}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {amount}</SummaryItemPrice>
            </SummaryItem>
            <Info>Once Checkout your cart will be empty</Info>
            <Link
              to={{
                pathname: "/checkout",
                amount: {amount},
              }}>
              <Button>CHECKOUT NOW</Button>
            </Link>
            </>
          :""}  
        </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

