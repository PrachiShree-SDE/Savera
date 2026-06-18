import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  
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