import { useRef } from "react";
import { memo } from "react";
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Darktheme from './DarkTheme';
const Register = memo(function Register() {
  const registerUsername = useRef('');
  const registerPassword = useRef('');
  const navigate = useNavigate();
  const register = () => {
    axios({
      method: 'POST',
      data: {
        username: registerUsername.value,
        password: registerPassword.value
      },
      withCredentials: true,
      url: 'http://localhost:5000/register'
    }).then(res => {
      console.log(res);
      if (res.data === 'User already exists') {
        console.log('Redirecting to http://localhost:3000/login...');
        navigate("/login");
      }
      if (res.data === 'User created') {
        console.log('Redirecting to http://localhost:3000/login...');
        navigate("/login");
      }
    });
  };
  return <div className='container'>
            <Darktheme />
            <h1>Register</h1>
            <input className='username' type='text' placeholder='username' ref={dummy}></input>
            <input className='password' type='password' placeholder='password' ref={dummy}></input>
            <button onClick={register} className='submit-button'>Submit</button>
            <p className='member'>Already a member? <Link className='link' to='/login'>Log In</Link></p>
        </div>;
});
export default Register;