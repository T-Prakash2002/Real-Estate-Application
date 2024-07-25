import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../context/UserContext";


const home = () => {

    const {isLoggedIn}=useContext(UserContext)
    const navigate = useNavigate();

  return (
    <div className='d-flex justify-content-center'>
      <button className='btn btn-danger'
      onClick={()=>{
        if(!isLoggedIn){
            alert("Login First")
        }else{
            navigate('/addProperty')
        }
      }}
      >Add New +</button>
    </div>
  )
}

export default home
