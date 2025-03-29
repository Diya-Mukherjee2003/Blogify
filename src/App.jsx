import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AddBlogs from './pages/AddBlogs';
import Navbar from './components/Navbar';
import Context from './context/Context';

const App = () => {

  const auth=useContext(Context)
  const navigate=useNavigate();
  useEffect(() => {
    if(!auth.isAuthenticated){
      navigate('/')
    }
  }, [auth.isAuthenticated])
  
return (
<>
<Navbar />
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/addblogs" element={<AddBlogs />} />
  </Routes>
</>
);
};
export default App;