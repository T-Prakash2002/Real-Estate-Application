import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import "../style/home.css";

const Home = () => {
  const { isLoggedIn, user, getAllProperty, propertyData, operation,setOperation } =
    useContext(UserContext);
  const [properties, setProperties] = useState([]);

  const userDetails = JSON.parse(localStorage.getItem("user"));
  const isLoggedInDetails = localStorage.getItem("isLoggedIn");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedInDetails) {
      (function () {
        getAllProperty(userDetails.email).then((data) => {
          setProperties(data.data);
        });
      })();
    }
  }, []);


  return (
    <div className="d-flex justify-content-center">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <input type="text" id="search" placeholder="Search..." />
          </div>
          <div className="col-4">
            <button
              className="btn btn-danger"
              onClick={() => {
                if (!isLoggedIn) {
                  alert("Login First");
                } else {
                  setOperation("add");
                  navigate("/addProperty");
                }
              }}
            >
              Add New +
            </button>
          </div>
        </div>

        <div className="row properties">
          {properties.length > 0
            ? properties.map((property) => (
                <div
                  className="col-4 properties-card"
                  key={property._id}
                  
                >
                  <div className="card">
                    <div className="card-body">
                      <p className="card-title">
                        <span>Property Type:</span>
                        {property.type}
                      </p>
                      <p className="card-text">
                        <span>Location:</span>
                        {property.location}
                      </p>
                      <p className="card-text">
                        <span>City:</span>{property.city}
                      </p>
                      <p className="card-text">
                        <span>Price:</span>${property.price}
                      </p>
                      <p className="card-text">
                        <span>Description:</span>{property.description}
                      </p>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                      <button className="btn btn-outline-primary"
                      onClick={() => {
                        setOperation('edit')
                        navigate("/editProperty");
                        localStorage.setItem('editItem',JSON.stringify(property))

                      }}
                      >
                        Edit
                      </button>
                      <button className="btn btn-outline-danger">
                        delete
                      </button>
                    </div>
                  </div>



                </div>
              ))
            : "No properties found"}
        </div>
      </div>
    </div>
  );
};

export default Home;
