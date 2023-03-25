import React, { useState, useEffect, useContext } from 'react'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from "react-toastify";
import Dropdown from 'react-bootstrap/Dropdown';
import { userget, deletUser } from '../../services/Apis';
import { dltdata, updateData } from '../../components/Context/Provider';


const UserList = () => {
    const [userdata, setUserData] = useState([]);
    const [showspin, setShowSpin] = useState(true);
    const { deletedata, setDeletedata } = useContext(dltdata);


    const userGet = async () => {
        console.log('-------localStorage.getItem("token")', localStorage.getItem("token"))
        const config = {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        }
        const result = await userget(config);
        console.log(result);
        if (result.status === 200) {
            setUserData(result.data.data);
        } else {
            console.log("error get users");
        }
    }
    //User Delete

    const deleteUser = async (id) => {
        console.log('-------localStorage.getItem("token")', localStorage.getItem("token"))
        const config = {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        }
        const result = await deletUser({ userId: id }, config);
        if (result.status === 200) {
            await userGet();
        } else {
            toast.error("error")
        }
    }

    useEffect(() => {
        userGet();
        setTimeout(() => {
            setShowSpin(false)
        }, 1000)
    }, [])

    return (
        <div className='container'>
            <Row>
                <div className='col mt-0'>
                    <Card className='shadow '>
                        <Table className='align-align-items-center responsive="sm"'>
                            <thead className='thead-dark'>
                                <tr className='table-dark'>
                                    <th>ID</th>
                                    <th>Email Id</th>
                                    <th>Name</th>
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
                                                    <td>{element.email}</td>
                                                    <td>{element.name}</td>
                                                    <td>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                                                <i className="fa-solid fa-ellipsis-vertical"></i>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>

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
                    </Card>

                </div>
            </Row>
            <ToastContainer />
        </div>
    )
}

export default UserList;
