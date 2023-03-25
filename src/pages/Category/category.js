import React, { useState, useEffect, useContext } from 'react'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from "react-toastify";
import Dropdown from 'react-bootstrap/Dropdown';
import {  deleteCategory, categoryGet } from '../../services/Apis';
import { dltdata, updateData } from '../../components/Context/Provider';
import Button from 'react-bootstrap/Button';
import { useNavigate, NavLink } from "react-router-dom"


const Category = () => {
    const navigate=useNavigate();
    const [userdata, setUserData] = useState([]);
    const [showspin, setShowSpin] = useState(true);
    const { deletedata, setDeletedata } = useContext(dltdata);

    const addCategory=()=>{
        navigate("/addCategory");
      }


    const category = async () => {
        console.log('-------localStorage.getItem("token")', localStorage.getItem("token"))
        const config = {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        }
        const result = await categoryGet(config);
        console.log(result);
        if (result.status === 200) {
            setUserData(result.data.data);
        } else {
            console.log("error get users");
        }
    }
    //User Delete

    const deleteCategoryfunc = async (id) => {
        console.log('-------localStorage.getItem("token")', localStorage.getItem("token"))
        const config = {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        }
        const result = await deleteCategory({ categoryId: id }, config);
        if (result.status === 200) {
            await category();
        } else {
            toast.error("error")
        }
    }

    useEffect(() => {
        category();
        setTimeout(() => {
            setShowSpin(false)
        }, 1000)
    }, [])

    return (
        <div className='container'>
            <div className="search_add mt-4 d-flex justify-content-between">
            
            <div className="add_btn">
              <Button variant="primary" onClick={addCategory}> <i className="fa-solid fa-plus"></i>&nbsp; Add Category</Button>
            </div>
          </div>
            <Row>
                <div className='col mt-0'>
                    <Card className='shadow '>
                        <Table className='align-align-items-center responsive="sm"'>
                            <thead className='thead-dark'>
                                <tr className='table-dark'>
                                    <th>ID</th>
                                    <th>Category Name</th>
                                    <th>Color</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    userdata.length > 0 ? userdata.map((element, index) => {
                                        return (
                                            <>
                                                <tr >

                                                    <td>{index + 1}</td>
                                                    <td>{element.name}</td>
                                                    <td>{element.color}</td>
                                                    <td>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                                                <i className="fa-solid fa-ellipsis-vertical"></i>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                            <Dropdown.Item >
                                    <NavLink to={`/editcategory/${element._id}`} className="text-decoration-none">
                                      <i className="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i> <span>Edit</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                                                <Dropdown.Item >
                                                                    <div onClick={() => deleteCategoryfunc(element._id)}>
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
            <ToastContainer />
        </div>
    )
}

export default Category;
