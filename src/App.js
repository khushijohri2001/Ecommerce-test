import "./App.css";
import './css/auth.css'
import {
  Routes,
  Route,
  NavLink,
  useNavigate
} from "react-router-dom";
import { categories } from "./backend/db/categories";
import Signup from "./frontend/pages/Signup";
import logo from "./logo.png";
import Products from "./frontend/pages/private/Products";
import Home from "./frontend/pages/Home";
import { useState } from "react";
import RequiresAuth from "./frontend/RequiresAuth/RequiresAuth";
import { useAuth } from "./contexts/auth-context";
import { Login } from "./frontend/pages/Login";
import Mockman from "mockman-js";

function App() {
  const {user,setUser} = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };
  return (
    
    <div style={{padding: 20}}>
    <NavLink to='/' style={{padding: 10}}>Home</NavLink> ||
    <NavLink to='/products' style={{padding: 10}}>products</NavLink>||
    { !user ? <NavLink to="/login" className="nav-link hover-effect">Login/Signup</NavLink> : <button className="button primary-green nav-link hover-effect" onClick={logoutHandler} >Logout</button> }
   
    
    <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/products' element={<RequiresAuth>
   <Products />
   </RequiresAuth>}/>
   <Route path='/signup' element={<Signup />}/>
   <Route path='/login' element={<Login />}/>
   <Route path="/mock" element={<Mockman/>}/>
    </Routes>
    
    </div>
  );
}

export default App;
