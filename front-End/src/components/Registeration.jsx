import React from "react";
import { useState,useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../style/registration.css"
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Registeration = () => {

  const {register} = useContext(UserContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    city: "",
  });

  const handleChange = (e) => { 
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }else{

      const ApiRes=await register(formData.name, formData.email, formData.phoneNumber, formData.city, formData.password);

      console.log(ApiRes)


      if(ApiRes){
        alert("User created successfully");
        navigate("/");
      }else{
        alert("Error creating user");
      }
      // setFormData({
      //   name: "",
      //   email: "",
      //   password: "",
      //   confirmPassword: "",
      //   phoneNumber: "",
      //   city: "",
      // });
      


    }

  };

  return (
    <div className="container login">
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
          <h1>Register</h1>
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            minLength={1}
            maxLength={8}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            minLength={1}
            maxLength={8}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Enter your City"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div >
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Registeration;
