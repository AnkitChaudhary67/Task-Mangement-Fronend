import React, { useContext, useEffect, useState } from 'react'
import "./home.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom"

import Spiner from '../../components/Spinner/Spinner'
import { addData, dltdata, updateData } from '../../components/Context/Provider';
import Alert from 'react-bootstrap/Alert';
import { userget , deletUser} from '../../services/Apis';
import { toast } from 'react-toastify';
import UserList from '../User/userList';

const Home = () => {

  const navigate=useNavigate();
  const {useradd, setUseradd}=useContext(addData);
  const {update,setUpdate} = useContext(updateData)
  const {deletedata, setDeletedata}=useContext(dltdata)
  const [userdata,setUserData] = useState([]);
  const [showspin,setShowSpin] = useState(true);



  const addUser=()=>{
    navigate("/addUser");
  }
// get User
  const userGet=async()=>{
    const config = {
      "Content-Type": "application/json",
      "token": localStorage.getItem("token")
  }
    const result=await userget(config);
    // console.log(result);
    if(result.status===200){
      setUserData(result.data);
    }else{
      console.log("error get users");
    }
  }

  //User Delete

  const deleteUser=async(id)=>{
    const result= await deletUser(id);
    if(result.status===200){
      userGet();
      setDeletedata(result.data)
    }else{
      toast.error("error")
    }
  }



   useEffect(()=>{
    userGet();
    setTimeout(()=>{
      setShowSpin(false)
    },1000)
   },[])
  return (
   <>
    {
      useradd ?  <Alert variant="success" onClose={() => setUseradd("")} dismissible>{useradd.name.toUpperCase()} Succesfully Added</Alert>:""
    }
     {
      update ? <Alert variant="primary" onClose={() => setUpdate("")} dismissible>{update.name.toUpperCase()} Succesfully Update</Alert>:""
    }
      {
      deletedata ? <Alert variant="danger" onClose={() => setDeletedata("")} dismissible>{deletedata.name.toUpperCase()} Succesfully Delete</Alert>:""
    }


  <div className="container">
        <div className="main_div">
      
          <div className="search_add mt-4 d-flex justify-content-between">
            
            <div className="add_btn">
              <Button variant="primary" onClick={addUser}> <i className="fa-solid fa-plus"></i>&nbsp; Add User</Button>
            </div>
          </div>
          
        {
          showspin ? <Spiner /> : < UserList
                                    userdata={userdata}
                                    deleteUser={deleteUser}
                                    userGet={userGet}
                                   
                                  />
        }

        </div>
       </div>
   </>
  )
}

export default Home