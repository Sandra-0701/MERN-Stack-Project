
import React from 'react';
import img3 from '../images/img3.jpg'; 
import './style/about.css'
import Navbar from '../components/navbar'

const About = () => {
  return (
    <div>
        <Navbar/>
      <p className="mainHead">About PDF Data Extraction</p>
      <div className="image-container">
        <img src={img3} alt="img3" className="img3" />
      </div>
      <p className="subtext">
      "Extractify is a powerful and user-friendly PDF extraction application that simplifies 
      the process of extracting specific content from PDF documents. Whether you need to separate 
      individual pages or extract entire sets, Extractify provides an efficient solution for converting 
      them into single PDF files. With its intuitive interface, users can effortlessly select and download the
      exact pages they require, streamlining document management and enhancing productivity. Extractify offers a seamless 
      experience for anyone working with PDFs, making it the ideal tool for content extraction and customization."
      </p>
      
    </div>
  );
};

export default About;