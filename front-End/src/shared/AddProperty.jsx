import React, { useState,useContext } from "react";
import { ArrowLeft } from "lucide-react";
import "../style/AddProperty.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";



function AddProperty() {
    const {addProperty}=useContext(UserContext)

  const [propertyData, setPropertyData] = useState({
    type: "",
    location: "",
    city: "",
    price: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPropertyData({ ...propertyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ApiRes = await addProperty(propertyData);
    if (ApiRes==='Property created successfully') {
      alert(ApiRes);
      navigate("/");
    }
    setPropertyData({
      type: "",
      location: "",
      city: "",
      price: "",
      description: "",
    });
  };

  return (
    <div className="PropertyDetails ">
      <form onSubmit={handleSubmit}>
        <sup className="back-button">
          <ArrowLeft
            size={20}
            onClick={() => {
              navigate(-1);
            }}
            className="BackArrow"
          />
        </sup>
        <div className="title">
          <h1>Add Property</h1>
        </div>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              name="type"
              id="type"
              value={propertyData.type}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Studio">Studio</option>
              <option value="Bungalow">Bungalow</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              value={propertyData.location}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              value={propertyData.city}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              id="price"
              value={propertyData.price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={propertyData.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddProperty;