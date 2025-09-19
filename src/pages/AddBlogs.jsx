import React, { useContext, useState,useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';

const AddBlogs = () => {
  const auth = useContext(Context)
  const navigate=useNavigate()
  console.log(auth)
  const [title,setTitle]= useState("")
  const [description,setDescription]= useState("")
  const [imgUrl,setImgUrl]= useState("")

  useEffect(() => {
    const fetchBlog=async()=>{
      const api= await axios.get(`https://blogging-website-mern-e4ai.onrender.com/api/blogs/blog/${auth.id}`,
        {
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true,
        }
      )
      console.log(api.data.blog)

      setTitle(api.data.blog.title)
      setDescription(api.data.blog.description)
      setImgUrl(api.data.blog.imgUrl)
    
    }
  fetchBlog()
  }, [auth.id])
  

  const handleSubmit=async(e)=>{
    e.preventDefault();
      
    if(!auth.id){
      try{
        const api= await axios.post(`https://blogging-website-mern-e4ai.onrender.com/api/blogs/new`,
          {
            title,
            description,
            imgUrl
          },
          {
            headers:{
              "Content-Type":"application/json"
            },
            withCredentials:true,
          }
        )
        console.log(api)
        toast.success(api.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
          });
          auth.setIsAuthenticated(true);
          setTimeout(() => {
            navigate('/profile')
          }, 1500);
      


    }catch (error) {
        console.error("Error Response:", error.response);  // Log full response
        toast.error(error.response?.data?.message || "Something went wrong", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
        auth.setIsAuthenticated(false);
      }
    }
    else{
      try{
        const api= await axios.put(`https://blogging-website-mern-e4ai.onrender.com/api/blogs/${auth.id}`,
          {
            title,
            description,
            imgUrl
          },
          {
            headers:{
              "Content-Type":"application/json"
            },
            withCredentials:true,
          }
        )
        console.log(api)
        toast.success(api.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
          });
          auth.setIsAuthenticated(true);
          setTimeout(() => {
            navigate('/profile')
          }, 1500);
      
          auth.setId("")

    }catch (error) {
        console.error("Error Response:", error.response);  // Log full response
        toast.error(error.response?.data?.message || "Something went wrong", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
        auth.setIsAuthenticated(false);
      }
    }
      
      
    }
    
    
    // console.log(title,description,imgUrl)
  
  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <div className="container" style={{width:'45%'}}>

      {
        (auth.id)?(
          <h1 className='text-center my-3'>Edit Blog</h1>
        ):(<h1 className='text-centermy-3'>Add Blog</h1>)
      }
      
    <form onSubmit={handleSubmit}>
  <div className="mb-3 my-5">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input 
    value={title} onChange={(e)=>setTitle(e.target.value)}type="text" className="form-control" id="exampletext" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
    <input
    value={description} onChange={(e)=>setDescription(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Image Url</label>
    <input
    value={imgUrl} onChange={(e)=>setImgUrl(e.target.value)} type="text" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="d-grid gap-2 d-md-block my-5">
    {
      (auth.id)?(<button type="submit" className="btn btn-primary">Edit Blog</button>):(
        <button type="submit" className="btn btn-primary">Add Blog</button>
      )
    }
  
  </div>
</form>
</div>
    </>
  )
}

export default AddBlogs