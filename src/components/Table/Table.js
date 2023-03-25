import React from 'react'
import './table.css'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import { BASE_URL } from '../../services/helper';
import { NavLink } from 'react-router-dom';
import {statusChange} from '../../services/Apis';
import { ToastContainer, toast } from "react-toastify"
import Paginations from '../pagination/Paginations';

const Tables = ({ userdata, deleteUser, userGet,handlePrevious, handleNext, page, pageCount, setPage }) => {
  const handleStatus=async(id,status)=>{
       const result= await statusChange(id,status);
       if(result.status===200){
           userGet();
           toast.success("Status Update")
       }else{
        toast.error("Error!!")
       }
  }
  
  return (
    <div className='container'>
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
              <tbody >
              {
                    userdata.length > 0 ? userdata.map((element, index) => {
                      return (
                        <>
                          <tr >
        
                            <td>{index + 1 + (page - 1)*4}</td> 
                            <td>{element.title}</td>
                            <td>{element.description}</td>
                            <td>{element.category}</td>
                            <td>{element.dueDate}</td>
                            <td >{element.priority}</td>
                            {/* <td className='d-flex align-items-center'>
                              <Dropdown className='text-center'>
                                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                  <Badge bg={element.status == "High" ? "danger" : "primary"}>
                                    {element.status} <i className="fa-solid fa-angle-down"></i>
                                  </Badge>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={()=>handleStatus(element._id,"High")}>High</Dropdown.Item>
                                  <Dropdown.Item onClick={()=>handleStatus(element._id,"Medium")}>Medium</Dropdown.Item>
                                  <Dropdown.Item onClick={()=>handleStatus(element._id,"Low")}>Low</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td> */}
        
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
                  
                            <td>{element.assignedUser}</td>

                            <td>
                              <Dropdown>
                                <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                  <i className="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                               
                                  <Dropdown.Item >
                                    <NavLink to={`/edit/${element._id}`} className="text-decoration-none">
                                      <i className="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i> <span>Edit</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item >
                                    <div onClick={() => deleteUser(element._id)}>
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
            <Paginations
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
          </Card>
        
        </div>
      </Row>
      <ToastContainer/>
    </div>
  )
}

export default Tables
