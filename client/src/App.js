import React, { useState } from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Outlet } from "react-router-dom";
import Root from "./Root.js";
import HomePage from "./HomePage.js";
import OrderPage from "./OrderPage.js";
import LoginPage from "./LoginPage.js";

/*
App is the entry point of the web application. Declared in it is a router that navigates users to pages for different features.
Features:
    - Authentication
    - Order
*/

function App() {
    // states
    const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem("isLoggedIn") || false);
    const [name, setName] = useState(localStorage.getItem("username") || "");
    const [role, setRole] = useState(localStorage.getItem("role") || "");
    // react router
    const appRouter = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={
            <Root
                isLoggedIn={isLoggedIn}
                setLoggedIn={setLoggedIn}
                name={name}
                setName={setName}
            />
        }>
            <Route index element={
                <HomePage
                    isLoggedIn={isLoggedIn}
                    name={name}
                    role={role}
                />
            } />
            <Route path="login" element={
                <LoginPage
                    isLoggedIn={isLoggedIn}
                    setLoggedIn={setLoggedIn}
                    setName={setName}
                    setRole={setRole}
                />
            } />
            <Route path="order" element={
                <OrderPage />
            } />
            <Route path="*" element={
                <div></div>
            } />
        </Route>
    ));
    return (
        <RouterProvider router={appRouter} />
    );
}

export default App;