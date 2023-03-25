import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTaskDetail, registerfun } from '../../services/Apis';
import { useNavigate, useParams } from "react-router-dom"
import { addData } from '../../components/Context/Provider';
import { categoryGet, userget, editTask, getTask } from '../../services/Apis';

const UpdateTask
    = () => {

        const navigate = useNavigate();
        const [categories, setCategories] = useState([]);
        const [users, setUsers] = useState([]);

        const { useradd, setUseradd } = useContext(addData);
        const [userdata, setUserData] = useState([]);
        const [showspin, setShowSpin] = useState(true);

        const [inputData, setInputData] = useState({
            title: "",
            description: "",
            dueDate: "",
            priority: "",
            status: "",
            categoryId: "",
            assignedUser: ""
        })
        const [status, setStatus] = useState("Pending");

        const { id: taskId } = useParams()

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

        // submit data
        const handleSubmitUser = async (e) => {
            e.preventDefault();

            const { title, description, categoryId, dueDate, priority, assignedUser } = inputData;
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
            } else if (assignedUser === "") {
                toast.error("AssignedUser is Required")
            } else if (status === "") {
                toast.error("Status is Required")
            } else {


                const data = { title, description, categoryId, dueDate, priority, assignedUser };

                const config = {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                }


                const response = await editTask(data, config);

                if (response.status === 201) {
                    setInputData({
                        ...inputData,
                        title: "",
                        description: "",
                        dueDate: "",
                        priority: "",
                        assignedUser: ""
                    });
                    navigate("/tasks");
                } else {
                    toast.error("Error!")
                }

            }

        }
        const getTask = async () => {

            const config = {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            }
            console.log('---------taskId', taskId)
            const result = await getTaskDetail({ taskId }, config);
            if (result.status === 200) {
                console.log('-----------result--', result)
                // setCategoryData(result.data.data);
            } else {
                toast.error("error")
            }
        }

        useEffect(() => {
            userGet();
            categoryFetch();
            getTask();
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
                                <select name="categoryId" id="categoryId">
                                    {categories.map(categoryId => (
                                        <option key={categoryId._id} value={categoryId._id}>{categoryId.name}</option>
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
                                <label htmlFor="assignedUser">Assigned User</label>
                                <select name="assignedUser" id="assignedUser">
                                    {users.map(user => (
                                        <option key={user._id} value={user._id}>{user.name}</option>
                                    ))}
                                </select>
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


export default UpdateTask;