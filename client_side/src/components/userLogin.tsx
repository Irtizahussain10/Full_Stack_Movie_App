import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { LogInStatus } from "../context/LoginContext";

function LogIn() {

    let history = useHistory();
    let { setLoggedIn } = useContext(LogInStatus);
    let [showPassword, setShowPassword] = useState(false);
    let [connectionError, setConnectionError] = useState(false);
    let [email, setEmail] = useState<string>('');
    let [password, setPassword] = useState<string>('');

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

        let user = {
            email,
            password
        };

        axios.post('http://localhost:5000/userLogin', user)

            .then((res) => {

                if (!res.data) {
                    let error = { message: 'Network Error' };
                    throw error;
                };

                if (res.data[0]) {
                    localStorage.setItem('userData', JSON.stringify(res.data));
                    localStorage.setItem('notLoggedIn', JSON.stringify(false));
                    setLoggedIn(
                        JSON.parse(localStorage.getItem('notLoggedIn') as string)
                    );
                    history.push('/');
                } else if (!res.data[0]) {
                    alert('No such account exists!')
                };

            })
            .catch((e) => {

                if (e.message === 'Network Error') {
                    setConnectionError(true);
                };

            });
    };

    return (
        <form name='UserLogin' onSubmit={(e) => handleSubmit(e)} >
            <label>
                Enter the Email Id
                <br />
                <input
                    type='email'
                    placeholder='abc@xyz.com'
                    required
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
                <input
                    type='checkbox'
                    value='Show password'
                    onClick={ShowPassword}
                />
                Show Password
            </label>
            <br />
            <input type='submit' />
            <br />
            <label>
                Don't have an account? Sign up
                <br />
                <Link to='/SignUp'>
                    <button>Sign up</button>
                </Link>
            </label>
            {connectionError ? <p>Unable to connect</p> : null}
        </form>
    );
};

export default LogIn;