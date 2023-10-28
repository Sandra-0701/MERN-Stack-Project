import React, { useState } from 'react';
import './style/login.css'; // Create a CSS file for styling
import img2 from '../images/img2.jpg'
import Navbar from "../components/navbar"
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Login = () => {
    const [Data, setData] = useState({
        email: '',
        pass: '',
        
    });
    const Navigate  = useNavigate()


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:7000/auth/Login", Data);
            if (response.status === 200 ) {
                
              const accessToken = response.data.accessToken;
              const refreshToken = response.data.refreshToken;
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('refreshToken',refreshToken)
              localStorage.setItem("userId",response.data.id)
              Navigate("/")
            
            } 
          } catch (error) {
            console.error("Error occurred:", error);
           
          }
      };

  return (


    <>
    <Navbar/>
    <div className="login-container">
        <form action=""  onSubmit={handleSubmit}>
        <div className="login-form">
         <img src={img2} alt="Login" className="login-image" /> 
          <h2>Login</h2>
          <input
          name='email'
            type="email"
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
          <button>Login</button>
        </div>
        </form>
      </div>
   
      </>
    
  );
};

export default Login;