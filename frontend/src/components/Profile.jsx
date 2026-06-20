import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error,setError] = useState("");
  const [loading, setLoading] = useState(true);

const fetchProfile = async () => {
  try {
    const res = await axios.get("http://localhost:5000/profile/view", {
      withCredentials: true,
    });

    setProfile(res.data);
    setLoading(false);
  } catch (err) {
    setError(err.message);
    setLoading(false);
  }
};

  useEffect(()=>{
    fetchProfile()
  },[])

  return(
    <div className="flex  justify-center items-center">
    <div className="border border-gray-300 w-2/6 flex flex-col justify-center items-center m-20">
    <h1 className="text-3xl text-red-400 font-bold mt-5 ">Welcome</h1>

    {loading ? (
      <h2 className="p-10 text-2xl">Loading...</h2>
    ) : profile ? (
     <>
         <h2 className="text-xl font-bold my-3">{ "User Name - "+profile.firstName + " " + profile.lastName}</h2>
        <h3 className="font-semibold">{"Email Id - "+profile.emailId}</h3>
        <h3 className="font-semibold mb-3">{"Role - "+profile.role}</h3>
     </>
    ) : (
      <h2>No profile found</h2>
    )}

    {error && <p className="text-red-500">{error}</p>}
  </div>
  </div>
  )
};

export default Profile;
