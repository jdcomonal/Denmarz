import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import './Signin.css';
import {  useNavigate } from 'react-router-dom';



const Signin = () =>{

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  useEffect(()=>{
    if(localStorage.getItem('login_id')){
      
      navigate('/home')
    }
  },[])
  
  

  const handleLogin = async () => {

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
      console.log('Login successful:', data);
      console.log('Login successful:', data.id);
      // Handle successful login, e.g., store access token
      localStorage.setItem('login_id', data.id);
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('isAdmin', data.isAdmin);
      localStorage.setItem('headerkey',1);
      navigate('/menu')
      alert('Welcome to Denmarz Pizza House')

     

      
    } else {
      setError(data);
    }
  };

  return (
    <main className='signin_bg'>
      <div className="signin-container">
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
      <button className='txt__fontbase link__button' onClick={handleLogin}>Login</button>
      {error && <p className="error-message">{error}</p>}
      <p>Don't have an account? <Link to="/signup" className='hover-underline-animation'>Sign up</Link></p>
    </div>
    </main>
  );
}

export default Signin;
