import React, { useContext,useEffect } from 'react'
import Context from '../context/Context';
import axios from 'axios';
import MyBlogs from '../components/MyBlogs';
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Profile = () => {
  const auth=useContext(Context)
  useEffect(() => {
    const fetchUser=async()=>{
      const api= await axios.get(`https://blogging-website-mern-e4ai.onrender.com/api/users/myprofile`,
        {
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true,
        }
      )
      console.log(api.data.user)
      // setBlog(api.data.blogs)
      auth.setUser(api.data.user)
      auth.setIsAuthenticated(true);
    }
  fetchUser()
  }, [])
  return (
    <div className="text-center my-3">
      <h2><FaUserCircle/>{" "}{auth.user.name}</h2>
      <h2><MdEmail/>{" "}{auth.user.email}</h2>
      <MyBlogs/>
    </div>
  )
}

export default Profile