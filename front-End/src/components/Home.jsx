import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Pencil, Trash2 } from "lucide-react";
import "../style/home.css";

const Home = () => {
  const {
    isLoggedIn,
    getAllProperty,
    setOperation,
    deleteProperty,
    updateStatus,
  } = useContext(UserContext);
  const [properties, setProperties] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterOptions, setFilterOptions] = useState("all");

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

  let propertieslist = properties;

  if (searchText.length > 0) {
    propertieslist = properties.filter((property) => {
      return (
        property.type.toLowerCase().includes(searchText.toLowerCase()) ||
        property.location.toLowerCase().includes(searchText.toLowerCase()) ||
        property.city.toLowerCase().includes(searchText.toLowerCase()) ||
        property.description.toLowerCase().includes(searchText.toLowerCase())||
        property.price.toString().includes(searchText)
      );
    });
  }

  if (filterOptions === "available") {
    propertieslist = propertieslist.filter((property) => {
      return property.isAvailable;
    });
  }

  if (filterOptions === "unavailable") {
    propertieslist = propertieslist.filter((property) => {
      return !property.isAvailable;
    });
  }

  const handleModifyStatus = async (id,status) => {
    setProperties(
      properties.map((property) => {
        if (property._id === id) {
          return {
            ...property,
            isAvailable: status,
          };
        }
        return property;
      })
    );
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <input
              type="text"
              id="search"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
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

          <div className="col-4">
            <select className="form-select" aria-label="Default select example" onChange={(e) => {
              setFilterOptions(e.target.value);
            }}>
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </div>

        <div className="row properties d-flex justify-content-center gap-4">
          {propertieslist.length > 0
            ? propertieslist.map((property,index) => (
                <div className="col-4 card properties-card" key={index}>
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
                        <span>City:</span>
                        {property.city}
                      </p>
                      <p className="card-text">
                        <span>Price:</span>${property.price}
                      </p>
                      <p className="card-text">
                        <span>Description:</span>
                        {property.description}
                      </p>

                      <p className="card-text">
                        <span className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            checked={property.isAvailable}
                            onChange={async (e) => {
                              const result = confirm(
                                "Are you sure you want to update this property?"
                              );
                              if (result) {

                                handleModifyStatus(property._id,e.target.checked);

                                await updateStatus(
                                  property._id,
                                  userDetails.email,
                                  e.target.checked
                                );
                              }
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckDefault"
                          >
                            Is Available
                          </label>
                        </span>
                      </p>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => {
                          setOperation("edit");
                          navigate("/editProperty");
                          localStorage.setItem(
                            "editItem",
                            JSON.stringify(property)
                          );
                        }}
                      >
                        Edit
                        <Pencil size={16} className="ms-2" />
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={async () => {
                          const result = confirm(
                            "Are you sure you want to delete this property?"
                          );
                          if (result) {
                            await deleteProperty(
                              property._id,
                              userDetails.email
                            );
                          }
                        }}
                      >
                        delete
                        <Trash2 size={16} className="ms-2" />
                      </button>
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
