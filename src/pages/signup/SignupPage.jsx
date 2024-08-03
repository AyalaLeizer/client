import React, { useContext, useState } from 'react';
import validator from 'validator';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './SignupPage.scss';

const SignupPage = () => {
    const { error, handleSignup } = useContext(AuthContext);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (validator.isStrongPassword(e.target.value)) {
            setPasswordError('');
        } else {
            setPasswordError('Password is not strong enough');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validator.isStrongPassword(password)) {
            try {
                const response = await handleSignup({ userName, password });
                if (response.success) {
                    toast.success(response.message);
                    navigate("/login");
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error("An error occurred. Please try again.");
            }
        } else {
            setPasswordError('Password is not strong enough');
        }
    };

    return (
        <div className="signup-page">
            <h2>Signup</h2>
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
                    {passwordError && <p className="error-message">{passwordError}</p>}
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default SignupPage;
