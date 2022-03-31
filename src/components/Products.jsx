import styled from "styled-components";
import Product from "./Product";
import React, { useState, useEffect } from "react";
import { InfinitySpin } from 'react-loader-spinner';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(async() => {
    try {
      setLoading(true)
      const res = await fetch("/inventory/all/available", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      setProducts(await res.json())
      setLoading(false)

    } catch {
      // TODO: Handle error exception
      setLoading(false)

    } finally {
      setLoading(false)
    }
  }, [])
  
  // TODO: Handle loader icon / component
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

  if (products.length === 0)
    return null

  return (
    <Container>
      {products.map(item => (
        <Product item={item} key={item.itemid} />
      ))}
    </Container>
  );
};
