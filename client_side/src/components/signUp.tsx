import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';

function SignUp() {

    let [email, setEmail] = useState<string>();
    let [name, setName] = useState<string>();
    let [password, setPassword] = useState<string>();
    let [confirmPassword, setConfirm] = useState<string>();
    let [showPassword, setShowPassword] = useState(false);
    let [error, setError] = useState(false);

    function ShowPassword() {
        setShowPassword(!showPassword);
    };

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>,
        setState: React.Dispatch<React.SetStateAction<string | undefined>>
    ) {
        setState(e.target.value);
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError(true);
        } else {
            (e.target as any).reset();
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            {error ? <p>Oops! Passwords do not match.</p> : null}
            <label>
                Enter name
                <br />
                <input
                    type='text'
                    required placeholder='Al Pacino'
                    onChange={(e) => { handleChange(e, setName) }}
                />
            </label>
            <label>
                Enter email address
                <br />
                <input
                    type='email'
                    required placeholder='abc@xyz.com'
                    onChange={(e) => { handleChange(e, setEmail) }}
                />
            </label>
            <br />
            <label>
                Enter password
                <br />
                <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    onChange={(e) => { handleChange(e, setPassword) }}
                />
            </label>
            <br />
            <label>
                Confirm password
                <br />
                <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    onChange={(e) => { handleChange(e, setConfirm) }}
                />
            </label>
            <br />
            <label>
                <input type='checkbox' onClick={ShowPassword} />
                Show password
            </label>
            <br />
            <input type='submit' value='Signup' />
            <br />
            <label>
                Already have an account? Login
                <br />
                <Link to='/userLogin'>
                    <button>Login</button>
                </Link>
            </label>
        </form >
    )
};

export default SignUp;