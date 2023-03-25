import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Spiner from "../../components/Spinner/Spinner"
import { singleUserget,edit } from '../../services/Apis';
import { useNavigate, useParams } from 'react-router-dom';
import { updateData } from '../../components/Context/Provider';
import { ToastContainer, toast } from "react-toastify"
import { BASE_URL } from '../../services/helper';
import 'react-toastify/dist/ReactToastify.css';
import "./edit.css"


const Edit = () => {

  const [inputdata, setInputData] = useState({
    title: "",
    description: "",
    category: "",
    dueDate: "",
    priority: "" ,
    status: "",
    assignedUser: ""
  });


  const [status, setStatus] = useState("Active");
  const [imgdata,setImgdata] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const {update,setUpdate} = useContext(updateData);

 const navigate = useNavigate();

  const [showspin, setShowSpin] = useState(true);

  const {id} = useParams();

  // Status Option
  const options = [
    { value: 'Complete', label: 'Complete' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Pending', label: 'Pending' },

  ];
  // setInput Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  }

  // status set
  const setStatusValue = (e) => {
    setStatus(e.value)
  }

 

  

  const userProfileGet = async()=>{
    const response = await singleUserget(id);
    
    if(response.status === 200){
      setInputData(response.data)
      setStatus(response.data.status)
    
    }else{
      console.log("error");
    }
  }
  

  //submit userdata
  const submitUserData = async(e) => {
    e.preventDefault();

    const { title, description, category, dueDate, priority, assignedUser } = inputdata;
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

      const response = await edit(id,data,config);
      
      if(response.status === 200){
        setUpdate(response.data)
        navigate("/")
      }

    }
  }

  useEffect(()=>{
    userProfileGet();
  },[id])

  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, []);



  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">
          <h2 className='text-center mt-1'>Update Your Details</h2>
          <Card className='shadow mt-3 p-3'>
            <div className="profile_div text-center">
              <img src={image ? preview : `${BASE_URL}/uploads/${imgdata}`} alt="img" />
            </div>

            <Form>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>First name</Form.Label>
                  <Form.Control type="text" name='fname' value={inputdata.fname} onChange={setInputValue} placeholder='Enter FirstName' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name='lname' value={inputdata.lname} onChange={setInputValue} placeholder='Enter LastName' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name='email' value={inputdata.email} onChange={setInputValue} placeholder='Enter Email' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control type="text" name='mobile' value={inputdata.mobile} onChange={setInputValue} placeholder='Enter Mobile' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select Your Gender</Form.Label>
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    checked={inputdata.gender == "Male" ? true:false}
                    onChange={setInputValue}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    checked={inputdata.gender == "Female" ? true:false}
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select Your Status</Form.Label>
                  <Select options={options} defaultValue={status} onChange={setStatusValue} />
                </Form.Group>
                
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Enter Your Location</Form.Label>
                  <Form.Control type="text" name='location' value={inputdata.location} onChange={setInputValue} placeholder='Enter Your Location' />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submitUserData}>
                  Submit
                </Button>
              </Row>

            </Form>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      }

    </>
  )
}

export default Edit