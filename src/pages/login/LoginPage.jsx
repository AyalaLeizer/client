import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const {error, handleLogin} = useContext(AuthContext);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

  
    const handleUserNameChange = (e) => {
      setUserName(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Validate form inputs
      if (userName.trim() === '' || password.trim() === '') {
        setErrorMessage('Both fields are required.');
      } else {
        setErrorMessage('');
        // Handle form submission
        console.log('Form submitted', { userName, password });
        const success = await handleLogin({ userName, password });
            if (success) {
                toast.success("user logged in successfully");
                navigate("/home");
            }
      }
    };
  
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName">Username:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={handleUserNameChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    );
}

export default LoginPage