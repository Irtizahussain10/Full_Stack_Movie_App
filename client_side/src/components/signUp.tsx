import React from "react";
import axios from "axios";
import { useState, useContext } from "react";
import { Link, useHistory } from 'react-router-dom';
import { LogInStatus } from "../context/LoginContext";

function SignUp() {

    let history = useHistory();
    let { setLoggedIn } = useContext(LogInStatus);
    let [email, setEmail] = useState<string>('');
    let [name, setName] = useState<string>('');
    let [password, setPassword] = useState<string>('');
    let [confirmPassword, setConfirm] = useState<string>('');
    let [showPassword, setShowPassword] = useState(false);
    let [connectionError, setConnectionError] = useState(false);
    let [error, setError] = useState(false);

    function ShowPassword() {

        setShowPassword(!showPassword);

    };

    function handleChange(

        e: React.ChangeEvent<HTMLInputElement>,
        setState: React.Dispatch<React.SetStateAction<string>>

    ) {

        setState(e.target.value);

    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();

        if (password !== confirmPassword) {

            setError(true);

        } else {

            let user = {
                email,
                password,
                name
            };

            axios.post('http://localhost:5000/createUser', user)
                .then((res) => {

                    let errorMessage = 'The user with this email already exists!';

                    if (!res.data) {
                        let error = { message: 'Network Error' }
                        throw error;
                    };
                    if (res.data === errorMessage) {
                        alert(errorMessage);
                    } else {
                        (e.target as any).reset();
                        localStorage.setItem('userData',
                            JSON.stringify(res.data));
                        setLoggedIn(false);
                        history.push('/');
                    };

                })
                .catch((e) => {

                    if (e.message === 'Network Error') {
                        setConnectionError(true);
                    };

                });
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
            <br />
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
            {connectionError ? <p>Unable to connect</p> : null}
        </form >
    )
};

export default SignUp;