import React, { useState, useEffect } from 'react'
import { loginList } from '../services/EmployeeService';

const LoginComponent = () => {

  const styleLogin = {
    alignItems: "center",
    border: "1px solid #ccc",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(0px)",
    marginLeft: "460px",
    marginRight: "460px",
    marginTop: "200px",
    height: "250px",
    width: "450px"
  }

  const [users, setUsers] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loginList().then((response) => {
      setUsers(response.data);
    }).catch(
        error => { console.error(error); }
    )
}, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(username, password);

      let isAuthenticated = false;
      users.forEach(res => {
        if(res.username === username && res.password === password){
          isAuthenticated = true;
        }
      })
  
      if (isAuthenticated) {
        setIsLoggedIn(true);
        setErrorMessage('');
        window.location.href = '/home';
      } else {
        setErrorMessage('Incorrect username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  }

  return (
    <div style={styleLogin}>
      <input type='text' className='form-control' placeholder='Enter Username' value={username} onChange={(event) => setUsername(event.target.value)} /><br />
      <input type='password' className='form-control' placeholder='Enter Password' value={password} onChange={(event) => setPassword(event.target.value)} />
      <button className='btn btn-primary' style={{ marginTop: '20px', marginLeft: '160px' }} onClick={handleSubmit}>Login</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  )
}

export default LoginComponent