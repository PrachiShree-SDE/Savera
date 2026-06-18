import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';

const Home = () => {

 const dispatch = useDispatch();
 const navigate = useNavigate();
 const userData = useSelector((store) => store.user);

 const fetchUser = async() => {
  if(userData) return;
  try{
          const res = await axios.get("http://localhost:5000/profile/view",{withCredentials:true});
          dispatch(addUser(res.data));
  }catch(err){
    if(err) navigate('/login');
     console.error(err);
  }
 }

useEffect(() => {
  if (!userData) {
    fetchUser();
  }
}, [userData]);

  return (
     <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-1">
      <Outlet/>
    </div>
  </div> 
   
  )
}

export default Home