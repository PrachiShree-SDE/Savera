import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Something went wrong",
      );
      console.error(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {

    const res = await axios.post("http://localhost:5000/signup",{
        firstName,lastName,emailId,password
      },
    {
      withCredentials:true
    })
    console.log("Signup Success");
console.log(res.data);
   dispatch(addUser(res.data.data))
   navigate("/");

    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Something went wrong",
      );
      console.error(err);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mt-3">
        {isLoggedIn ? "Login" : "Signup"}
      </h1>
      <div className="h-1/2 w-1/4 border border-gray-300 p-10 m-3 bg-gray-300 rounded-sm flex justify-center items-center">
        <form>
          {isLoggedIn ? (
            ""
          ) : (
            <>
              <div className="mb-3 ">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-3 ">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}

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
              type={showPassword ? "text" : "password"}
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
          <p className="text-red-500">{error}</p>
          <button
            className="btn btn-primary"
            onClick={isLoggedIn ? handleLogin : handleSignup}
          >
            Submit
          </button>

          <p
            className="text-center mt-4 cursor-pointer text-blue-600 font-medium hover:text-blue-800 hover:underline transition-all duration-200"
            onClick={() => setIsLoggedIn((value) => !value)}
          >
            {isLoggedIn ? "New User? Signup Here" : "Existing User? Login Here"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
