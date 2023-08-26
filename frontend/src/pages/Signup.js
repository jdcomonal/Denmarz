import React, { useState,useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('login_id')){
      // alert('invalid address')
      navigate('/home')
    }
  },[])

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }


    const response = await fetch('http://localhost:5000/create-user', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      // body:"username="+username+"&password="+password
    });

    const data = await response.json();

    if (response.status === 200) {
      console.log('Signup successful:', data);
      alert("New Account Succesfully Created ")
      navigate('/signin');
    } else {
      setError(data);
    }
  };

  return (
    <main className='signup-bg'>
      <div className='signup-container'>
        <h2>Sign Up</h2>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className='txt__fontbase link__button' onClick={handleSignup}>
          Sign Up
        </button>
        {error && (
          <p className='error-message'>
            Code: {error.Code}, Msg: {error.Msg}, ID: {error.id}
           
          </p>
          
        )}

        <p>
          Already have an account? <Link to='/signin' className='hover-underline-animation'>Sign in</Link>
        </p>
      </div>
    </main>
  );
}

export default Signup;
