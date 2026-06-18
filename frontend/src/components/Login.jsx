import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        emailId,
        password,
      },{
        withCredentials:true
      }
    );
     console.log(res.data);
    dispatch(addUser(res.data));
    navigate("/")

    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error("Something Went Wrong!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mt-3">Login</h1>
      <div className="h-1/2 w-1/4 border border-gray-300 p-10 m-3 bg-gray-300 rounded-sm flex justify-center items-center">
        <form>
          <div className="mb-3 ">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              value={emailId}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type={showPassword?"text":"password"}
              value={password}
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Show Password
            </label>
          </div>
          <button
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
