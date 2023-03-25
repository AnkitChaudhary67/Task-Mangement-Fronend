import React, { useContext, useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userAddFunc } from '../../services/Apis';
import { useNavigate } from "react-router-dom"
import { addUserData} from '../../components/Context/Provider';

const AddUser
 = () => {
    const navigate = useNavigate();
    const {useraddData, setUseraddData } = useContext(addUserData);

    const [inputData, setInputData] = useState({
        email: "",
        name: "",
    
    })



  
    // setInput value
    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
    }

    

    // submit data
    const handleSubmitUser = async (e) => {
        e.preventDefault();

        const { email, name } = inputData;
        if (email === "") {
            toast.error("Email is Required")
        } else if (name === "") {
            toast.error("Name is Required")
        } else {

            const data= {name,email};

            const config = {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            }

            const response = await userAddFunc(data, config);
            console.log('---------------response--',response)
            if (response.status === 201) {
                setInputData({
                    ...inputData,
                    email: "",
                    name: "",
                });
                setUseraddData(response.data)
                navigate("/home");
            } else {
                toast.error("Error!")
            }

        }

    }
    return (
        <div className='container'>
            <h2 className='text-center mt-5'>Enter User </h2>
            <Card className='shadow mt-2 p-3'>
                <Form>

                    <Form.Group className="mb-3 col-lg-12" controlId="formBasicEmail">
                        <Form.Label> Email Id</Form.Label>
                        <Form.Control type="email" name='email' value={inputData.email} onChange={setInputValue} placeholder='Enter Email Id' />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-12" controlId="formBasicEmail">
                        <Form.Label> Name</Form.Label>
                        <Form.Control type="text" name='name' value={inputData.name} onChange={setInputValue} placeholder='Enter User Name' />
                    </Form.Group>


                    <Button variant="danger" type="submit" onClick={handleSubmitUser}>
                        Submit
                    </Button>
                </Form>

            </Card>
            <ToastContainer
                position="top-center"
            />
        </div>
    )
}

export default AddUser;
