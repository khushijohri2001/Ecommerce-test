import React, { useState } from 'react'
import {useNavigate, useLocation, Link, NavLink} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/auth-context';

const Signup = () => {
  const { user, setUser } = useAuth();
  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate()
  const location = useLocation();
  const updateUserName = event => {
      setUserName(event.target.value)
  }
  const updatePassword = event => {
      setPassword(event.target.value)
  }
 

  const signupHandler = async (e) => {
    e.preventDefault()
    try{
        const {data} = await axios.post("api/auth/signup",{ email, password })
        const {createdUser,encodedToken} = data;
        localStorage.setItem("token",encodedToken);
        setUser(createdUser);
        navigate("/",{replace:true});
    }
    catch(error){
        setError("Something went wrong..! It seems you already have an account or there might be some technical issue..!")
    }
}

  return (
    <>
    {/* <button onClick={()=>{setIsLoggedIn((isLoggedIn)=>!isLoggedIn);
        navigate(location.state.from.pathname);
      }
      }>{isLoggedIn? 'signout': 'signin'}</button> */}

{/* {user.isUser ? (
					<div>
						<NavLink
							to="/"
						>Profile 
						</NavLink>
					</div>
				) : (
					<div >
						<NavLink
							
							to="/login"
						>
							<span >Login</span>
						</NavLink>
					</div>
				)} */}
    <div className='auth-container'>
       
        <form action="" className='form-container' onSubmit={signupHandler}>
            <h2>Signup Form</h2>
            <fieldset>
                    {/* <legend for="fname" className="label-input">Firstname*</legend>
                    <input type="text" className="input" id="fname" placeholder="George" value={newUser.fname}  onChange={(e)=> setNewUser({...newUser, fname : e.target.value})} required autofocus />
                </fieldset>
                <fieldset>
                    <legend for="lname" className="label-input">Lastname*</legend>
                    <input type="text" className="input" id="lname" placeholder="Parker" value={newUser.lname}  onChange={(e)=> setNewUser({...newUser, lname : e.target.value})} required autofocus />
                </fieldset>
            <fieldset> */}

                    <legend for="email" className="label-input">Email*</legend>
                    <input type="text" className="input" id="email" placeholder="George@gmail.com" value={email}  onChange={updateUserName} required autofocus />
                </fieldset>
                <fieldset>
                    <legend for="password" className="label-input">Password*{showPassword ? <span className="emoji" onClick={() => setShowPassword(prev => !prev)}> 🙈 </span> : <span className="emoji" onClick={()=>setShowPassword(prev => !prev)}> 👀 </span>}</legend>
                    <input type={showPassword ? "text" : "password"} className="input" id="password" placeholder="..." value={password}  onChange={updatePassword} required  />
                </fieldset>
                <fieldset>
                    <legend for="re-password" className="label-input">*Re-enter Password:</legend>
                    <input type={showPassword ? "text" : "password"} className="input" id="re-password" placeholder="..." required  />
                </fieldset>

                <button type="submit">Submit</button>
                <small> already have an account?</small>
            <Link to="/login"> <small>login</small></Link>
              
        </form>

        
    </div>
    
    </>
  )
}

export default Signup;

// read location and supply in requireAuth
// let location = useLocation()
// ;<Navigate to='/login' state={{ from: location }} replace />

// // use navigate in login to redirect after login
// let navigate = useNavigate()
// let from = location.state?.from?.pathname || '/'
// navigate(from, { replace: true })