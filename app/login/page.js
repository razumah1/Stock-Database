'use client';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
//import {fetchData} from './api'
const Login = () => {
  const [username, setUsername] = useState('');
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
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* <button onClick={handleLogin}>Login</button> */}
    </div>
  );
};

export default Login;
