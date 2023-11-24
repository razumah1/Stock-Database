'use client';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
//import {fetchData} from './api'


function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = (event) => {
    // event.preventDefault();
    console.log("Login works")
    // setValues(validation(event.target.name))
    
    // history.push('/stock-list');
  };

  const handleSignUp = (event) => {
    console.log('Checking redirect');
  }

  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    
    history.push('/stock-list');
  };
 // const history = useHistory();

  useEffect(() => {
    const fetchDataFromRoute = async () => {
      try {
        const helloMessage = await fetchData('login');
      } catch (error) {
        console.error('Error setting message: ', error)
      }
    };
    fetchDataFromRoute();
  },[]);

  
  return (
    <div className = 'd-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className = 'bg-white p-3 rounded w-25'>
      <h1>Login</h1>
      <form action='' onSubmit={handleLogin}>
        <div className='mb-3'>
        <label><strong>Email</strong></label>
        <input type="email" placeholder="Enter Email" name ='email' 
        onChange={(e) => setEmail(e.target.value)} className= 'form-control rounded-0' value={email} />
        </div>
        <div className='mb-3'>
        <label><strong>Password</strong></label>
        <input type="password" placeholder="Enter Password" name= 'password'
        onChange={(e) => setPassword(e.target.value)} className= 'form-control rounded-0' value={password}/>
        </div>
        <button type ='submit' className='btn-btn-success w-100 rounded-0'>
          Login
        </button>
        <p> If you do not have an account kindly sign up</p>
        <button href='/signup' className='btn-btn-success w-100 bg-light rounded-0 text-decoration-none' type="button">
          Sign Up
        </button>
      </form>
      </div>
    </div>
  );
};

export default Login;