import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const tokenDetails = localStorage.getItem("token") ?? '';
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


      return response.data.message
      
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

    setIsLoggedIn(false)
    setUser("")

  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
