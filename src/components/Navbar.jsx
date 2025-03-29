import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Context from '../context/Context'
import { ToastContainer, toast, Bounce } from "react-toastify"; // ✅ Import Bounce
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';



const Navbar = () => {
  const auth=useContext(Context);
  const navigate=useNavigate()
  const logout=async()=>{
    const api= await axios.get(`https://blogging-website-mern-e4ai.onrender.com/api/users/logout`,
      
      {
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true,
      }
    )
    // console.log(api)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
      auth.setIsAuthenticated(false);
      setTimeout(() => {
        navigate('/')
      }, 1500);
  }
  return (
    <>
    <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
    <div className='navbar'>
      <Link to='/' className="left">
        <h2>Blogify.com</h2>
      </Link>
      <div className="right">
        
       
        {
           !(auth.isAuthenticated) &&
           <Link to={'/register'}className='items'><h3>Register</h3></Link>
        }

        {
           !(auth.isAuthenticated) &&
           <Link to={'/login'}className='items'><h3>Login</h3></Link>
        }

        {
           (auth.isAuthenticated) &&
         <Link to={'/addblogs'}className='items'><h3>AddBlog</h3></Link>
        }

        {
           (auth.isAuthenticated) &&
           <Link to={'/profile'}className='items'><h3>YourProfile</h3></Link>
        }

        {
           (auth.isAuthenticated) &&
           <div onClick={logout} className="items"><h3>Logout</h3></div>
        }
        
        
        
      </div>
    </div>
    </>
  )
}

export default Navbar