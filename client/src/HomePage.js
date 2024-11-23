import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ManagerDashboard from "./dashboards/ManagerDashboard";
import OperatorDashboard from "./dashboards/OperatorDashboard";

function HomePage({ isLoggedIn, name, role }) {
    if (isLoggedIn && role === "manager") {
        return (
            <ManagerDashboard
                name={name}
            />
        );
    } else if (isLoggedIn && role === "operator") {
        return (
            <OperatorDashboard
                name={name}
            />
        );
    } else {
        return (
            <div>
                <h1>Welcome to Sundevil Cafeteria!</h1>
                <p>You can make an <NavLink to="/order">order</NavLink> or <NavLink to="/login">log in</NavLink>.</p>
            </div>
        );
    }
}

export default HomePage;