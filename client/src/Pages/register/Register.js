import { useState } from "react";
import "./Register.scss"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register(){
    const navigate = useNavigate();
    const[inputs,setInputs]=useState({
        username:"",
        email:"",
        password:"",
        name:"",
    })

    const[error,setErr]=useState(null);

    function handleChange(e){
        setInputs((prev)=>({...prev, [e.target.name] : e.target.value}));
        

    };

    async function handleClick(e){
        e.preventDefault();

        try{
            await axios.post("http://localhost:8800/api/auth/register", inputs);
            setErr(null);
            navigate("/login")
        }
        catch(err){
            setErr(err.response.data);
        }
    }

    return(
        <div className="Register">
            <div className="card">
                <div className="left">
                    <h1>Register</h1>
                    <form>
                        <input type="username" placeholder="Username" name="username" onChange={handleChange}></input>
                        <input type="email" placeholder="Email" name="email" onChange={handleChange}></input>
                        <input type="password" placeholder="Password" name="password" onChange={handleChange}></input>
                        <input type="text" placeholder="Full Name" name="name" onChange={handleChange}></input>     
                        {error}               
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
                <div className="right">
                    <h1>Liebling-Book</h1>
                    <p>The future of social media – connecting people, protecting privacy.
                     Join us in this exciting journey as we redefine online interactions and safeguard your personal information.
                    </p>
                    <span>Do you have an account?</span>
                    <Link to="/login">
                    <button>Login</button>
                    </Link>
            </div>
            </div>
            
        </div>

    );
}

export default Register;