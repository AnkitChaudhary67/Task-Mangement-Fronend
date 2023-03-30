import React, { useContext, useEffect, useState } from 'react';
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
import {  categoryGet,userget } from '../../services/Apis';
// import './Add.css';

const AddTask
    = () => {

        const navigate = useNavigate();
       
    const [showspin, setShowSpin] = useState(true);

        const [inputData, setInputData] = useState({
            title: "",
            description: "",
            dueDate: "",
            priority: "",
        })
        const [categoryId, setCategoryId] = useState('');
        const [assignedUserId, setAssignedUserId] = useState('');
        const [status, setStatus] = useState("Pending");
        const [categories, setCategories] = useState([]);
        const [users, setUsers] = useState([]);
const categoryFetch = async () => {
        console.log('-------localStorage.getItem("token")', localStorage.getItem("token"))
        const config = {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        }
        const result = await categoryGet(config);
        console.log(result);
        if (result.status === 200) {
            setCategories(result.data.data)
            // setUserData(result.data.data);
        } else {
            console.log("error get users");
        }
    }

    const userGet = async () => {
        console.log('-------localStorage.getItem("token")', localStorage.getItem("token"))
        const config = {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        }
        const result = await userget(config);
        console.log(result);
        if (result.status === 200) {
            setUsers(result.data.data);
            
            // setUserData(result.data.data);
        } else {
            console.log("error get users");
        }
    }



        // Status Option
        const options = [
            { value: 'Completed', label: 'Completed' },
            { value: 'In Progress', label: 'In Progress' },
            { value: 'Pending', label: 'Pending' },

        ];

        const handleCategoryChange = (event) => {
            setCategoryId(event.target.value);
          };

          const handleUserChange = (event) => {
            setAssignedUserId(event.target.value);
          };
        // setInput value
        const setInputValue = (e) => {
            const { name, value } = e.target;
            setInputData({ ...inputData, [name]: value })
        }

        //status set
        const setStatusValue = (e) => {
            setStatus(e.value)
        }

        // submit data
        const handleSubmitUser = async (e) => {
            e.preventDefault();

      

            const { title, description, dueDate, priority } = inputData;
            console.log('-----------categoryId',categoryId)
            console.log('-----------assignedUserId',assignedUserId)
            if (title === "") {
                toast.error("Title is Required")
            } else if (description === "") {
                toast.error("Description is Required")
            } else if (categoryId === "") {
                toast.error("Category is Required")
            } else if (dueDate === "") {
                toast.error("DueDate is required!!")
            } else if (priority === "") {
                toast.error("Priority is Required")
            } else if (assignedUserId === "") {
                toast.error("AssignedUser is Required")
            } else if (status === "") {
                toast.error("Status is Required")
            } else {
                const data = { title, description, categoryId, dueDate, priority, assignedUserId,status };
                console.log(data);

                const config = {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                }


                const response = await registerfun(data, config);

                if (response.status === 201) {
                    setInputData({
                        ...inputData,
                        title: "",
                        description: "",
                        dueDate: "",
                        priority: "",
                    });
                    setCategoryId("");
                    setAssignedUserId("");
                    setStatus("");
                    toast.success("Task Add Successfully")
                    navigate("/tasks");
                } else {
                    toast.error("Error!")
                }

            }

        }
       
      
        useEffect(() => {
            userGet();
            categoryFetch();
            setTimeout(() => {
                setShowSpin(false)
            }, 1000)
        }, [])
      
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
                            <label htmlFor="categoryId">Category</label>
        <select id="category" name="category" value={categoryId} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            {categories.map((categoryId) => (
              <option key={categoryId._id} value={categoryId._id}>
                {categoryId.name}
              </option>
            ))}
          </select>
        
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
                                    options={options} onChange={setStatusValue}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                            <label htmlFor="assignedUserId">Assigned User</label>
         <select id="assignedUser" name="assignedUser" value={assignedUserId} onChange={handleUserChange}>
            <option value="">Select User</option>
            {users.map((assignedUserId) => (
              <option key={assignedUserId._id} value={assignedUserId._id}>
                {assignedUserId.name}
              </option>
            ))}
          </select>
                            </Form.Group>
                            <Button variant="danger" type="submit" onClick={handleSubmitUser}>
                               Add
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
  

export default AddTask;







