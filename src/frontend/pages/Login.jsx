import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/auth-context";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

const Login = () =>{
const { setUser } = useAuth();
const [email, setUserName] = useState("");
const [password, setPassword] = useState("");
const [error,setError] = useState("");
const [showPassword,setShowPassword] = useState(false);
    
const location = useLocation();
const navigate =  useNavigate();
const updateUserName = event => {
    setUserName(event.target.value)
}
const updatePassword = event => {
    setPassword(event.target.value)
}


const submitLogin =async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.post("/api/auth/login", { email, password });
        const { foundUser, encodedToken } = data;
        setUser(foundUser);
        localStorage.setItem("token", encodedToken);
        navigate(location.state?.from?.pathname || "/", { replace: true });
      } 
      catch (error) {
        setError("Invalid username/password")
        console.error(error);
      }
}


const useTestCredentials = () => {
     
    
    setUserName("adarshbalika@gmail.com")
    setPassword("adarshBalika123");
}


return (
<div className="App">
    <main className="form-main">

        <div className="form-container">

            <form action="" className="login-form" onSubmit={submitLogin}>
                <h2 class="form-head">Login Form</h2>
                <fieldset>
                    <legend for="email" className="label-inp">Email address*</legend>
                    <input type="text" className="input" id="email" placeholder="billiejean@gmail.com"
                        value={email} onChange={updateUserName} required />
                </fieldset>
                <fieldset>
                    <legend for="password" className="label-inp">Password*{showPassword ? <span className="emoji" onClick={() => setShowPassword(prev => !prev)}> 🙈 </span> : <span className="emoji" onClick={()=>setShowPassword(prev => !prev)}> 👀 </span>}</legend>
                    <input required onChange={updatePassword} value={password} type={showPassword ? "text" : "password"} id="password" class="input" />
                </fieldset>

                <div class="pass-rem">
                    <label className="remem-me">
                        <input type="checkbox" />
                        Remember me
                    </label>
                    <button className="forgot-pass">Forgot your password?</button>
                </div>
                <div className="btn-div">
                    <button className="login-btn" onClick={useTestCredentials} >Add Guest Credentials</button>
                    <button className="login-btn" type="submit" >Login</button>
                    <Link to="/signup" className="link-style">
                    <button className="new-ac-btn">Create new account </button>
                    </Link>
                </div>
            </form>
        </div>
    </main>
</div>
);
}

export { Login }