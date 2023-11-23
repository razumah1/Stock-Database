'use client';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
//import {fetchData} from './api'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

 /* const handleLogin = () => {
    // Perform authentication logic, e.g., API call to validate credentials
    // If authentication is successful, redirect to the StockList page
    // For now, let's assume authentication is successful and navigate to StockList
    history.push('/stock-list');
  }; */
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>Email:</label>
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="button" onClick={Login}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
