import React, { useContext, useEffect, useState } from 'react';
import "./register.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerfun } from '../../services/Apis';
import { useNavigate } from "react-router-dom"
import { addData } from '../../components/Context/Provider';

const Register = () => {
  const navigate=useNavigate();
  const {useradd, setUseradd}=useContext(addData);

  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    category: "",
    dueDate: "",
    priority: "" ,
    status: "",
    assignedUser: ""
   
  })
  const [status, setStatus] = useState("Pending");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");


  // Status Option
  const options = [
    { value: 'Complete', label: 'Complete' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Pending', label: 'Pending' },

  ];

  // setInput value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value })
  }

  //status set
  const setStatusValue = (e) => {
    setStatus(e.value)
  }

  //profile set

  const setProfile = (e) => {
    setImage(e.target.files[0])
  }

  // submit data
  const handleSubmitUser = async(e) => {
    e.preventDefault();

    const { title, description, category, dueDate, priority, assignedUser } = inputData;
    if (title === "") {
      toast.error("Title is Required")
    } else if (description === "") {
      toast.error("Description is Required")
    } else if (category === "") {
      toast.error("Category is Required")
    } else if (dueDate === "") {
      toast.error("DueDate is required!!")
    }  else if (priority === "") {
      toast.error("Priority is Required")
    } else if (assignedUser === "") {
      toast.error("AssignedUser is Required")
    } else if (status === "") {
      toast.error("Status is Required")
    } else {


      const data = new FormData();
      data.append("title",title)
      data.append("description",description)
      data.append("category",category)
      data.append("dueDate",dueDate)
      data.append("priority",priority)
      data.append("status",status);
      data.append("assignedUser",assignedUser)

      const config = {
        "Content-Type":"application/json"
      }

      const response = await registerfun(data,config);
      
      if(response.status === 200){
        setInputData({
          ...inputData,
          title:"",
          description: "",
          category: "",
          dueDate: "",
          priority: "",
          assignedUser: ""
        });
        setStatus("");
        setUseradd(response.data)
        navigate("/");
      }else{
        toast.error("Error!")
      }

    }

  }
  return (
    <div className='container'>
      <h2 className='text-center mt-5'>Enter Task</h2>
      <Card className='shadow mt-2 p-3'>
        <Form>
          <Row>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label> Title</Form.Label>
              <Form.Control type="text" name='title' value={inputData.title} onChange={setInputValue} placeholder='Enter Title' />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label> Description</Form.Label>
              <Form.Control type="text" name='description' value={inputData.description} onChange={setInputValue} placeholder='Enter Description Here' />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Category</Form.Label>
              <Form.Control type="category" name='category' value={inputData.category} onChange={setInputValue} placeholder='Category' />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label> Due Date</Form.Label>
              <Form.Control type="date" name='dueDate' value={inputData.dueDate} onChange={setInputValue} placeholder='Enter Mobile No.' />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label> Priority</Form.Label>
              <Form.Check
                type={'radio'}
                label={`Low`}
                name="priority"
                value={"Low"}
                onChange={setInputValue}
              />
              <Form.Check
                type={'radio'}
                label={`Medium`}
                name="priority"
                value={"Medium"}
                onChange={setInputValue}
              />
               <Form.Check
                type={'radio'}
                label={`High`}
                name="priority"
                value={"High"}
                onChange={setInputValue}
              />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label> Select Your Status</Form.Label>
              <Select
                options={options}  onChange={setStatusValue}
              />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label> Assigned User</Form.Label>
              <Form.Control type="text" name='assignedUser' value={inputData.assignedUser} onChange={setInputValue} placeholder='Enter User Name' />
            </Form.Group>
            <Button variant="danger" type="submit" onClick={handleSubmitUser}>
              Submit
            </Button>
          </Row>
        </Form>

      </Card>
      <ToastContainer
        position="top-center"
      />
    </div>
  )
}

export default Register