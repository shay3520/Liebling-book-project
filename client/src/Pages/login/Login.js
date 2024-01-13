import { Link, useNavigate } from "react-router-dom";
import "./Login.scss"
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { useState } from "react";


function Login(){
    const navigate = useNavigate();

    const[inputs,setInputs]=useState({
        username:"",
        password:""
    })

    const[error,setErr]=useState(null);

    function handleChange(e){
        setInputs((prev)=>({...prev, [e.target.name] : e.target.value}));

    };


    const {login} = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            await login(inputs);
            navigate("/")
        }catch(err){
            setErr(err.response.data)
        }
    };


    return(
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Liebling-Book!</h1>
                    <p>The future of social media – connecting people, protecting privacy.
                     Join us in this exciting journey as we redefine online interactions and safeguard your personal information.</p>
                    <span>Don't you have an account?</span>
                    <Link to="/register">
                    <button>Register</button>
                    </Link>
                    
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="username" name="username" onChange={handleChange}></input>
                        <input type="password" placeholder="password" name="password" onChange={handleChange}></input>
                        {error}
                        <button onClick={handleLogin}>Login</button>
                   </form>
                    
                </div>
            </div>
        
        </div>

    );
}

export default Login;