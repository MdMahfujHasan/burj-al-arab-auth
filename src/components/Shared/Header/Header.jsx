import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogout = () => {
        logOut()
    }
    return (
        <div>
            <Link
                className='text-emerald-500 font-semibold mr-5 hover:underline hover:underline-offset-2'
                to="/">Home
            </Link>
            <Link
                className='text-emerald-500 font-semibold mr-5 hover:underline hover:underline-offset-2'
                to="/dashboard"
            >Dashboard</Link>
            {!user ? <span>
                <Link
                    className='text-emerald-500 font-semibold mr-5 hover:underline hover:underline-offset-2'
                    to="/login">Login
                </Link>
                <Link
                    className='text-emerald-500 font-semibold mr-5 hover:underline hover:underline-offset-2'
                    to="/signup">Sign Up
                </Link>
            </span> :
                <Link
                    onClick={handleLogout}
                    className='text-rose-500 font-semibold mr-5 hover:underline hover:underline-offset-2'
                    to="/login">Logout
                </Link>
            }
        </div>
    );
};

export default Header;