import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./NavigationBar.scss"
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";

const NavigationBar = () => {
    const { user, handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [name,setName] = useState("");

    useEffect(() => {
        if(user && user.token ) {
            const decoded = jwtDecode(user.token);
            // console.log(decoded)
            setName(decoded.userName)
        }
    })

    const onLogout = () => {
        handleLogout();
        navigate("/login");
        toast.success("user logged out successfully");
    }

    return (
        <nav className='nav-container'>
            {user && user.token && <div className='username-welcome'>hello {name}</div>}
            
            <ul className='nav-links'>
                <li className='nav-link'>
                    <Link to="/home">Home</Link>
                </li>
                {user && user.token ?
                    <li>
                        <Link to="/" onClick={onLogout}>Logout</Link>
                    </li>
                    :
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/">Signup</Link>
                        </li>
                    </>
                }


                <li>
                    <Link to="/">AddMovie</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavigationBar