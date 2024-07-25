import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [operation, setOperation] = useState("");
  const token = localStorage.getItem("token") ?? "";



  useEffect(() => {
    const tokenDetails = localStorage.getItem("token") ?? token;
    const userDetails = localStorage.getItem("user") ?? user;
    const isLoggedInDetails = localStorage.getItem("isLoggedIn") ?? isLoggedIn;

    if (tokenDetails && userDetails && isLoggedInDetails) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userDetails));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password,
      });

      setUser(response.data.data);
      setIsLoggedIn(true);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      localStorage.setItem("isLoggedIn", true);

      return response.data.message;
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const register = async (name, email, phone, city, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/register`, {
        name,
        email,
        phone,
        city,
        password,
      });

      if (response.data.message === "Email already exists") {
        alert("Email already exists");
        return;
      }

      if (response.data.message === "Error creating user") {
        alert("Error creating user");
        return;
      }

      setUser(response.data.data);
      setIsLoggedIn(true);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      localStorage.setItem("isLoggedIn", true);

      return response.data.message;
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);
    setUser("");
  };

  const addProperty = async (propertyData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/addProperty`,
        { ...propertyData },
        { headers: { Authorization: ` ${token}` } }
      );

      return response.data.message;
    } catch (error) {
      console.log(error.response);
    }
  };

  const getAllProperty = async (email) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/getAllProperty/${email}`,
        { headers: { Authorization: ` ${token}` } }
      );

      return response.data;


    } catch (error) {
      console.log(error.response);
    }
  };

  const editProperty = async (data,id) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/editProperty?id=${id}&email=${data.userEmail}`,
        { ...data },
        { headers: { Authorization: ` ${token}` } }
      );

      return response.data.message;
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteProperty = async (id,email) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/deleteProperty/${id}?email=${email}`,
        { headers: { Authorization: ` ${token}` } }
      );

      if(response.data.message === "Error deleting property for user"){
        alert("Error deleting property");
      }else{
        alert("Property deleted successfully");
      }

      return response.data.message;
    } catch (error) {
      console.log(error.response);
    }


  };

  const updateStatus = async (id,email,isAvailable) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/updateStatus/${id}?email=${email}`,
        { isAvailable: isAvailable },
        { headers: { Authorization: ` ${token}` } }
      );
      if(response.data.message === "Error updating property for user"){
        alert("Error updating property");
      }else{
        alert("Property updated successfully");
      }
      return response.data.message;
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        operation,
        setOperation,
        login,
        register,
        logout,
        addProperty,
        getAllProperty,
        editProperty,
        deleteProperty,
        updateStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
