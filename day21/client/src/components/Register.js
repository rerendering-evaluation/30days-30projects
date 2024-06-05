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
      if (res.data === 'User already exists' || res.data === 'User created') {
        console.log('Redirecting to http://localhost:3000/login...');
        navigate("/login");
      }
    });
  };
  const googleLogin = () => {
    window.open('http://localhost:5000/auth/google', '_self');
  };
  return <div className='div'>
          <div className='container'>
              <Darktheme />
              <h1>Register</h1>
              <input className='username' type='text' placeholder='username' ref={dummy}></input>
              <input className='password' type='password' placeholder='password' ref={dummy}></input>
              <button onClick={register} className='submit-button'>Submit</button>
              <p className='member'>Already a member? <Link className='link' to='/login'>Log In</Link></p>
          </div>

          <p> or </p>

          <div class="google-btn" onClick={googleLogin}>
            <div class="google-icon-wrapper">
              <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
            </div>
            <p class="btn-text"><b>Sign in with google</b></p>
          </div>
        </div>;
});
export default Register;