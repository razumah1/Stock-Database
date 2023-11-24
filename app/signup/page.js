'use client';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSignUp = async () => {
    // Add your sign-up logic here
  console.log('Signing up with:', email, password);

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
 /*Check if the passwords match
if (password != confirmPassword) {
  alert('Passwords do not match');
  return;
};*/

  // Continue with the sign-up process

  return (
    <div className = 'd-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className = 'bg-white p-3 rounded w-25'>
      <h1>Sign Up</h1>
      <form action=''>
      <div className='mb-3'>
        <label htmlFor='name'><strong>Name</strong></label>
        <input type="text" placeholder="Enter Name" className= 'form-control rounded-0' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='mb-3'>
        <label htmlFor='email'><strong>Email</strong></label>
        <input type="email" placeholder="Enter Email" className= 'form-control rounded-0' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='mb-3'>
        <label htmlFor='password'><strong>Password</strong></label>
        <input type="password" placeholder="Enter Password" className= 'form-control rounded-0' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='mb-3'>
        <label htmlFor='confirm password'><strong>Confirm Password</strong></label>
        <input type="password" placeholder="Confirm Password" className= 'form-control rounded-0' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button className='btn-btn-success w-100 rounded-0' type="button" onClick={SignUp}>
          Sign Up
        </button>
      </form>
      </div>
    </div>
    );
};

export default SignUp;