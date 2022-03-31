import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Slider from "../components/Slider";
import ScrollToTop from "react-scroll-to-top";
import {  } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <ScrollToTop smooth />
      <Navbar />
      <Slider />
      <Products/>
      <Footer/>
    </div>
  );
};

export default Home;
