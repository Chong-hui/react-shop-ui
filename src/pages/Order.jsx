import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import ScrollToTop from "react-scroll-to-top";
import React, { useState, useEffect } from "react";
import { InfinitySpin } from 'react-loader-spinner';
import { useAuth0} from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { CAccordionBody } from '@coreui/react'
import { CAccordionHeader } from '@coreui/react'
import { CAccordionItem } from '@coreui/react'
import { CAccordion } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'

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

const Details = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin-right 20px;
  &:hover{
      background-color: #f8f4f4;
  }
`;

const ProductId = styled.span``;
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
  margin-right: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;


const Order = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { user } = useAuth0();
  const { isAuthenticated } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState(false);
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [orderIdLoading, setOrderLoading] = useState("");
  function updateOrder(orderId){
    if(isAuthenticated){
      setOrderLoading(orderId)
      setButtonLoading(true)
      if (user != undefined){
          fetch("/UpdateOrder/receive/"+orderId, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
          }).then( res => {
            setButtonLoading(false)
            setOrderLoading("")
            window.location.reload()
          }     
          ).catch(err=>{
            toast.error(err);
            setButtonLoading(false)
            setOrderLoading("")
          });
      }
    }
  }

  useEffect(async() => {
    if(isAuthenticated){
        setLoading(true)
        let t = await getAccessTokenSilently();
        if (user != undefined){
            const res = await fetch("/order/userid/"+encodeURIComponent(user.sub), {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${t}`,
                "Content-Type": "application/json",
            },
            });
        
            if(res.status != 200){
            let text = await res.text();
            if(text){
                toast.error(text);
            }else{
                toast.error("Something went wrong viewing your Order");
            }
            }else{
              setToken(t);
              setOrders(await res.json())
            }
            setLoading(false)
        }
    }
  },[user])

  if (isLoading){
    return (
        <Container>
        <ScrollToTop smooth />
        <Navbar />
        <Wrapper>
            <Title>YOUR ORDERS</Title>
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
    );
  }
  console.log(orders)

  if (orders.length === 0){
    return (
        <Container>
        <ScrollToTop smooth />
        <Navbar />
        <Wrapper>
            <Title>YOUR ORDERS</Title>
            <Top>
                <TopButton>
                <Link to="/productlists" style={{ textDecoration: "none" }}>
                    CONTINUE SHOPPING
                </Link>
                </TopButton>     
            </Top>
            <Bottom>
            <Details>Yourt Order is empty</Details>
          </Bottom>
        </Wrapper>
        <Footer />
        </Container>
    );  
  }

  return (
    <Container>
      <ScrollToTop smooth />
      <Navbar />
      <Wrapper>
        <Title>YOUR ORDERS</Title>
        <Top>
            <TopButton>
            <Link to="/productlists" style={{ textDecoration: "none" }}>
                CONTINUE SHOPPING
            </Link>
            </TopButton>     
        </Top>
        <Bottom>
            <Info>
            {orders.map(
              order => 
              {
                return(
                    <CAccordion flush>    
                        <CAccordionItem itemKey={order.orderid}>
                            <CAccordionHeader>
                                    <ProductDetail>
                                        <Details>
                                            <ProductId>
                                                <b>ID: {order.orderid}</b> 
                                            </ProductId>
                                        </Details>
                                    </ProductDetail>
                                    <ProductAmountContainer>
                                            <ProductAmount>Status: {order.orderstatus}</ProductAmount>     
                                    </ProductAmountContainer>
                                    {
                                      isButtonLoading&&orderIdLoading === order.orderid?<InfinitySpin color="purple"/>:""
                                    }
                                    {
                                      order.orderstatus === "Sent" && !isButtonLoading?
                                        <Button onClick={() => updateOrder(order.orderid)}>
                                        I have recieved my order</Button>:""
                                    }
                            </CAccordionHeader>
                            <CAccordionBody>
                                {order.details.map(
                                    item => 
                                    {
                                        return(<Product>
                                            <ProductDetail>
                                            <Details>
                                            <ProductId>
                                                <b>ID:</b> {item.itemid}
                                            </ProductId>
                                            </Details>
                                            </ProductDetail>
                                            <PriceDetail>
                                            <ProductAmountContainer>
                                                <ProductAmount>{item.quantity}</ProductAmount>
                                            </ProductAmountContainer>
                                            </PriceDetail>
                                        </Product>)
                                    }
                                )}
                            </CAccordionBody>
                        </CAccordionItem>
                       
                    </CAccordion>
   
                )
              })
            }
            </Info>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};
export default Order;