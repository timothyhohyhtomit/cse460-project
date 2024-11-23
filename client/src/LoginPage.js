import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { SERVER_URL } from "./conf.js";

function LoginPage({ isLoggedIn, setLoggedIn, setName, setRole }) {
    // hard-coded user data
    const users = [
        { username: "manager", password: "manager", role: "manager" },
        { username: "operator", password: "operator", role: "operator" }
    ];
    // states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    // navigate to the home page after logging in or on landing if already logged in
    const navigate = useNavigate();
    // effects
    useEffect(() => {
        // check if user is already logged in
        if (isLoggedIn || localStorage.getItem("isLoggedIn")) {
            navigate("/");
            return;
        }
    }, []);
    // handlers
    const handleClickLogin = (e) => {
        e.preventDefault();
        setError("");
        if (!username.trim() || !password.trim()) {
            setError("Empty username or password.");
            return;
        }
        // use fetch API to make a post request to the server to login
        fetch(SERVER_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) throw new Error(data.error);
            else {
                setLoggedIn(true);
                setName(data.username);
                setRole(data.role);
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("username", data.username);
                localStorage.setItem("role", data.role);
                navigate("/");
            }
        })
        .catch(error => {
            setError(error.message);
        });
    };
    return (
        <div>
            <h1>Login</h1>
            <form>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
                <br />
                <button onClick={handleClickLogin}>Login</button>
                <div>{error}</div>
            </form>
        </div>
    );
}

export default LoginPage;
