import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const UserDetails = ({ id }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!id) {
        console.warn("❌ No ID provided, skipping API call.");
        return;
      }
  
      console.log("🔍 Fetching user details for ID:", id);
  
      try {
        const response = await axios.get(
          `https://blogging-website-mern-e4ai.onrender.com/api/users/user/${id}`,
          { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );
  
        console.log("✅ API Response:", response.data);
        
        setUser(response.data?.user || response.data || { name: "Unknown", email: "Not Available" });
  
      } catch (error) {
        console.error("🚨 Error fetching user details:", error);
        setUser({ name: "Unknown", email: "Not Available" });
      }
    };
  
    fetchUserDetails();
  }, [id]);
  
  
  return (
    <div>
      {user ? (
        <>
          <p><FaUserCircle/> {""} {user.name}</p>
          <p><MdEmail/> {user.email}</p>
        </>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default UserDetails;
