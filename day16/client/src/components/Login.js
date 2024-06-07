import { useRef } from "react";
import { memo } from "react";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Darktheme from './DarkTheme';
const Login = memo(function Login() {
  const loginUsername = useRef('');
  const loginPassword = useRef('');
  const [loginInfo, setLoginInfo] = useState(null);
  const navigate = useNavigate();
  const login = () => {
    axios({
      method: 'POST',
      data: {
        username: loginUsername.current.value,
        password: loginPassword.current.value
      },
      withCredentials: true,
      url: 'http://localhost:5000/login'
    }).then(res => {
      setLoginInfo(res.data);
      console.log(res.data);
      if (res.data !== 'No user exists') {
        navigate("/getuser");
      }
    });
  };
  return <div className='container'>
    <Darktheme />
        <h1>Login</h1>
        <input type='text' placeholder='username' ref={loginUsername}></input>
        <input type='password' placeholder='password' ref={loginPassword}></input>
        {loginInfo === 'No user exists' ? <p className='exist'>Wrong username or password</p> : null}
        <button onClick={login} className='submit-button'>Submit</button>
        <p className='member'>Not a member? <Link className='link' to='/'>Sign up</Link></p>
    </div>;
});
export default Login;