import React, { useContext, useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editCategor, getCategoryDetail } from '../../services/Apis';
import { useNavigate, useParams } from "react-router-dom"
import { addUserData} from '../../components/Context/Provider';

const EditCategory
 = () => {
    
    const navigate = useNavigate();
    // const [categorydata,setCategoryData]=useState("");
    const [showspin, setShowSpin] = useState(true);
    

    const [inputData, setInputData] = useState({
        color: "",
        name: "",
    
    })

    const { id: categoryId } = useParams()
  
    // setInput value
    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
    }

    

    // submit data
    const handleSubmitUser = async (e,id) => {
        e.preventDefault();

        const { color, name } = inputData;
        if (color === "") {
            toast.error("Color is Required")
        } else if (name === "") {
            toast.error("Name is Required")
        } else {

            const data= {name,color,categoryId};

            const config = {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            }

            const response = await editCategor(data, config);
            console.log('---------------response--',response)
            if (response.status === 200) {
                setInputData({
                    ...inputData,
                    color: "",
                    name: "",
                });
                // setUseraddData(response.data)
                navigate("/category");
            } else {
                toast.error("Error!")
            }

        }

    }

    const getCategory = async () => {
        
        const config = {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        }
        console.log('---------categoryId',categoryId)
        const result = await getCategoryDetail({ categoryId }, config);
        if (result.status === 200) {
            console.log('-----------result--',result)
            // setCategoryData(result.data.data);
        } else {
            toast.error("error")
        }
    }

    useEffect(() => {
        getCategory();
        setTimeout(() => {
            setShowSpin(false)
        }, 1000)
    }, [])
    return (
        <div className='container'>
            <h2 className='text-center mt-5'>Edit Category </h2>
            <Card className='shadow mt-2 p-3'>
                <Form>

                    <Form.Group className="mb-3 col-lg-12" controlId="formBasicEmail">
                        <Form.Label> Choose Color</Form.Label>
                        <Form.Control type="color" name='color' value={inputData.color} onChange={setInputValue} placeholder='Choose Color' />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-12" controlId="formBasicEmail">
                        <Form.Label> Name</Form.Label>
                        <Form.Control type="text" name='name' value={inputData.name} onChange={setInputValue} placeholder='Enter Category Name' />
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

export default EditCategory;
