import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { login, pending, rememberMe, loginFailed } from "../Features/AuthSlice";
import { checkInput } from "../Features/FormLogin";
import { validateEmail, error } from "../Features/CheckInput";
import { loginUser } from "../API/ApiServices";

function Form() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
//validate input
    function validator(value, input) { 
      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      switch(input){
        case 'email':
        dispatch(checkInput({email: validateEmail(value, regexEmail.test(value)), password:password}))
        break
        case 'password':
        dispatch(checkInput({email: email, password: value}))
        break
        default:
          console.log("input doesn't exist");
    } 
  }
  const email = useSelector(state => state.formLogin.value.email)
  const password = useSelector(state => state.formLogin.value.password)

  const {isRemembered } = useSelector((state) => state.auth)
  const {isFailed} = useSelector((state) => state.auth)
  console.log('REMEMBER ME: ',isRemembered);
  console.log('ERROR : ',isFailed);
  
    //post request
    async function userLogin(email, password) {
        console.log(email, password);
        return new Promise(async (resolve, reject) => {
        try {
            const res = await loginUser({email, password})
            const token = res.data.body.token
            console.log(token);
            resolve(token)
        } catch (error) {
            reject(error)
        }
        })
    }
  
    async function submitForm(e) { 
        e.preventDefault()
        dispatch(pending())
        try {
          const token = await userLogin(email, password)
          if (rememberMe) {
            localStorage.setItem('token', token)
          } else {
            localStorage.removeItem('token')
          }

          dispatch(login())
          dispatch(loginFailed(''))
          navigate('/profil')

        } catch (err) {
            dispatch(loginFailed('Check your email and password'))
        }

  
    }


    /*axios.post('http://localhost:3001/api/v1/user/login', { email : email, password : password })
    .then((res) => {
        console.log(res);
        dispatch(login({token: res.data.body.token, status: res.data.status, message : res.data.message}))   
    })
    .catch(err => console.log(err))    
    
    navigate('/profil')*/

    return( 
        <form onSubmit={submitForm}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" onChange={(e) => validator(e.target.value, 'email') }/>
                <span>{error(email,'email')}</span>
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password"  onChange={(e) => validator(e.target.value, 'password')} />
                <span>{error(password, 'password')}</span>
            </div>
            <div className="input-remember">
                <input 
                    type="checkbox" 
                    id="remember-me"  
                    name="remember-me"
                    defaultChecked={isRemembered}
                    onChange={() => dispatch(rememberMe(!isRemembered))}
                  />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <span>{isFailed}</span>
            <input className="sign-in-button" type="submit" value='Sign In'/>
        </form>  
    ) 
}

export default Form