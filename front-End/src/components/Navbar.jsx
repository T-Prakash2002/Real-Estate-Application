import React from "react";
import "../style/navbar.css";
import { useNavigate } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";



import {EllipsisVertical,LogIn,LogOut,UserRoundPlus} from "lucide-react";

const Navbar = () => {
  const {isLoggedIn,user,logout}=useContext(UserContext);

  const navigate = useNavigate();

  return (
    <>
     <nav className="navbar navbar-expand-md p-3">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand logo fw-bold">
            Real Estate
          </Link>

          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span >
              <EllipsisVertical size="25px" className="menu-icon"/>
            </span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav ms-auto mb-lg-0">

              <li className="nav-item">
                <Link to="/" className="nav-link " aria-current="page">
                    <span className="nav-link-text"> Home</span>
                </Link>
                  
              </li>

            </ul>
            {isLoggedIn ? (
              <div className=" d-flex gap-2 px-2">
                <button
                  className="btn loginBtn btn-outline-secondary w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Log Out
                  <LogOut className="login-icon" width={20} height={20} />
                </button>

                <div
                  className="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                      <div className="modal-body">

                        <div >Are you sure you want to log out?</div>
                          
                          <div className="d-flex flex-row justify-content-end gap-2 px-2 py-2">

                            <button type="button" className="btn btn-secondary w-25" data-bs-dismiss="modal" aria-label="Close">Close</button>

                            <button className="btn btn-model w-25"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                             onClick={()=>{
                              navigate("/");
                              logout()
                            }}>Log Out</button>
                            
                          </div>

                      </div>  
          
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className=" d-flex gap-2 px-2">
                <button
                  className="btn loginBtn btn-outline-secondary w-100"
                  onClick={() => {
                    navigate("/register_page");
                  }}
                >
                  Sign Up
                  <UserRoundPlus className="login-icon" width={20} height={20} />
                </button>
                <button
                  className="btn loginBtn btn-outline-secondary w-100"
                  onClick={() => {
                    navigate("/login_page");
                  }}
                >
                  
                  Log In
                    <LogIn className="login-icon" width={20} height={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="row outlet">
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
