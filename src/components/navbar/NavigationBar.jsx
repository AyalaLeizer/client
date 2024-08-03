import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./NavigationBar.scss";
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";

const NavigationBar = () => {
    const { user, handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            const decoded = jwtDecode(user.token);
            setName(decoded.userName);
            setIsAdmin(decoded.isAdmin);
        }
    }, [user]);

    const onLogout = () => {
        handleLogout();
        navigate("/login");
        toast.success("User logged out successfully");
    };

    return (
        <nav className='nav-container'>
            {user && user.token && <div className='username-welcome'>Logged in as: {name}</div>}
            <ul className='nav-links'>
                {user && user.token ? (
                    <>
                        <li className='nav-link'>
                            <Link to="/home">Home</Link>
                        </li>
                        <li className='nav-link'>
                            <Link to="/movies">Movies</Link>
                        </li>
                        {isAdmin && (
                            <>
                                <li className='nav-link'>
                                    <Link to="/members">Members</Link>
                                </li>
                                <li className='nav-link'>
                                    <Link to="/subscriptions">Subscriptions</Link>
                                </li>
                            </>
                        )}
                        <li className='nav-link'>
                            <Link to="/" onClick={onLogout}>Logout</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className='nav-link'>
                            <Link to="/login">Login</Link>
                        </li>
                        <li className='nav-link'>
                            <Link to="/">Signup</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavigationBar;
