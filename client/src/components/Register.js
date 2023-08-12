import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function Register() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Perform field validations
    if (!username || !email || !password) {
      alert('All fields are required');
      return;
    }

    try {
        const response = await axios.post('http://localhost:5000/register', {
            username,
            email,
            password,
          })
    
          console.log(response.data);

      // Redirect to login page or show a success message
      window.location = '/login';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='signup_container'>
      <div className='signup_form_container'>
        <div className='left'>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className='white_btn'>
              Sign in
            </button>
          </Link>
        </div>

        <div className='right'>
          <form className="form_container" onSubmit={handleRegister}>
            <h2>Register</h2>

            <label>
              Name:
              <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
            </label>

            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>

            <button className="green_btn" type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;

