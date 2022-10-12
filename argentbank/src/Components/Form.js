import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/AuthSlice";
import axios from "axios"
import { useNavigate } from "react-router-dom";

function Form() {
    const dispatch = useDispatch()
    //get value from input
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()


    function submitForm() { 
        axios.post('http://localhost:3001/api/v1/user/login', { email : email, password : password })
        .then((res) => {
            dispatch(login({token: res.data.body.token, status: res.data.status, message : res.data.message}))      
        })
        .catch(err => console.log(err))

        navigate('/dashboard') 
    }
  

    return( 
        <form  onSubmit={submitForm}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password"  onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" type="submit">Sign In</button>
        </form>  
    ) 
}

export default Form