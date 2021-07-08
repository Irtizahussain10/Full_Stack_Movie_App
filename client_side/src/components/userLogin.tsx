import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { LogInStatus } from "../context/LoginContext";

function LogIn() {

    let history = useHistory();
    let { setLoggedIn } = useContext(LogInStatus);
    let [showPassword, setShowPassword] = useState(false);
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
                if (res.status === 200) {
                    localStorage.setItem('userData', JSON.stringify(res.data));
                } else {

                };
            })
            .then(() => {
                localStorage.setItem('notLoggedIn', JSON.stringify(false));
            })
            .then(() => {
                setLoggedIn(
                    JSON.parse(localStorage.getItem('notLoggedIn') as string)
                );
            })
            .then(() => history.push('/'))
            .catch(console.log);
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
        </form>
    );
};

export default LogIn;