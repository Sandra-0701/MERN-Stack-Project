import React, { useState } from 'react';
import './style/reg.css'; // Create a CSS file for styling
import img1 from "../images/img1.jpg"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Navbar from "../components/navbar"
const Signup = () => {
    const Navigate = useNavigate()
    const [Data, setData] = useState({
        name: '',
        email: '',
        pass: '',
        
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:7000/auth/Register', Data)
            .then((response) => {
                console.log('Registration successful:', response.data);
                alert("Success");
                Navigate("/login")
            })
            .catch((error) => {
                console.error('Registration failed:', error);
                alert("Something Went Wrong");
            });

        
    };

  return (
  
  <>
  <Navbar/>
  <div className="signup-container">

    <form action="" onSubmit={handleSubmit}>
    <div className="signup-form">
        <img src={img1} alt="Signup" className="signup-image" />
        <h2>Sign Up</h2>
        <input
        name='name'
          type="text"
          placeholder="Name"
          value={Data.name}
          onChange={handleInputChange}
        />
        <input
        name='email'
          type="text"
          placeholder="Email"
          value={Data.email}
          onChange={handleInputChange}
        />
        <input
        name='pass'
          type="password"
          placeholder="Password"
          value={Data.pass}
          onChange={handleInputChange}
        />
        <button>Sign Up</button>
      </div>

      </form>
    </div>
    
      
  </>
    
  );
};

export default Signup;