import React from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
     try{
           const res = await axios.post("http://localhost:5000/logout",{},{withCredentials:true})
           dispatch(removeUser());
           return navigate("/login");
     }catch(err){
         console.error(err);
     }

  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="flex gap-3 justify-center items-center">
            <img className="h-20 w-40" src={logo} alt="logo" />
            <Link className="nav-link font-semibold hover:underline" to="/">
              Home
            </Link>
          </div>

           { user && <div className="dropdown mx-5">


              <Link
                className=" btn btn-secondary mx-2"
                to={"/"}
              >
              🛒
              </Link>

              <Link
                className="btn btn-secondary dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
               {user.firstName}
              </Link>

              <ul className="dropdown-menu">
                <li>
                <Link className="dropdown-item" to={"/profile"}>
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Order Detail
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" onClick={handleLogout}>
                    logout
                  </a>
                </li>
              </ul>
            </div>}
          
        </div>
      </nav>
    </>
  );
};

export default Navbar;
