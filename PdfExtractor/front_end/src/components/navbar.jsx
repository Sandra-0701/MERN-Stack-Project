import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container'; // Import Container
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.css';
import { getID } from '../services/getTokenId';
import { useNavigate } from 'react-router-dom';



function BasicExample() {
  
  const [showSignInUp, setShowSignInUp] = useState(false)

  const toggleSignInUp = () => {
    setShowSignInUp(!showSignInUp);
  };



  const [id, setId] = useState(null)
  const getId = getID()

  getId.then((token) => {
    setId(token)
  }).catch((error) => {
    console.error("Error fetching token:", error);
  });
  const Navigate = useNavigate() 
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        
        <Navbar.Brand className="extractor" href="#home">
          Extractify
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Service" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Pdf Extract</NavDropdown.Item>
              
            </NavDropdown>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          <div className="user-icon" onClick={toggleSignInUp}>
            <FontAwesomeIcon icon={faUser} />
            {showSignInUp && (
              <div className="sign-in-up-options">
                {/* <a href="/login">Sign In</a>
                <a href="/registration">Sign Up</a> */}

                <Nav.Link href="/login" className="ml-auto" >
                    Sign In
                  </Nav.Link>
                  <Nav.Link href="/register" className="ml-auto" >
                    Sign Up
                  </Nav.Link>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;