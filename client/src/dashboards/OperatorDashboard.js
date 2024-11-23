import React, { useState, useEffect } from "react";

import { ORDER_STATUS } from "../constants.js";
import { SERVER_URL } from "../conf.js";

function OperatorDashboard({ name }) {
    // states
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
    // handlers
    const handleViewOrders = (e) => {
        // fetch orders from the server
        fetch(SERVER_URL + "/order/orders")
        .then(response => response.json())
        .then(data => {
            if (data.error) throw new Error(data.error);
            else {
                // flatten the orders.item object into a string
                data.orders = data.orders.map((order) => {
                    order.items = Object.entries(order.items).map(([key, value]) => `${key} x${value}`).join(", ");
                    return order;
                });
                setOrders(data.orders);
            }
        })
        .catch(error => {
            setError(error.message);
        });
    };
    const handleMarkOrderPreparing = (e, id) => {
        // make a request to the server to mark the order as preparing
        fetch(SERVER_URL + "/order/prepare", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) throw new Error(data.error);
            else {
                // at this point, order has been updated on the server
                // now update the order status in the client
                setOrders(orders.map((order) => {
                    if (order.id === id) {
                        return {
                            ...order,
                            status: 1
                        };
                    } else {
                        return order;
                    }
                }));
            }
        })
        .catch(error => {
            setError(error.message);
        });
    };
    const handleMarkOrderReady = (e, id) => {
        // make a request to the server to mark the order as ready
        fetch(SERVER_URL + "/order/ready", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) throw new Error(data.error);
            else {
                // at this point, order has been updated on the server
                // now update the order status in the client
                setOrders(orders.map((order) => {
                    if (order.id === id) {
                        return {
                            ...order,
                            status: 2
                        };
                    } else {
                        return order;
                    }
                }));
            }
        })
        .catch(error => {
            setError(error.message);
        });
    };
    // effects
    useEffect(() => {
        handleViewOrders();
    }, []);
    return (
        <div>
            <h1>Hi, {name}!</h1>
            <p>You are logged in as Operator.</p>
            <hr />
            <h3>View Orders</h3>
            <hr />
            <table>
                <tr>
                    <th width="5%">ID</th>
                    <th width="65%">Items</th>
                    <th width="10%">Status</th>
                    <th width="20%">Action</th>
                </tr>
                {orders.map((order) => (
                    <tr>
                        <td>{order.id}</td>
                        <td>{order.items}</td>
                        <td>{ORDER_STATUS[order.status]}</td>
                        <td>
                            <button onClick={(e) => handleMarkOrderPreparing(e, order.id)}>Prepare</button>
                            <button onClick={(e) => handleMarkOrderReady(e, order.id)}>Ready</button>
                        </td>
                    </tr>
                ))}
            </table>
            <hr />
        </div>
    );
}

export default OperatorDashboard;
