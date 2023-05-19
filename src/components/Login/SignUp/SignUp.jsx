import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { sendEmailVerification } from 'firebase/auth';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { createUserEmailPassword, googlePopupSignIn, githubPopupSignIn } = useContext(AuthContext);

    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        // console.log(name, email, password, confirmPassword);

        if (password !== confirmPassword) {
            setError('Password did not match, try again.');
            return;
        }
        else if (!/(?=.*[A-Z])/.test(password)) {
            setError('Password must contain at least 1 capital letter.');
            return;
        }
        else if (!/(?=.*[0-9])/.test(password)) {
            setError('Password must contain at least 1 digit.');
            return;
        }
        else if (!/(?=.*[!@#$%^&*])/.test(password)) {
            setError('Password must contain at least one special character.');
            return;
        }
        else if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        setError('');
        setSuccess('');

        createUserEmailPassword(email, password)
            .then(result => {
                // console.log(result.user);
                sendVerificationEmail(result.user);
                setSuccess('User has been created successfully!');
                form.reset();
            })
            .catch(error => {
                // console.log(error);
                setError(error.message);
            })
    }

    const sendVerificationEmail = user => {
        sendEmailVerification(user)
            .then(() => {
                alert('Verification email sent.');
            })
            .catch(error => {
                setError(error.message);
            })
    }

    const handleGoogleSignIn = () => {
        googlePopupSignIn()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const handleGitHubSignIn = () => {
        githubPopupSignIn()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div>
            <form onSubmit={handleSignUp}>
                <div>
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Your Name" name="name" id="name" className="input input-bordered input-accent w-full max-w-xs" required />
                </div>

                <div>
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Your Email" name="email" id="email" className="input input-bordered input-accent w-full max-w-xs" required />
                </div>

                <div>
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Your Password" name="password" id="password" className="input input-bordered input-accent w-full max-w-xs" required />
                </div>

                <div>
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" id="confirmPassword" className="input input-bordered input-accent w-full max-w-xs" required />
                </div>

                <input className="btn btn-active btn-accent mt-3" type="submit" value="Sign Up" />
            </form>
            <button onClick={handleGoogleSignIn} className="btn btn-active btn-primary mt-2">Sign in with Google</button>
            <button onClick={handleGitHubSignIn} className="btn block mt-2">Sign in with GitHub</button>
            <p><small>Already have an account? <Link className='text-blue-500 hover:underline hover:underline-offset-2' to="/login">Login</Link></small></p>
            <p className='text-rose-500'><small>{error}</small></p>
            <p className='text-teal-500'><small>{success}</small></p>
        </div>
    );
};

export default SignUp;