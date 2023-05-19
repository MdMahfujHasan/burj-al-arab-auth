import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

const Login = () => {
    const { signInEmailPassword, resetPasswordEmail } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef();

    const eyeIcon = <EyeIcon className="h-6 w-6" />;
    const eyeSlashIcon = <EyeSlashIcon className="h-6 w-6" />;

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        setError('');
        setSuccess('');

        signInEmailPassword(email, password)
            .then(result => {
                // console.log(result.user);
                if (!result.user.emailVerified) {
                    alert('Please verify your email.');
                    return;
                }
                setSuccess('User login successful!');
                form.reset();
                navigate(from, { replace: true })
            })
            .catch(error => {
                // console.log(error);
                setError(error.message);
            })
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        resetPasswordEmail(email)
            .then(() => {
                alert('Password reset email sent.');
            })
            .catch(error => {
                setError(error.message);
            })
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Your Email" name="email" id="email" className="input input-bordered input-accent w-full max-w-xs" ref={emailRef} required />
                </div>

                <div className='relative'>
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type={showPassword ? "text" : "password"} placeholder="Your Password" name="password" id="password" className="input input-bordered input-accent w-full max-w-xs" required />
                    <button onClick={() => setShowPassword(!showPassword)} className='absolute top-12 left-72'>
                        {showPassword ? eyeIcon : eyeSlashIcon}
                    </button>

                </div>
                <input className="btn btn-active btn-accent mt-3" type="submit" value="Login" />
            </form>
            <p
                className='text-blue-500 hover:underline hover:underline-offset-2 cursor-pointer'
                onClick={handleForgetPassword}>
                <small>Forgotten password?</small>
            </p>
            <p><small>New user? <Link className='text-blue-500 hover:underline hover:underline-offset-2' to="/sign-up">Sign Up</Link></small></p>
            <p className='text-rose-500'><small>{error}</small></p>
            <p className='text-teal-500'><small>{success}</small></p>
        </div>
    );
};

export default Login;