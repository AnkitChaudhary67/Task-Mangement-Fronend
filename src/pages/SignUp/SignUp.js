import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { addData } from '../../components/Context/Provider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userRegister  } from '../../services/Apis';

const SignUp = () => {

    const navigate=useNavigate();
    const {useradd, setUseradd}=useContext(addData);
  
    const [inputData, setInputData] = useState({
      name: "",
      email: "",
      password:""
    })
  
    // setInput value
    const setInputValue = (e) => {
      const { name, value } = e.target;
      setInputData({ ...inputData, [name]: value })
    }
  
   
  
  
  
    // submit data
    const handleSubmit = async(e) => {
      e.preventDefault();
  
      const { name, email, password } = inputData;
      if (name === "") {
        toast.error("Name is Required")
      } else if (email === "") {
        toast.error("Email is Required")
      } else if (!email.includes("@")) {
        toast.error("Enter a valid email !!")
      }  else if (password === "") {
        toast.error("Password is Required")
      } else {
      
        const data= {name,email,password};
    
        const response = await userRegister(data);
        
        if(response.status === 201){
          setInputData({
            ...inputData,
            name:"",
            email: "",
            password: "",
          });
          setUseradd(response.data);
          toast.success("Registered Successfully")
          navigate("/");
        }else{
          toast.error("Error!")
        }
  
      }
  
    }

  return (
    <>
        <div className='white-container'>
          
            <div className='signIn-container'>
             
                <div className='signIn-header'>
                    <h4>Logo</h4>
                    <p>Create New Account</p>
                </div>
                <form className="signIn-form" >
                <div className='name' style={{ position: "relative" }}>
                        <input className='name-input' type="text" name="name" placeholder="Enter User Name" value={inputData.name} onChange={setInputValue} />
                    </div>
                
                    <div className='email'>
                        <input className='email-input' type="text" name="email" placeholder="Enter Mail ID" value={inputData.email} onChange={setInputValue} />
                    </div>
                  
                    <div className='password' style={{position:"relative"}}>
                        <input className='password-input' type="password" name="password" placeholder="Password" value={inputData.password} onChange={setInputValue} />
                    </div>
                  
                   
                    <button className="button-1" onClick={handleSubmit}>Sign Up</button>
                </form>
               
            </div>
       
        </div>
    </>
  )
}

export default SignUp