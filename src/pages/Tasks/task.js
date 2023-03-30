import React,{useContext,useEffect,useState} from 'react'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import { NavLink ,useNavigate} from 'react-router-dom';
import {statusChange} from '../../services/Apis';
import { ToastContainer, toast } from "react-toastify";
import {  deleteTask, taskGet } from '../../services/Apis';
import { dltdata, updateData } from '../../components/Context/Provider';
import Button from 'react-bootstrap/Button';



const Task = () => {
    
  const handleStatus=async(id,status)=>{
       const result= await statusChange(id,status);
       if(result.status===200){
          taskGet();
           toast.success("Status Update")
       }else{
        toast.error("Error!!")
       }
  }
  const navigate=useNavigate();
    const [userdata, setUserData] = useState([]);
    const [showspin, setShowSpin] = useState(true);
    const { deletedata, setDeletedata } = useContext(dltdata);

    const addTask=()=>{
        navigate("/addTask");
      }


    const task = async () => {
        console.log('-------localStorage.getItem("token")', localStorage.getItem("token"))
        const config = {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        }
        const result = await taskGet(config);
        console.log(result);
        if (result.status === 200) {
          console.log(result);
            setUserData(result.data.data);
        } else {
            console.log("error get users");
        }
    }
    //User Delete

    const deleteTasks = async (id) => {
        console.log('-------localStorage.getItem("token")', localStorage.getItem("token"))
        const config = {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        }
        const result = await deleteTask({ taskId: id }, config);
        if (result.status === 200) {
            await task();
        } else {
            toast.error("error")
        }
    }

    useEffect(() => {
      taskGet();
        task();
        setTimeout(() => {
            setShowSpin(false)
        }, 1000)
    }, [])
  
  return (
    <div className='container'>
        <div className="search_add mt-4 d-flex justify-content-between">
            
            <div className="add_btn">
              <Button variant="primary" onClick={addTask}> <i className="fa-solid fa-plus"></i>&nbsp; Add Task</Button>
            </div>
          </div>

          
      <Row>
        <div className='col mt-0'>
          <Card className='shadow '>
            <Table className='align-align-items-center responsive="sm"'>
              <thead className='thead-dark'>
                <tr className='table-dark'>
                  <th>ID</th>
                  <th>Title</th>  
                  <th>Description</th>
                  <th>Category</th>
                  <th>Due date</th>
                  <th>Priority</th>
                  <th>&nbsp;&nbsp;&nbsp;Status</th>
                  <th>Assigned user</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody  >
              {
                    userdata.length > 0 ? userdata.map((element, index) => {
                      return (
                        <>
                          <tr key={element._id}>
        
                            <td>{index + 1 }</td> 
                            <td>{element.title}</td>
                            <td>{element.description}</td>
                            <td>{element?.categoryDetail?.name}</td>
                            <td>{element.dueDate}</td>
                            <td >{element.priority}</td>
                            <td className='d-flex align-items-center'>
                              <Dropdown className='text-center'>
                                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                  <Badge bg={element.status == "Completed" ? "primary" : "danger"}>
                                    {element.status} <i className="fa-solid fa-angle-down"></i>
                                  </Badge>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={()=>handleStatus(element._id,"Completed")}>Completed</Dropdown.Item>
                                  <Dropdown.Item onClick={()=>handleStatus(element._id,"In Progress")}>In Progress</Dropdown.Item>
                                  <Dropdown.Item onClick={()=>handleStatus(element._id,"Pending")}>Pending</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                  
                            <td>{element?.userDetail?.name}</td>

                            <td>
                              <Dropdown>
                                <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                  <i className="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                               
                                  <Dropdown.Item >
                                    <NavLink to={`/editTask/${element._id}`} className="text-decoration-none">
                                      <i className="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i> <span>Edit</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item >
                                                                    <div onClick={() => deleteTasks(element._id)}>
                                                                        <i className="fa-solid fa-trash" style={{ color: "red" }}></i> <span>Delete</span>
                                                                    </div>
                                                                </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      )
                    }) : <div className='no_data text-center'>No Data Found</div>
                  }


              </tbody>
            </Table>
          
          </Card>
        
        </div>
      </Row>
      <ToastContainer/>
    </div>
  )
}

export default Task
