import React, { useContext, useState } from 'react';
import validator from 'validator';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignupPage = () => {
    const {error, handleSignup} = useContext(AuthContext);
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
            // Handle form submission
            console.log('Form submitted', { userName, password });
            const success = await handleSignup({ userName, password });
            if (success) {
                toast.success("user signed up successfully");
                navigate("/login");
            }
        } else {
            setPasswordError('Password is not strong enough');
            toast.error("there is some error");
        }
    };

    return (
        <div>
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
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}

export default SignupPage