import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import axios from 'axios';

const Login = () => {
  const auth = useContext(Context);
  const navigate = useNavigate();
  
  console.log("Auth Context:", auth); // Debugging

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("https://blogging-website-mern-e4ai.onrender.com/api/users/login", 
        { email, password }, 
        { withCredentials: true });

        console.log("Login Response:", response.data); // Debugging

        if (response.data.success) {
            auth.setIsAuthenticated(true);  // Update auth state
            toast.success("Login successful! 🎉"); // ✅ Show success toast
            setTimeout(() => navigate("/profile"), 1500); // ✅ Redirect after 1.5s
        } else {
            throw new Error(response.data.message);  // Only throw on failure
        }
    } catch (error) {
        console.error("Login Error:", error);
        toast.error(error.response?.data?.message || "Login failed! ❌"); // ✅ Show error toast
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} theme="light" />
      
      <div className="container" style={{ width: '45%' }}>
        <h1 className="text-center">Login User</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="email"
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="password"
              required
            />
          </div>
          
          <div className="d-grid gap-2 my-4">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
