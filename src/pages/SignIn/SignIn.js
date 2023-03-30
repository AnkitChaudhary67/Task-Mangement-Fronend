import React, { useContext, useEffect, useState } from 'react'
import './SignIn.css';
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai';
import { userSignIn } from '../../services/Apis';
import { NavLink ,useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { BASE_URL } from '../../services/helper';

const SignIn = () => {
    const navigate=useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
      });
      const [error, setError] = useState('');
    
      // Handle changes to the login form fields
      const handleLoginChange = e => {
        setCredentials({
          ...credentials,
          [e.target.name]: e.target.value,
        });
      };
    
    const history = useNavigate();


    const handleSubmit = async(e) => {
        e.preventDefault();

        const { email, password } = credentials;

        if (email === "") {
            toast.error("email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-center"
            });
        } else if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else {
    axios.post(`${BASE_URL}/login`, credentials)
      .then(res => {
        localStorage.setItem('token', res.data.data.token);
        localStorage.setItem('userDetail', res.data.data.user);
        history("/home");
        toast.success("Login Successful");
        document.location.reload();
      })
      .catch(err => {
        console.log(`Error logging in: ${err}`);
        setError('Invalid email or password');
      });
        }
    }

  return (
    <div className='white-container' >

        <div className='signIn-container'>
          
            <div className='signIn-header'>
                <h4>Logo</h4>
                <p>Enter your credentials to access your account</p>
            </div>
            <form className="signIn-form" >
                <div className='email'>
                    <input className='email-input' type="text" name="email" placeholder="Enter Mail ID" value={credentials.email} onChange={handleLoginChange} />
                </div>
             
                <div className='password'>
                    <input className='password-input' type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleLoginChange} />
                   
                </div>
            
                <button className="button-1" onClick={handleSubmit}>Sign In</button>
                <p>Don't have an Account? <NavLink to="/signup">Sign Up</NavLink> </p>
            </form>
       
            <ToastContainer/>
        </div>
      
    </div>
  )
}

export default SignIn;