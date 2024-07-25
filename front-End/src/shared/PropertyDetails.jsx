import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { BASE_URL } from '../constant'

const PropertyDetails = () => {

    const propertyData = JSON.parse(localStorage.getItem("property"));

    
    console.log(propertyData)
  return (
    <div className="d-flex justify-content-center">
        <div className='card'>
                
        </div>      
    </div>
  )
}

export default PropertyDetails
