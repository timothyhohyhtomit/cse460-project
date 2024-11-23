import React from "react";
import { Outlet } from "react-router-dom";

function Root({ isLoggedIn, setLoggedIn, name, setName }) {
    // handlers
    const handleClickLogout = (e) => {
        // make a request to the server to logout
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        setLoggedIn(false);
        setName(null);
    };
    return (
        <>
            <div>
                <span>Sundevil Cafeteria Ordering System</span>
                <br />
                <span>Welcome, {name || "guest"}!</span>
                { isLoggedIn && <button onClick={handleClickLogout}>Logout</button> }
            </div>
            <Outlet />
        </>
    );
}

export default Root;