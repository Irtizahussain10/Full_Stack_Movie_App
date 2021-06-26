import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function LogIn() {

    let [showPassword, setShowPassword] = useState(false);
    let [email, setEmail] = useState<string>();
    let [password, setPassword] = useState<string>();

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
        (e.target as any).reset();
    };

    return (
        <form name='UserLogin' onSubmit={(e) => handleSubmit(e)}>
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