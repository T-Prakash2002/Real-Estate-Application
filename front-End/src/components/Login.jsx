import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../style/registration.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ApiRes =await login(formData.email, formData.password);

    if(ApiRes =='Login Successful'){
      alert(ApiRes);
      navigate('/')
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
          <h1>Login</h1>
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            minLength={1}
            maxLength={8}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
